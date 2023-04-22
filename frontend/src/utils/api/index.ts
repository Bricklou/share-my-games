import {type Settings} from '@/types/games';
import {directus} from '@/utils/database';
import {type DefaultItem} from '@directus/sdk';
import {cache} from 'react';

export const getGlobals = cache(async (): Promise<DefaultItem<Settings>> => {
	const settings = await directus.singleton('directus_settings').read();

	if (!settings) {
		throw new Error('Settings not found');
	}

	return settings as DefaultItem<Settings>;
});

export function makeUrl(hash: string, options?: {width?: number; filename?: string}): string {
	const url = `${process.env.NEXT_PUBLIC_DIRECTUS_URL ?? ''}/assets/${hash}` + (options?.filename ? `/${options.filename}` : '') + (options?.width ? `?width=${options.width}` : '');

	return url;
}
