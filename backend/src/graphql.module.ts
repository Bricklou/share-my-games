import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { formatError } from './utils/graphql-errors';

@Module({
  imports: [
    // Import all modules that contain resolvers before loading the GraphQLModule
    UserModule,
    AuthModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      // Apollo configuration options
      driver: ApolloDriver,
      playground: false,
      introspection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoTransformHttpErrors: true,
      status400ForVariableCoercionErrors: true,
      includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'production',
      formatError,

      // GraphQL schema configuration (code-first approach)
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      installSubscriptionHandlers: true,
    }),
  ],
})
export class GraphqlConfigModule {}
