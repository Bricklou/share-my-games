
import {cache} from 'react';
import { RequiredFields, graphqlSystemClient } from '../database';
import { QUERY_SETTINGS, GlobalSettingsQuery } from '../graphql/Global';

type GlobalSettings = RequiredFields<GlobalSettingsQuery['settings']>;

export const getGlobals = cache(async (): Promise<GlobalSettings> => {
    const {settings} = await graphqlSystemClient.request<GlobalSettingsQuery>(QUERY_SETTINGS)

	if (!settings || !settings.project_name || !settings.project_descriptor) {
		throw new Error('Settings not found');
	}

	return {
        project_name: settings.project_name,
        project_descriptor: settings.project_descriptor,
    } satisfies GlobalSettings
});

export function makeUrl(hash: string, options?: {width?: number; filename?: string}): string {
	const url = `${process.env.NEXT_PUBLIC_DIRECTUS_URL ?? ''}/assets/${hash}` + (options?.filename ? `/${options.filename}` : '') + (options?.width ? `?width=${options.width}` : '');

	return url;
}
