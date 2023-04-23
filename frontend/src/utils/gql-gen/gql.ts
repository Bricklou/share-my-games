/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery GameList($limit: Int = -1, $sort: [String] = [], $page: Int = 1) {\n    game(limit: $limit, sort: $sort, page: $page) {\n        id\n        name\n        slug\n        rating\n        create_at\n        update_at\n        published_at\n        creator {\n            id\n            name\n            slug\n        }\n        previews {\n            id\n            preview { id }\n            is_nsfw\n        }\n    }\n\n    meta: game_aggregated {\n        countDistinct {\n            id\n        }\n    }\n}\n": types.GameListDocument,
    "\nquery Settings {\n   settings {\n\t\tproject_name\n\t\tproject_descriptor\n\t}\n}\n": types.SettingsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GameList($limit: Int = -1, $sort: [String] = [], $page: Int = 1) {\n    game(limit: $limit, sort: $sort, page: $page) {\n        id\n        name\n        slug\n        rating\n        create_at\n        update_at\n        published_at\n        creator {\n            id\n            name\n            slug\n        }\n        previews {\n            id\n            preview { id }\n            is_nsfw\n        }\n    }\n\n    meta: game_aggregated {\n        countDistinct {\n            id\n        }\n    }\n}\n"): (typeof documents)["\nquery GameList($limit: Int = -1, $sort: [String] = [], $page: Int = 1) {\n    game(limit: $limit, sort: $sort, page: $page) {\n        id\n        name\n        slug\n        rating\n        create_at\n        update_at\n        published_at\n        creator {\n            id\n            name\n            slug\n        }\n        previews {\n            id\n            preview { id }\n            is_nsfw\n        }\n    }\n\n    meta: game_aggregated {\n        countDistinct {\n            id\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery Settings {\n   settings {\n\t\tproject_name\n\t\tproject_descriptor\n\t}\n}\n"): (typeof documents)["\nquery Settings {\n   settings {\n\t\tproject_name\n\t\tproject_descriptor\n\t}\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;