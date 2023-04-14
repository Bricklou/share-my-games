import type {Game, Creator, Tag, GamePreview} from '@/types/games';
import {type Paginated} from '@/types/paginated';
import {directus} from '../database';

type GetCreatorsParams = {
	page?: number;
	limit?: number;
};

const defaultPageLimit = 36;

export async function getCreators(params?: GetCreatorsParams): Promise<Paginated<Creator>> {
	const pageLimit = params?.limit ?? defaultPageLimit;
	const {data, meta} = await directus.items<'game_creator', Creator>('game_creator').readByQuery({
		fields: ['*', 'games.id'],
		limit: pageLimit,
		page: params?.page,
		meta: 'filter_count',

		filter: {
			games: {
				status: {
					_eq: 'published',
				},
			},
		},
	});

	if (!data) {
		return {data: [], meta: {itemsCount: 0, page: 0, pageSize: 0}};
	}

	const creators: Creator[] = [];
	for (const creator of data) {
		creators.push({
			...creator,
			games: creator.games as unknown as Game[],
		});
	}

	return {
		data: creators,
		meta: {
			itemsCount: meta?.filter_count ?? 0,
			page: params?.page ?? 1,
			pageSize: pageLimit,
		},
	};
}

export async function getCreator(slug: string, {withGames}: {withGames: boolean}): Promise<Creator | undefined> {
	const {data: creatorData} = await directus.items<'game_creator', Creator>('game_creator').readByQuery({
		fields: withGames ? ['*', 'games.*', 'games.creator.*', 'games.previews.*', 'games.rating'] : ['*'],
		deep: {
			games: {
				previews: {
					_limit: 1,
				},
			},
		},
		filter: {
			slug: {
				_eq: slug,
			},
		},
		limit: 1,
	});

	if (!creatorData?.length) {
		return undefined;
	}

	const creator: Creator = {
		id: creatorData[0].id,
		name: creatorData[0].name,
		slug: creatorData[0].slug,
	};

	if (withGames) {
		const games: Game[] = creatorData[0].games?.map(game => ({
			...game,
			status: game.status as Game['status'],
			creator: game.creator as unknown as Creator,
			tags: [] as Tag[],
			previews: game.previews as unknown as GamePreview[],
		})) ?? [];

		creator.games = games;
	}

	return creator;
}
