import {GameCard} from '@/components/card/gameCard';
import {getTag} from '@/utils/api/tags';
import {notFound} from 'next/navigation';

type PageProps = {
	params: {
		slug: string;
	};
};

export default async function TagPage(props: PageProps): Promise<JSX.Element> {
	const {slug} = props.params;

	if (!slug) {
		return notFound();
	}

	const tag = await getTag(slug, {
		withGames: true,
	});

	if (!tag) {
		return notFound();
	}

	return (
		<div className='flex-1 flex'>
			<div className='container mx-auto py-12 flex-1'>
				<h1 className='text-3xl font-bold mb-4'>
                    Games for{' '}
					<span className='text-primary'>{tag.name}</span>
					{' '}
                    tag
				</h1>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{tag.games?.map(game => (
						<GameCard key={game.game_id.id} game={game.game_id} />
					))}
				</div>
			</div>
		</div>
	);
}
