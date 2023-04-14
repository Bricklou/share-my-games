import {Feed} from 'feed';
import {getGames} from './api/games';
import {getGlobals, makeUrl} from './api';
import url from 'url';
import {type Enclosure} from 'feed/lib/typings';

export async function generateRssFeed(request: Request): Promise<Feed> {
	const globals = await getGlobals();
	const games = await getGames({limit: -1});

	const {url: reqUrl} = request;
	const parsedUrl = new URL(reqUrl);
	const domain = `${parsedUrl.protocol}//${parsedUrl.host}:${parsedUrl.port}`;

	const feed = new Feed({
		title: globals.project_name,
		description: globals.project_descriptor,
		id: reqUrl,
		link: reqUrl,
		copyright: `All rights reserved ${globals.project_name}`,
		feedLinks: {
			rss2: `${domain}/rss`,
		},
		author: {
			name: globals.project_name,
			link: domain,
		},
	});

	games.data.forEach(game => {
		const gameUrl = `${domain}/game/${game.slug}`;

		let image: Enclosure | undefined;

		if (game.previews.length >= 1) {
			image = {
				url: makeUrl(game.previews[0].preview, {
					filename: 'preview.png',
				}),
				type: 'image/png',
				title: 'preview.png',
			};
		}

		feed.addItem({
			title: game.name,
			id: gameUrl,
			link: gameUrl,
			description: game.slug,
			content: game.description,
			author: [{email: game.creator.name}],
			date: new Date(game.published_at),
			image,
		});
	});

	return feed;
}
