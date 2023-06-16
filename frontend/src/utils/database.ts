import {GraphQLClient} from 'graphql-request';

export {gql} from 'graphql-request';

let apiUrl = '';

// Running server-side
if (typeof window === 'undefined') {
	apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL ?? '';
} else if (window.api_url) {
	apiUrl = window.api_url;
} else {
	throw new Error('No API url found is not defined');
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const API_ENDPOINT = `${apiUrl}/graphql`;
export const graphqlClient = new GraphQLClient(API_ENDPOINT);
export const graphqlSystemClient = new GraphQLClient(`${API_ENDPOINT}/system`);

export type NotNull<T> = T extends undefined ? never : T;
export type Required<T> = {
	[P in keyof T]-?: NotNull<T[P]>;
};
export type RequiredFields<T, K extends keyof T = keyof T> = T & Required<Pick<T, K>>;
