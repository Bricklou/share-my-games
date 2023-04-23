import {directus} from '@/utils/database';
import type {Game, Tag, GamePreview, Creator} from '@/types/games';
import {type Paginated} from '@/types/paginated';
import {cache} from 'react';
import type * as directusTypes from '@/types/directus';

type GetTagsParams = {
	page?: number;
	limit?: number;
	sort?: Array<keyof Tag | `-${keyof Tag}`>;
};

const defaultPageLimit = 24;

export const getTags = cache(async (params?: GetTagsParams): Promise<Paginated<Tag>> => {
	const pageLimit = params?.limit ?? defaultPageLimit;

	const {data, meta} = await directus.items<'tags', directusTypes.Tags>('tags').readByQuery({
		fields: ['id', 'slug', 'name', 'games.id'],
		limit: pageLimit,
		page: params?.page,
		meta: '*',
		sort: params?.sort ?? ['name'],
		filter: {
			games: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				game_id: {
					status: {
						_eq: 'published',
					},
				},
			},
		},
	});

	if (!data) {
		return {data: [], meta: {itemsCount: 0, page: 0, pageSize: 0}};
	}

	const tags: Tag[] = [];
	for (const tag of data) {
		tags.push({
			id: tag.id,
			name: tag.name,
			slug: tag.slug ?? '',
			games: tag.games as unknown as Game[],
		});
	}

	return {
		data: tags,
		meta: {
			itemsCount: meta?.filter_count ?? 0,
			page: params?.page ?? 1,
			pageSize: pageLimit,
		},
	};
});

export const getTag = cache(async (slug: string, {withGames}: {withGames: boolean}): Promise<Tag | undefined> => {
	const {data: tagData} = await directus.items<'tags', directusTypes.Tags>('tags').readByQuery({
		fields: withGames ? ['*', 'games.*.*', 'games.*.creator.*', 'games.*.previews.*'] : ['*'],
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

	if (!tagData?.length) {
		return undefined;
	}

	const tag: Tag = {
		id: tagData[0].id,
		name: tagData[0].name,
		slug: tagData[0].slug ?? '',
	};

	if (withGames) {
		console.log(tagData[0].games);
		/* eslint-disable @typescript-eslint/naming-convention */
		const games: Game[] = tagData[0].games?.map(({game_id: game}) => ({
			id: game.id,
			name: game.name,
			slug: game.slug,
			description: '',
			create_at: game.create_at ?? '',
			published_at: game.published_at ?? '',
			update_at: game.update_at ?? '',
			creator: game.creator as unknown as Creator,
			tags: [] as Tag[],
			previews: game.previews as unknown as GamePreview[],
			dev_finished: game.dev_finished,
			socials: game.socials,
			rating: game.rating,
			status: game.status as directusTypes.GameStatus,
		} satisfies Game)) ?? [];
		/* eslint-enable @typescript-eslint/naming-convention */

		tag.games = games;
	}

	return tag;
});
