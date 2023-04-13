import {GameView} from './game';
import {getGame} from '@/utils/api/games';
import {notFound} from 'next/navigation';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';
import {type Metadata} from 'next';
import {makeUrl} from '@/utils/api';

type PageProps = {
	params: {
		slug: string;
	};
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
	try {
		if (!params.slug) {
			throw new Error('No slug');
		}

		const game = await getGame(params.slug);

		if (!game) {
			throw new Error('No game');
		}

		return {
			title: game.name,
			description: 'Simple website to share all the kinky games I played. UwU',
			authors: {
				name: game.creator.name,
			},
			keywords: game.tags.map(tag => tag.name).join(', '),
			applicationName: 'Sharing my games',
			openGraph: {
				siteName: 'Sharing my games',
				title: game.name,
				description: 'Simple website to share all the kinky games I played. UwU',
				type: 'article',
				authors: game.creator.name,
				images: game.previews?.map(preview => makeUrl(preview.preview, {filename: 'image.png'})) ?? [],
				publishedTime: game.published_at,
				tags: game.tags.map(tag => tag.name),
			},
			twitter: {
				site: 'Sharing my games',
				title: game.name,
				description: 'Simple website to share all the kinky games I played. UwU',
				images: game.previews?.map(preview => makeUrl(preview.preview, {filename: 'image.png'})) ?? [],
				card: 'summary_large_image',
			},
		} satisfies Metadata;
	} catch (e) {
		return {
			title: 'Sharing my games',
			description: 'Simple website to share all the kinky games I played. UwU',
		};
	}
}

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
