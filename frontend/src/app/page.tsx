import {type Game} from '@/types/games';
import {getGames} from '@/utils/api/games';
import {useSearchParams} from 'next/navigation';
import {useEffect} from 'react';
import {HomeGrid} from './homeGrid';

type SearchParams = Record<string, string | string[] | undefined>;

export default async function Home({searchParams}: {searchParams: SearchParams}) {
	let sort: keyof Game | undefined;
	let sortOrder: 'asc' | 'desc' | undefined;

	if (searchParams) {
		if (
			searchParams.sort
            && typeof searchParams.sort === 'string'
            && searchParams.sort in ['name', 'creator.name', 'rating', 'published_at']
		) {
			sort = searchParams.sort as keyof Game;
		}

		if (
			searchParams.sortOrder
            && typeof searchParams.sortOrder === 'string'
            && searchParams.sortOrder in ['asc', 'desc']
		) {
			sortOrder = searchParams.sortOrder as 'asc' | 'desc';
		}
	}

	const games = await getGames({
		sortBy: sort ?? 'name',
	});

	return (
		<main className='flex-1'>
			<div className='container mx-auto py-12'>
				<HomeGrid
					games={games}
					searchParams={{
						sort,
						sortOrder,
					}}
				/>
			</div>
		</main>
	);
}
