'use client';

import {GameCard} from '@/components/card/gameCard';
import {FormSelect} from '@/components/select/select';
import {type Game} from '@/types/games';
import {getGames} from '@/utils/api/games';
import {useQuery} from '@tanstack/react-query';
import {SortAsc, SortDesc} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import qs from 'qs';
import {Pagination} from '@/components/pagination/pagination';
import {type Paginated} from '@/types/paginated';

type HomeGridProps = {
	gamesData: Paginated<Game>;
	searchParams: {
		sort?: keyof Game;
		sortOrder?: 'asc' | 'desc';
		page?: number;
	};
};

export function HomeGrid(props: HomeGridProps): JSX.Element {
	const router = useRouter();

	const [sort, setSort] = useState<keyof Game>(props.searchParams.sort ?? 'create_at');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
		props.searchParams.sortOrder ?? (sort === 'create_at' ? 'desc' : 'asc'),
	);
	const [page, setPage] = useState<number>(props.searchParams.page ?? 1);

	const {data: gamesData} = useQuery({
		queryKey: ['home', {sort, sortOrder, page}],
		async queryFn({queryKey}: {queryKey: [string, {sort: keyof Game; sortOrder: 'asc' | 'desc'; page: number}]}) {
			const [, {sort, sortOrder, page}] = queryKey;
			router.push(qs.stringify({sort, sortOrder, page}, {addQueryPrefix: true}));
			return getGames({sortBy: `${sortOrder === 'asc' ? '' : '-'}${sort}`, page});
		},
		initialData: props.gamesData,
	});

	return (
		<div className='flex flex-col h-full'>
			<header className='flex flex-col md:flex-row items-center px-8 md:p-0 mb-8'>
				<h1 className='text-3xl font-bold mb-4'>List of games I played</h1>
				<div className='flex-1 flex justify-end w-full items-center gap-2'>
					<div>
						<button
							type='button'
							className='btn btn-ghost btn-sm'
							onClick={() => {
								setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
							}}
							title={sortOrder === 'asc' ? 'Sort Ascending' : 'Sort Descending'}
						>
							{sortOrder === 'asc' ? <SortAsc /> : <SortDesc />}
						</button>
					</div>
					<FormSelect
						name='Sort By'
						parentClass='md:max-w-xs flex-1 w-full'
						className='w-full'
						value={sort}
						onChange={event => {
							setSort(event.target.value as keyof Game);
						}}
					>
						<option value='name'>Name</option>
						<option value='creator.name'>Creator</option>
						<option value='published_at'>Publish Date</option>
						<option value='rating'>Rating</option>
						<option value='create_at'>Recently added</option>
					</FormSelect>
				</div>
			</header>
			<div className='flex-1'>
				<div className='grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 gap-4'>
					{gamesData.data.map(game => (
						<GameCard key={game.id} game={game} />
					))}
				</div>
			</div>
			<div className='flex flex-row items-center justify-center px-8 mt-8 md:p-0'>
				<Pagination
					onChange={setPage}
					pageSize={gamesData.meta.pageSize}
					currentPage={gamesData.meta.page}
					itemsCount={gamesData.meta.itemsCount}
				/>
			</div>
		</div>
	);
}
