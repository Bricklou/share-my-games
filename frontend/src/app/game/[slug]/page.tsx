import {GameView} from './game';
import {getGame} from '@/utils/api/games';
import {notFound} from 'next/navigation';
import {type Metadata} from 'next';
import {getGlobals, makeUrl} from '@/utils/api';

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

		const globals = await getGlobals();
		const game = await getGame(params.slug);

		if (!game) {
			throw new Error('No game');
		}

		const previews = game.previews?.map(preview => makeUrl(preview.preview, {filename: 'image.png'})) ?? [];

		return {
			title: game.name,
			description: globals.project_descriptor,
			authors: {
				name: game.creator.name,
			},
			keywords: game.tags.map(tag => tag.name).join(', '),
			applicationName: globals.project_name,
			openGraph: {
				siteName: globals.project_name,
				title: game.name,
				description: globals.project_descriptor,
				type: 'article',
				authors: game.creator.name,
				images: previews,
				publishedTime: game.published_at,
				tags: game.tags.map(tag => tag.name),
			},
			twitter: {
				site: globals.project_name,
				title: game.name,
				description: globals.project_descriptor,
				images: previews,
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
