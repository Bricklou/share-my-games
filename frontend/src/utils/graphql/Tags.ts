import {type Variables, gql} from 'graphql-request';
import {type Game} from './Games';

export type Tag = {
	id: string;
	name: string;
	slug: string;
	games?: GameTag[];
};

export type GameTag = {
	id: string;
	tags_id: Tag;
	game_id: Game;
};

export type TagsListQueryItem = Tag & {
	games: {
		count: number;
	};
};
export type TagsListQuery = {
	tags: TagsListQueryItem[];
	meta: [
		{
			countDistinct: {
				id: number;
			};
		},
	];
};
export type TagsListQueryVariables = {
	sort: string[];
	page: number;
	limit: number;
} & Variables;
export const QUERY_TAGS_LIST = gql`
    query TagsList($sort: [String] = [], $page: Int = 1, $limit: Int = -1) {
        tags(
            filter: { games: { game_id: { status: { _eq: "published" } } } }
            sort: $sort
            page: $page
            limit: $limit
        ) {
            id
            name
            slug

            games: games_func {
                count
            }
        }

        meta: tags_aggregated {
            countDistinct {
                id
            }
        }
    }
`;

export type TagQuery = {
	tags: [
		Pick<Tag, 'id' | 'name' | 'slug'> & {
			games: Array<{
				game_id: Pick<
				Game,
				| 'id'
				| 'name'
				| 'slug'
				| 'rating'
				| 'create_at'
				| 'update_at'
				| 'published_at'
				| 'previews'
				| 'creator'
				>;
			}>;
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

export type TagQueryVariables = {
	slug: string;
} & Variables;

export const QUERY_TAG = gql`
    query Tag($slug: String!) {
        tags(filter: { slug: { _eq: $slug }, games: { game_id: { status: { _eq: "published" } } } }, limit: 1) {
            id
            name
            slug

            games {
                game_id(filter: { status: { _eq: "published" } }) {
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
                    creator {
                        name
                        slug
                    }
                }
            }
        }

        meta: game_aggregated(filter: { tags: { tags_id: { slug: { _eq: $slug } } }, status: { _eq: "published" } }) {
            countDistinct {
                id
            }
        }
    }
`;
