'use client';

import {Pagination} from '@/components/pagination/pagination';
import {type Paginated} from '@/types/paginated';
import {GetTagsResult, getTags} from '@/utils/api/tags';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {TagCard} from '@/components/card/tagCard';

export type TagsProps = {
	tagsData: Paginated<GetTagsResult>;
	searchParams: {
		page?: number;
	};
};

export function Tags(props: TagsProps): JSX.Element {
	const [page, setPage] = useState<number>(props.searchParams.page ?? 1);

	const {data: tagsData} = useQuery({
		queryKey: ['tags', {page}],
		async queryFn({queryKey}: {queryKey: [string, {page: number}]}) {
			const [, {page}] = queryKey;
			return getTags({page});
		},
		initialData: props.tagsData,
	});

	return (
		<div className='flex flex-col h-full'>
			<header className='flex flex-col md:flex-row items-center px-8 md:p-0 mb-8'>
				<h1 className='text-3xl font-bold mb-4'>Tags</h1>
			</header>
			<div className='flex-1'>
				<div className='grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 gap-4' role='grid rowgroup'>
					{tagsData.data.map(tag => (
						<TagCard tag={tag} key={tag.id} role='gridcell' />
					))}
				</div>
			</div>
			<div className='flex flex-row items-center justify-center px-8 mt-8 md:p-0'>
				<Pagination
					onChange={setPage}
					pageSize={tagsData.meta.pageSize}
					currentPage={tagsData.meta.page}
					itemsCount={tagsData.meta.itemsCount}
				/>
			</div>
		</div>
	);
}
