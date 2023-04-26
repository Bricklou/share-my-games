import {type Paginated} from '@/types/paginated';
import {cache} from 'react';
import { Creator, CreatorQuery, CreatorQueryVariables, CreatorsListQuery, CreatorsListQueryItem, CreatorsListQueryVariables, QUERY_CREATOR, QUERY_CREATOR_LIST } from '../graphql/Creators';
import { graphqlClient } from '../database';

type GetCreatorsParams = {
	page?: number;
	limit?: number;
	sort?: Array<keyof Creator | `-${keyof Creator}`>;
};

const defaultPageLimit = 24;

export type GetCreatorsResult = CreatorsListQuery['creator'];
export const getCreators = cache(async (params?: GetCreatorsParams): Promise<Paginated<GetCreatorsResult>> => {
	const pageLimit = params?.limit ?? defaultPageLimit;
    const data = await graphqlClient.request<CreatorsListQuery, CreatorsListQueryVariables>(QUERY_CREATOR_LIST, {
        limit: pageLimit,
        page: params?.page,
        sort: params?.sort ?? ['name'],
    })

	if (!data.creator) {
		return {data: [], meta: {itemsCount: 0, page: 0, pageSize: 0}};
	}

	return {
		data: data.creator,
		meta: {
			itemsCount: data.meta[0].countDistinct.id ?? 0,
			page: params?.page ?? 1,
			pageSize: pageLimit,
		},
	};
});

export type GetCreatorResult = CreatorQuery['creator'][0];
export const getCreator = cache(async (slug: string, {withGames}: {withGames: boolean}): Promise<GetCreatorResult | undefined> => {
    const data = await graphqlClient.request<CreatorQuery, CreatorQueryVariables>(QUERY_CREATOR, {
        slug
    })

	if (!data.creator) {
		return undefined;
	}

    let creatorData = data.creator[0];

    if (withGames) {
        creatorData.games = data.creator[0].games
    } else {
        creatorData.games = [];
    }

	return creatorData;
});
