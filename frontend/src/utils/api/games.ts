import {type Creator, type Tag, type Game} from '../../types/games';
import {directus} from '@/utils/database';
import type * as directusTypes from '@/types/directus';

type GetGamesParams = {
	sortBy?: keyof Game | `-${keyof Game}`;
};

export async function getGames(params?: GetGamesParams): Promise<Game[]> {
	const {data} = await directus.items<'game', Game>('game').readByQuery({
		fields: ['*', 'creator.*', 'rating'],
		sort: params?.sortBy ? [params.sortBy] : ['-published_at'],
	});

	if (!data) {
		return [];
	}

	const games: Game[] = [];

	for (const game of data) {
		games.push({
			...game,
			creator: game.creator as unknown as Creator,
			tags: [],
			previews: [],
		});
	}

	return games;
}

export async function getGame(slug: string): Promise<Game | undefined> {
	const {data: gameData} = await directus.items<'game', directusTypes.Game>('game').readByQuery({
		fields: [
			'id',
			'create_at',
			'update_at',
			'name',
			'slug',
			'published_at',
			'creator.*',
			'description',
			'rating',
			// Tags relation
			'tags.*.id',
			'tags.*.name',
			'tags.*.slug',
		],
		filter: {
			slug: {
				_eq: slug,
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
		tags,
		previews: [],
	};
	/* eslint-enable @typescript-eslint/naming-convention */

	return game;
}

export type GameSearchResult = Omit<
Game,
'tags' | 'create_at' | 'update_at' | 'published_at' | 'tags' | 'previews' | 'description'
>;

export async function searchGames(query: string): Promise<GameSearchResult[]> {
	const {data} = await directus.items<'game', GameSearchResult>('game').readByQuery({
		fields: ['id', 'name', 'slug', 'creator.*'],
		filter: {
			_or: [
				{
					name: {
						_contains: query,
					},
				},
				{
					slug: {
						_contains: query,
					},
				},
				{
					creator: {
						name: {
							_contains: query,
						},
					},
				},
			],
		},
		limit: 10,
	});

	if (!data) {
		return [];
	}

	return data;
}
