import { GraphQLClient } from 'graphql-request';

export {gql} from 'graphql-request'

if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) {
	throw new Error('NEXT_PUBLIC_DIRECTUS_URL is not defined');
}

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/graphql`;
export const graphqlClient = new GraphQLClient(API_ENDPOINT)
export const graphqlSystemClient = new GraphQLClient(`${API_ENDPOINT}/system`)


export type NotNull<T> = T extends null|undefined ? never : T;
export type Required<T> = {
    [P in keyof T]-?: NotNull<T[P]>;
};
export type RequiredFields<T, K extends keyof T = keyof T> = T & Required<Pick<T, K>>;