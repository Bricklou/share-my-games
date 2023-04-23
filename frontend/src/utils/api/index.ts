
import {cache} from 'react';
import { graphqlSystemClient } from '../database';
import { SettingsQuery } from '../gql-gen/graphql';
import { QUERY_SETTINGS } from '../graphql/Global';

interface GlobalsSettings {
    project_name: string;
    project_descriptor: string;
}

export const getGlobals = cache(async (): Promise<GlobalsSettings> => {
    const {settings} = await graphqlSystemClient.request<SettingsQuery>(QUERY_SETTINGS)

	if (!settings || !settings.project_name || !settings.project_descriptor) {
		throw new Error('Settings not found');
	}

	return {
        project_name: settings.project_name,
        project_descriptor: settings.project_descriptor,
    }
});

export function makeUrl(hash: string, options?: {width?: number; filename?: string}): string {
	const url = `${process.env.NEXT_PUBLIC_DIRECTUS_URL ?? ''}/assets/${hash}` + (options?.filename ? `/${options.filename}` : '') + (options?.width ? `?width=${options.width}` : '');

	return url;
}
