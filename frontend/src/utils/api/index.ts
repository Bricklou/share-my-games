import {cache} from 'react';
import {type RequiredFields, graphqlSystemClient} from '../database';
import {QUERY_SETTINGS, type GlobalSettingsQuery} from '../graphql/Global';

type GlobalSettings = RequiredFields<GlobalSettingsQuery['settings']>;

export const getGlobals = cache(async (): Promise<GlobalSettings> => {
	const {settings} = await graphqlSystemClient.request<GlobalSettingsQuery>(QUERY_SETTINGS);

	if (!settings?.project_name || !settings?.project_descriptor) {
		throw new Error('Settings not found');
	}

	return {
		/* eslint-disable @typescript-eslint/naming-convention */
		project_name: settings.project_name,
		project_descriptor: settings.project_descriptor,
		/* eslint-enable @typescript-eslint/naming-convention */
	} satisfies GlobalSettings;
});

export function makeUrl(hash: string, options?: {width?: number; filename?: string}): string {
	const url = `${process.env.NEXT_PUBLIC_DIRECTUS_URL ?? ''}/assets/${hash}` + (options?.filename ? `/${options.filename}` : '') + (options?.width ? `?width=${options.width}` : '');

	return url;
}
