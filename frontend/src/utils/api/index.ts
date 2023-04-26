
import {cache} from 'react';
import {type RequiredFields, graphqlSystemClient} from '../database';
import {QUERY_SETTINGS, type GlobalSettingsQuery} from '../graphql/Global';

type GlobalSettings = RequiredFields<GlobalSettingsQuery['settings']>;

export const getGlobals = cache(async (): Promise<GlobalSettings> => {
	const {settings} = await graphqlSystemClient.request<GlobalSettingsQuery>(QUERY_SETTINGS);

	if (!settings?.projectName || !settings?.projectDescriptor) {
		throw new Error('Settings not found');
	}

	return {
		projectName: settings.projectName,
		projectDescriptor: settings.projectDescriptor,
	} satisfies GlobalSettings;
});

export function makeUrl(hash: string, options?: {width?: number; filename?: string}): string {
	const url = `${process.env.NEXT_PUBLIC_DIRECTUS_URL ?? ''}/assets/${hash}` + (options?.filename ? `/${options.filename}` : '') + (options?.width ? `?width=${options.width}` : '');

	return url;
}
