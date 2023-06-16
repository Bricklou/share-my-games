import {NextResponse} from 'next/server';

export async function GET(req: Request) {
	return new NextResponse(
		`window.api_url = '${process.env.NEXT_PUBLIC_DIRECTUS_URL ?? ''}'`,
	);
}
