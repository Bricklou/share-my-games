import {type Variables, gql} from 'graphql-request';
import {Game, type GamesListQueryItem} from './Games';

export type Creator = {
	id: string;
	name: string;
	slug: string;
};

export type CreatorsListQueryItem = Creator & {
	games: {
		count: number;
	};
};
export type CreatorsListQuery = {
	creator: CreatorsListQueryItem[];
	meta: [
		{
			countDistinct: {
				id: number;
			};
		},
	];
};
export type CreatorsListQueryVariables = {
	limit?: number;
	page?: number;
	sort?: string[];
} & Variables;

export const QUERY_CREATOR_LIST = gql`
    query GameList($limit: Int = -1, $page: Int = 1) {
        creator: game_creator(limit: $limit, page: $page, filter: { games: { status: { _eq: "published" } } }) {
            id
            name
            slug
            games: games_func {
                count
            }
        }

        meta: game_creator_aggregated(filter: { games: { status: { _eq: "published" } } }) {
            countDistinct {
                id
            }
        }
    }
`;

export type CreatorQuery = {
	creator: [
		Pick<Creator, 'id' | 'name' | 'slug'> & {
			games: Array<GamesListQueryItem<false>>;
		},
	];
	meta: [
		{
			countDistinct: {
				id: number;
			};
		},
	];
};
export type CreatorQueryVariables = {
	slug: string;
} & Variables;

export const QUERY_CREATOR = gql`
    query Creator($slug: String!) {
        creator: game_creator(limit: 1, filter: { slug: { _eq: $slug }, games: { status: { _eq: "published" } } }) {
            id
            name
            slug
            games(filter: { status: { _eq: "published" } }) {
                id
                name
                slug
                rating
                create_at
                update_at
                published_at
                previews(limit: 1, sort: ["position"]) {
                    id
                    preview {
                        id
                    }
                    is_nsfw
                }
            }
        }

        meta: game_aggregated(filter: { creator: { slug: { _eq: $slug } }, status: { _eq: "published" } }) {
            countDistinct {
                id
            }
        }
    }
`;
