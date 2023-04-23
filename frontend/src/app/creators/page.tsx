import {getCreators} from '@/utils/api/creators';
import {Creators} from './creators';
import {type SearchParams, getPageNumber} from '@/types/paginated';

export default async function CreatorsPage({searchParams}: {searchParams: SearchParams}) {
	const page: number = getPageNumber(searchParams);

	const creators = await getCreators({
		page: page ?? 1,
	});

	return (
		<main className='flex-1 flex'>
			<div className='container mx-auto py-12 flex-1'>
				<Creators creatorsData={creators} searchParams={{page}} />
			</div>
		</main>
	);
}
