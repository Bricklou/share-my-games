import {GameCard} from '@/components/card/gameCard';
import {getCreator} from '@/utils/api/creators';
import {notFound} from 'next/navigation';

type PageProps = {
	params: {
		slug: string;
	};
};

export default async function CreatorPage(props: PageProps): Promise<JSX.Element> {
	const {slug} = props.params;

	if (!slug) {
		return notFound();
	}

	const creator = await getCreator(slug, {
		withGames: true,
	});

	if (!creator) {
		return notFound();
	}

	creator.games.forEach(game => {
		game.creator = {
			id: creator.id,
			name: creator.name,
			slug: creator.slug,
		};
	});

	return (
		<div className='flex-1 flex'>
			<div className='container mx-auto py-12 flex-1'>
				<h1 className='text-3xl font-bold mb-4'>
					<span className='text-primary'>{creator.name}</span>
                    &#39;s games
				</h1>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{creator.games?.map(game => (
						<GameCard key={game.id} game={game} />
					))}
				</div>
			</div>
		</div>
	);
}
