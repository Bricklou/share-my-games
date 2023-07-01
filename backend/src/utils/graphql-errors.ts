import { ApolloServerOptions } from '@apollo/server';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Logger } from '@nestjs/common';
import { GraphQLFormattedError } from 'graphql';

const logger = new Logger('GraphQL error formatter');

export const formatError: ApolloServerOptions<ApolloDriverConfig>['formatError'] =
  (error) => {
    const code = error.extensions?.code;

    switch (code) {
      case 'BAD_USER_INPUT':
      case 'BAD_REQUEST':
        return formatBadRequest(error);
      case 'INTERNAL_SERVER_ERROR':
        return formatInternalServerError(error);
      case 'FORBIDDEN':
        return error;
      default:
        logger.debug(JSON.stringify(error));
        return error;
    }
  };

function formatBadRequest(error: GraphQLFormattedError): GraphQLFormattedError {
  const extensions = {
    code: 'VALIDATION_ERROR',
    errors: [],
  };

  Object.keys(error.extensions.invalidArgs).forEach((key) => {
    const constraints = [];
    Object.keys(error.extensions.invalidArgs[key].constraints).forEach(
      (_key) => {
        constraints.push(error.extensions.invalidArgs[key].constraints[_key]);
      },
    );

    extensions.errors.push({
      field: error.extensions.invalidArgs[key].property,
      errors: constraints,
    });
  });

  const graphQLFormattedError: GraphQLFormattedError = {
    message: 'VALIDATION_ERROR',
    extensions: extensions,
  };

  return graphQLFormattedError;
}

function formatInternalServerError(
  error: GraphQLFormattedError,
): GraphQLFormattedError {
  if (error.message === 'Unauthorized Exception') {
    const formattedError: GraphQLFormattedError = {
      ...error,
      extensions: {
        ...error.extensions,
        code: 'UNAUTHORIZED',
      },
    };

    return formattedError;
  }

  return error;
}
