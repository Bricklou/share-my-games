import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './services/database/database.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { UsersResolver } from './resolvers/users/users.resolver';
import { AuthResolver } from './resolvers/auth/auth.resolver';
import { AuthService } from './services/auth/auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/typings/graphql.d.ts'),
        outputAs: 'class',
      },
      playground: false,
      introspection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoTransformHttpErrors: true,
      status400ForVariableCoercionErrors: true,
      includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseService,
    UsersResolver,
    AuthResolver,
    AuthService,
  ],
})
export class AppModule {}
