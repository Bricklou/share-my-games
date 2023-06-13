import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 4000);
}

// Webpack will replace 'require' with '__webpack_require__'
// '_NON_WEBPACK_REQUIRE_' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const _NON_WEBPACK_REQUIRE_: NodeRequire;
const mainModule = _NON_WEBPACK_REQUIRE_.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  bootstrap().catch((err: Error) => console.error(err));
}
