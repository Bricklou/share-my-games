import {GameView} from './game';
import {getGame} from '@/utils/api/games';
import {notFound} from 'next/navigation';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';

type PageProps = {
	params: {
		slug: string;
	};
};

export default async function GamePage(props: PageProps): Promise<JSX.Element> {
	if (!props.params.slug) {
		return notFound();
	}

	const game = await getGame(props.params.slug);

	if (!game) {
		return notFound();
	}

	return (
		<main className='container mx-auto py-8 max-w-screen flex-1'>
			<GameView data={game} />
		</main>
	);
}
