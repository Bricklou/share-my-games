import { Provider } from '@angular/core';
import 'zone.js/dist/zone-node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { Request, Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import expressAsyncHandler from 'express-async-handler';

import { AppServerModule } from '@/main.server';
import { environment } from '@/environments/environment';
import { User } from '@app/modules/shared/interfaces/user';
import { INIT_AUTH_USER } from '@app/modules/shared/utils/init-auth.token';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/share-my-games/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  server.use(cookieParser());
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', (_, options, callback) => {
    const engine = ngExpressEngine({
      bootstrap: AppServerModule,
    });

    engine(_, options, callback);
  });

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  server.get(
    '*',
    expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
      const providers: Provider[] = [
        { provide: 'REQUEST', useValue: req },
        { provide: 'RESPONSE', useValue: res },
      ];

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const sessionId = req.cookies['connect.sid'] as string | undefined;

      if (sessionId) {
        try {
          // If there is a session cookie, fetch the user and pass it to the client
          const resp = await fetch(environment.api, {
            method: 'POST',
            body: JSON.stringify({
              operationName: 'me',
              query:
                'query me { me { id, email, username, createdAt, updatedAt } }',
            }),
            headers: {
              /* eslint-disable @typescript-eslint/naming-convention */
              'Content-Type': 'application/json',

              // Pass the session cookie to the backend
              Cookie: `connect.sid=${sessionId}`,

              /* eslint-enable @typescript-eslint/naming-convention */
            },
          });

          const { data } = await (resp.json() as Promise<{
            data: { me: User };
          }>);

          providers.push({
            provide: INIT_AUTH_USER,
            useValue: data.me,
          });
        } catch (e) {
          console.error(e);
        }
      }

      res.render(indexHtml, {
        req,
        res,
        providers,
      });
    })
  );

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from '../main.server';
