import type {Creator, Tag, Game, SocialNetworks, GamePreview} from '../../types/games';
import {directus} from '@/utils/database';
import type * as directusTypes from '@/types/directus';

type GetGamesParams = {
	sortBy?: keyof Game | `-${keyof Game}`;
};

export async function getGames(params?: GetGamesParams): Promise<Game[]> {
	const {data} = await directus.items<'game', Game>('game').readByQuery({
		fields: ['*', 'creator.*', 'rating', 'previews.*'],
		filter: {
			status: {
				_eq: 'published',
			},
		},
		deep: {
			previews: {
				_limit: 1,
			},
		},

		sort: params?.sortBy ? [params.sortBy] : ['-published_at'],
	});

	if (!data) {
		return [];
	}

	const games: Game[] = [];

	for (const game of data) {
		games.push({
			...game,
			status: game.status as unknown as directusTypes.GameStatus,
			creator: game.creator as unknown as Creator,
			tags: [],
			previews: game.previews as unknown as GamePreview[],
		});
	}

	return games;
}

export async function getGame(slug: string): Promise<Game | undefined> {
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
	};
	/* eslint-enable @typescript-eslint/naming-convention */

	return game;
}

export type GameSearchResult = Pick<Game, 'id' | 'name' | 'slug' | 'creator'>;

export async function searchGames(query: string): Promise<GameSearchResult[]> {
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
}
