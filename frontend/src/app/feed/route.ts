import {generateRssFeed} from '@/utils/rss';
import {type NextRequest} from 'next/server';

export async function GET(request: NextRequest) {
	const feed = await generateRssFeed(request);

	return new Response(feed.rss2(), {
		headers: {'Content-Type': 'application/rss+xml'},
	});
}
