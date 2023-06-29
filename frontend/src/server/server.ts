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
import { checkStatus, isHttpResponseError } from '@/server/fetchUtils';
import { INIT_AUTH } from '@shared/services/auth/auth.service';
import { User } from '@shared/interfaces/user';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/frontend/browser');
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
      const setCookies: string[] = [];

      const providers: Provider[] = [
        { provide: 'REQUEST', useValue: req },
        { provide: 'RESPONSE', useValue: res },
      ];

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const userSession = req.cookies?.['connect.sid'] as string | undefined;

      if (userSession) {
        try {
          const resp = await fetch(environment.api, {
            method: 'POST',
            headers: {
              /* eslint-disable @typescript-eslint/naming-convention */
              cookie: `connect.sid=${userSession}`,
              'Content-Type': 'application/json',
              /* eslint-enable @typescript-eslint/naming-convention */
            },
          });

          checkStatus(resp);

          const data = (await resp.json()) as Promise<User>;
          providers.push({
            provide: INIT_AUTH,
            useValue: data,
          });

          const setCookie = resp.headers.get('set-cookie');
          if (setCookie) {
            setCookies.push(setCookie);
          }
        } catch (err) {
          if (isHttpResponseError(err) && !err.message.match(/401/)) {
            console.error(err);
          }
        }
      }

      res.setHeader('set-cookie', setCookies);

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
