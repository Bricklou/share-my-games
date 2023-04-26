import {type Variables} from 'graphql-request';
import {gql} from '../database';
import {type Creator} from './Creators';
import {type GameTag} from './Tags';

export type Preview = {
	id: string;
	preview: {
		id: string;
	};
	is_nsfw: boolean;
};

export enum GameStatus {
	Draft = 'draft',
	UnderReview = 'under_review',
	Ready = 'ready',
	Published = 'published',
}

export enum SocialNetworkType {
	Discord = 'discord',
	Patreon = 'patreon',
	ItchIo = 'itch',
	Website = 'website',
	Twitter = 'twitter',
	Subscribestar = 'subscribestar',
	Steam = 'steam',
}

export type SocialNetwork = {
	id: string;
	game_id?: Game;
	link: string;
	type: SocialNetworkType;
};

export type Game = {
	id: string;
	create_at: string;
	update_at: string;
	name: string;
	slug: string;
	creator: Creator;
	published_at: string;
	status: GameStatus;
	dev_finished: boolean;
	tags: GameTag[];
	rating: number | undefined;
	description: string;
	previews: Preview[];
	socials: SocialNetwork[];
};

export type GamesListQueryFields = 'id' | 'name' | 'slug' | 'rating' | 'create_at' | 'update_at' | 'published_at' | 'creator' | 'previews';
export type GamesListQueryItem<Description extends boolean> = Pick<Game, Description extends true ? GamesListQueryFields | 'description' : GamesListQueryFields>;
export type GamesListQuery<Description extends boolean> = {
	game: Array<GamesListQueryItem<Description>>;
	meta: [{
		countDistinct: {
			id: number;
		};
	}];
};
export type GamesListQueryVariables = {
	limit?: number;
	sort?: string[];
	page?: number;
} & Variables;

export const QUERY_GAMES_LIST = gql`
    query GameList($limit: Int = -1, $sort: [String] = [], $page: Int = 1, $withDescription: Boolean = false) {
        game(
            limit: $limit,
            sort: $sort,
            page: $page,
            filter: { status: { _eq: "published" } }
        ) {
            id
            name
            slug
            rating
            create_at
            update_at
            published_at
            description @include(if: $withDescription)
            creator {
                id
                name
                slug
            }
            previews(limit: 1, sort: ["position"]) {
                id
                preview {
                    id
                }
                is_nsfw
            }
        }

        meta: game_aggregated {
            countDistinct {
                id
            }
        }
    }
`;

export type GameQuery = {
	game: [Pick<
	Game,
	'id' | 'name' | 'slug' | 'rating' | 'description' | 'create_at' | 'update_at' | 'published_at' | 'creator' | 'previews' | 'socials' | 'tags'
	| 'dev_finished'
	>];
};
export type GameQueryVariables = {
	slug: string;
} & Variables;
export const QUERY_GAME = gql`
    query Game($slug: String!) {
        game(
            limit: 1,
            filter: { slug: { _eq: $slug },
            status: { _eq: "published" } }
        ) {
            id
            name
            slug
            rating
            description
            create_at
            update_at
            published_at
            dev_finished
            creator {
                id
                name
                slug
            }
            previews {
                id
                preview {
                    id
                }
                is_nsfw
                position
            }
            socials(sort: ["type"]) {
                id
                link
                type
            }
            tags(sort: ["tags_id.name"]) {
                id
                tags_id {
                    id
                    name
                    slug
                }
            }
        }
    }
`;

export type GameSearchQueryItem = Pick<Game, 'id' | 'name' | 'slug' | 'creator'>;
export type GameSearchQuery = {
	game: GameSearchQueryItem[];
};
export type GameSearchQueryVariables = {
	search: string;
} & Variables;
export const QUERY_GAME_SEARCH = gql`
    query GameSearch($search: String!) {
        game(
            limit: 10,
            filter: {
                _or: [
                    {
                        name: { _icontains: $search }
                    },
                    {
                        slug: { _icontains: $search }
                    },
                    {
                        creator: { name: { _icontains: $search } }
                    }
                ],
                status: { _eq: "published" }
            }
        ) {
            id
            name
            slug
            creator {
                id
                name
                slug
            }
        }
    }
`;
