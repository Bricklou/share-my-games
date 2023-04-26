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

		const previews
            = game.previews?.map(preview => makeUrl(preview.preview.id, {filename: 'image.png'})) ?? [];
		const tags
            = game.tags?.map(tag => tag?.tags_id?.name).filter(Boolean).join(', ') ?? undefined;

		return {
			title: game.name,
			description: globals.projectDescriptor,
			authors: {
				name: game.creator?.name ?? undefined,
			},
			keywords: game.tags
				?.map(tag => tag?.tags_id?.name)
				.filter(Boolean)
				.join(', '),
			applicationName: globals.projectName,
			openGraph: {
				siteName: globals.projectName,
				title: game.name,
				description: globals.projectDescriptor,
				type: 'article',
				authors: game.creator?.name ?? undefined,
				images: previews,
				publishedTime: game.published_at ?? undefined,
				tags,
			},
			twitter: {
				site: globals.projectName,
				title: game.name,
				description: globals.projectDescriptor,
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
