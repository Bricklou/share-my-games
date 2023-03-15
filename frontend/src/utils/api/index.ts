import {type Settings} from '@/types/games';
import {directus} from '@/utils/database';
import {type DefaultItem} from '@directus/sdk';

export async function getGlobals(): Promise<DefaultItem<Settings>> {
	const settings = await directus.singleton('directus_settings').read();

	if (!settings) {
		throw new Error('Settings not found');
	}

	return settings as DefaultItem<Settings>;
}
