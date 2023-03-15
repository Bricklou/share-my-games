import {type DirectusFiles} from './directus';

export type Preview = DirectusFiles;

export type Game = {
	id: number;
	name: string;
	slug: string;
	description: string;
	create_at: string;
	update_at: string;
	published_at: string;
	creator: Creator;
	tags: Tag[];
	previews: Preview[];
	rating?: number;
};

export type Creator = {
	id: number;
	name: string;
	slug: string;
};

export type Tag = {
	id: number;
	name: string;
	slug: string;
};

export type Settings = {
	project_name: string;
	project_descriptor: string;
};
