import {Feed} from 'feed';
import {getGames} from './api/games';
import {getGlobals, makeUrl} from './api';

import {type Enclosure} from 'feed/lib/typings';

export async function generateRssFeed(request: Request): Promise<Feed> {
	const globals = await getGlobals();
	const games = await getGames({limit: -1, withDescription: true});

	const {url: reqUrl} = request;
	const parsedUrl = new URL(reqUrl);
	const domain = `${parsedUrl.protocol}//${parsedUrl.host}:${parsedUrl.port}`;

	const feed = new Feed({
		title: globals.projectName,
		description: globals.projectDescriptor,
		id: reqUrl,
		link: reqUrl,
		copyright: `All rights reserved ${globals.projectName}`,
		feedLinks: {
			rss2: `${domain}/rss`,
		},
		author: {
			name: globals.projectName,
			link: domain,
		},
	});

	games.data.forEach(game => {
		const gameUrl = `${domain}/game/${game.slug}`;

		let image: Enclosure | undefined;

		if (game.previews.length >= 1) {
			image = {
				url: makeUrl(game.previews[0].preview.id, {
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
