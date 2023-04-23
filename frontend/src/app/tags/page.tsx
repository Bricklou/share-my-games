import {getTags} from '@/utils/api/tags';
import {Tags} from './tags';
import {type SearchParams, getPageNumber} from '@/types/paginated';

export default async function TagsPage({searchParams}: {searchParams: SearchParams}) {
	const page: number = getPageNumber(searchParams);

	const tags = await getTags({
		page: page ?? 1,
	});

	return (
		<main className='flex-1 flex'>
			<div className='container mx-auto py-12 flex-1'>
				<Tags tagsData={tags} searchParams={{page}} />
			</div>
		</main>
	);
}
