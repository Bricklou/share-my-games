'use client';

import {Pagination} from '@/components/pagination/pagination';
import {type Paginated} from '@/types/paginated';
import {GetCreatorsResult, getCreators} from '@/utils/api/creators';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {CreatorCard} from '@/components/card/creatorCard';

export type CreatorsProps = {
	creatorsData: Paginated<GetCreatorsResult>;
	searchParams: {
		page?: number;
	};
};

export function Creators(props: CreatorsProps): JSX.Element {
	const [page, setPage] = useState<number>(props.searchParams.page ?? 1);

	const {data: creatorsData} = useQuery({
		queryKey: ['creators', {page}],
		async queryFn({queryKey}: {queryKey: [string, {page: number}]}) {
			const [, {page}] = queryKey;
			return getCreators({page});
		},
		initialData: props.creatorsData,
	});

	return (
		<div className='flex flex-col h-full'>
			<header className='flex flex-col md:flex-row items-center px-8 md:p-0 mb-8'>
				<h1 className='text-3xl font-bold mb-4'>Creators</h1>
			</header>
			<div className='flex-1'>
				<div className='grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 gap-4' role='grid rowgroup'>
					{creatorsData.data.map(creator => (
						<CreatorCard creator={creator} key={creator.id} role='gridcell' />
					))}
				</div>
			</div>
			<div className='flex flex-row items-center justify-center px-8 mt-8 md:p-0'>
				<Pagination
					onChange={setPage}
					pageSize={creatorsData.meta.pageSize}
					currentPage={creatorsData.meta.page}
					itemsCount={creatorsData.meta.itemsCount}
				/>
			</div>
		</div>
	);
}
