import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './services/database/database.service';
import { ConfigService } from '@nestjs/config';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import { createClient } from 'redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Session
  const redisClient = createClient({
    url: configService.get('REDIS_URL'),
  });
  redisClient.connect();

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'session:',
  });

  app.use(
    session({
      store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: configService.get('SESSION_SECRET'),
      cookie: {
        sameSite: 'strict',
        secure: configService.get('NODE_ENV') === 'production',
        httpOnly: false,
      },
    }),
  );

  // Database
  const prismaService = app.get(DatabaseService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
