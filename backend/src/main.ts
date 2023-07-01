import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import { createClient } from 'redis';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { UserInputError } from '@nestjs/apollo';
import { ValidationError } from 'class-validator';

const logger = new Logger('Bootstrap');

async function bootstrap(): Promise<INestApplication<unknown>> {
  const app = await NestFactory.create(AppModule);

  logger.log('Starting application...');
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UserInputError('VALIDATION_ERROR', {
          extensions: {
            invalidArgs: errors,
          },
        });
      },
    }),
  );

  // Session
  logger.log('Configuring session...');
  const redisClient = createClient({
    url: configService.get('REDIS_URL'),
  });
  await redisClient.connect();

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

  // Allow the app to read cookies
  app.use(cookieParser());

  return app;
}

bootstrap().then(async (app) => {
  await app.listen(3000).then(() => {
    logger.log('Application started: listening on http://localhost:3000');
  });
});
