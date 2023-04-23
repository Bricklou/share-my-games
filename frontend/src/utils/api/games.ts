//import type {Game, SocialNetworks} from '../../types/games';
import type {Paginated} from '@/types/paginated';
import type {Filter, Deep} from '@directus/sdk';
import {cache} from 'react';
import { QUERY_GAMES_LIST } from '../graphql/GameList';
import { ArrayItem, graphqlClient } from '../database';
import { Game, GameListQuery, GameListQueryVariables } from '../gql-gen/graphql';


type GetGamesParams = {
	sortBy?: keyof Game | `-${keyof Game}`;
	page?: number;
	limit?: number;
	filter?: Filter<Game>;
	deep?: Deep<Game>;
};

const defaultPageLimit = 18;

export const getGames = cache(async (params?: GetGamesParams): Promise<Paginated<GameListQuery['game']>> => {
	const pageLimit = params?.limit ?? defaultPageLimit;

    const data = await graphqlClient.request<GameListQuery, GameListQueryVariables>(QUERY_GAMES_LIST, {
        limit: pageLimit,
        sort: params?.sortBy ? [params.sortBy] : ['-published_at'],
        page: params?.page,
    })

	if (!data.game) {
		return {data: [], meta: {itemsCount: 0, page: 0, pageSize: 0}};
	}

	return {
		data: data.game,
		meta: {
			itemsCount: data.meta[0].countDistinct?.id ?? 0,
			page: params?.page ?? 1,
			pageSize: pageLimit,
		},
	};
});

export const getGame = cache(async (slug: string): Promise<Game | undefined> => {
	const {data: gameData} = await directus.items<'game', directusTypes.Game>('game').readByQuery({
		fields: [
			'*',
			// Creator
			'creator.*',
			// Previews
			'previews.*',
			// Socials
			'socials.*',
			// Tags relation
			'tags.*.id',
			'tags.*.name',
			'tags.*.slug',
		],
		filter: {
			slug: {
				_eq: slug,
			},
			status: {
				_eq: 'published',
			},
		},
		limit: 1,
	});

	if (!gameData?.length) {
		return undefined;
	}

	const tags = gameData[0].tags.map(item => item.tags_id) as Tag[];

	/* eslint-disable @typescript-eslint/naming-convention */
	const game: Game = {
		id: gameData[0].id,
		name: gameData[0].name,
		description: gameData[0].description!,
		slug: gameData[0].slug,
		creator: gameData[0].creator as unknown as Creator,
		create_at: gameData[0].create_at!,
		update_at: gameData[0].update_at!,
		published_at: gameData[0].published_at!,
		rating: gameData[0].rating!,
		socials: gameData[0].socials as unknown as SocialNetworks[],
		tags,
		status: gameData[0].status as unknown as directusTypes.GameStatus,
		previews: gameData[0].previews as unknown as GamePreview[],
		dev_finished: gameData[0].dev_finished,
	};
	/* eslint-enable @typescript-eslint/naming-convention */

	return game;
});

export type GameSearchResult = Pick<Game, 'id' | 'name' | 'slug' | 'creator'>;

export const searchGames = cache(async (query: string): Promise<GameSearchResult[]> => {
	const {data} = await directus.items<'game', GameSearchResult>('game').readByQuery({
		fields: ['id', 'name', 'slug', 'creator.*'],
		filter: {
			_or: [
				{
					name: {
						_icontains: query,
					},
				},
				{
					slug: {
						_icontains: query,
					},
				},
				{
					creator: {
						name: {
							_icontains: query,
						},
					},
				},
			],
			status: {
				_eq: 'published',
			},
		},
		limit: 10,
	});

	if (!data) {
		return [];
	}

	return data;
});
