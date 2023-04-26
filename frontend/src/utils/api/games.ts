import type {Paginated} from '@/types/paginated';
import {cache} from 'react';
import {type Game, type GamesListQueryFields, type GamesListQuery, QUERY_GAME, QUERY_GAMES_LIST, type GamesListQueryVariables, type GameQuery, type GameQueryVariables, type GameSearchQuery, type GameSearchQueryVariables, QUERY_GAME_SEARCH} from '../graphql/Games';
import {RequiredFields, graphqlClient} from '../database';

type GetGamesParams<T extends boolean> = {
	sortBy?: GamesListQueryFields | `-${GamesListQueryFields}`;
	page?: number;
	limit?: number;
	withDescription?: T;
};

const defaultPageLimit = 18;

export type GetGamesResult<WithDescription extends boolean> = GamesListQuery<WithDescription>['game'];
export const getGames = cache(async <T extends boolean>(params?: GetGamesParams<T>): Promise<Paginated<GetGamesResult<T>>> => {
	const pageLimit = params?.limit ?? defaultPageLimit;

	const data = await graphqlClient.request<GamesListQuery<T>, GamesListQueryVariables>(QUERY_GAMES_LIST, {
		limit: pageLimit,
		sort: params?.sortBy ? [params.sortBy] : ['-published_at'],
		page: params?.page,
		withDescription: params?.withDescription ?? false,
	});

	if (!data.game) {
		return {data: [], meta: {itemsCount: 0, page: 0, pageSize: 0}};
	}

	return {
		data: data.game,
		meta: {
			itemsCount: data.meta[0].countDistinct.id ?? 0,
			page: params?.page ?? 1,
			pageSize: pageLimit,
		},
	};
});

export type GetGameResult = GameQuery['game'][0];
export const getGame = cache(async (slug: string): Promise<GetGameResult | undefined> => {
	const data = await graphqlClient.request<GameQuery, GameQueryVariables>(QUERY_GAME, {
		slug,
	});

	if (!data.game.length) {
		return undefined;
	}

	return data.game[0];
});

export type GameSearchResult = Pick<Game, 'id' | 'name' | 'slug' | 'creator'>;

export const searchGames = cache(async (query: string): Promise<GameSearchResult[]> => {
	const data = await graphqlClient.request<GameSearchQuery, GameSearchQueryVariables>(QUERY_GAME_SEARCH, {
		search: query,
	});

	if (!data) {
		return [];
	}

	return data.game;
});
