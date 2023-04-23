import { GraphQLClient } from 'graphql-request';

export {gql} from 'graphql-request'

if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) {
	throw new Error('NEXT_PUBLIC_DIRECTUS_URL is not defined');
}

// Get the inner type of an array
export type ArrayItem<T> = T extends (infer U)[] ? U : never;

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/graphql`;
export const graphqlClient = new GraphQLClient(API_ENDPOINT)
export const graphqlSystemClient = new GraphQLClient(`${API_ENDPOINT}/system`)