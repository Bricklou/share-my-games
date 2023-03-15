import type {CustomDirectusTypes} from '@/types/directus';
import {Directus} from '@directus/sdk';

if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) {
	throw new Error('NEXT_PUBLIC_DIRECTUS_URL is not defined');
}

export const directus = new Directus<CustomDirectusTypes>(process.env.NEXT_PUBLIC_DIRECTUS_URL);

