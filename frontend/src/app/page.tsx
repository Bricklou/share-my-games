import {type Game} from '@/types/games';
import {getGames} from '@/utils/api/games';
import {HomeGrid} from './homeGrid';
import {type SearchParams} from '@/types/paginated';
import {getPageNumber} from '@/types/paginated';

export default async function Home({searchParams}: {searchParams: SearchParams}) {
	let sort: keyof Game | undefined;
	let sortOrder: 'asc' | 'desc' | undefined;
	let page: number | undefined;

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

		page = getPageNumber(searchParams);
	}

	const games = await getGames({
		sortBy: sort ?? undefined,
		page: page ?? 1,
	});

	return (
		<main className='flex-1 flex'>
			<div className='container mx-auto py-12 flex-1'>
				<HomeGrid
					gamesData={games}
					searchParams={{
						sort,
						sortOrder,
						page,
					}}
				/>
			</div>
		</main>
	);
}
