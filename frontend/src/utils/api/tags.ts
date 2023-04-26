import {type Paginated} from '@/types/paginated';
import {cache} from 'react';
import {QUERY_TAG, QUERY_TAGS_LIST, type Tag, type TagQuery, type TagQueryVariables, type TagsListQuery, TagsListQueryItem, type TagsListQueryVariables} from '../graphql/Tags';
import {graphqlClient} from '../database';

type GetTagsParams = {
	page?: number;
	limit?: number;
	sort?: Array<keyof Tag | `-${keyof Tag}`>;
};

const defaultPageLimit = 24;

export type GetTagsResult = TagsListQuery['tags'];
export const getTags = cache(async (params?: GetTagsParams): Promise<Paginated<GetTagsResult>> => {
	const pageLimit = params?.limit ?? defaultPageLimit;

	const data = await graphqlClient.request<TagsListQuery, TagsListQueryVariables>(QUERY_TAGS_LIST, {
		limit: pageLimit,
		page: params?.page ?? 1,
		sort: params?.sort ?? ['name'],
	});

	if (!data.tags) {
		return {data: [], meta: {itemsCount: 0, page: 0, pageSize: 0}};
	}

	return {
		data: data.tags,
		meta: {
			itemsCount: data.meta[0].countDistinct.id ?? 0,
			page: params?.page ?? 1,
			pageSize: pageLimit,
		},
	};
});

export type GetTagResult = TagQuery['tags'][0];
export const getTag = cache(async (slug: string, {withGames}: {withGames: boolean}): Promise<GetTagResult | undefined> => {
	const data = await graphqlClient.request<TagQuery, TagQueryVariables>(QUERY_TAG, {
		slug,
	});

	if (!data.tags) {
		return undefined;
	}

	const tagData: GetTagResult = {
		...data.tags[0],
		games: [],
	};

	if (withGames) {
		tagData.games = data.tags[0].games;
	} else {
		tagData.games = [];
	}

	return tagData;
});
