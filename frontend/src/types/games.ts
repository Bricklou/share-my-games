export type GamePreview = {
	id: number;
	preview: string;
};

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
	previews: GamePreview[];
	socials: SocialNetworks[];
	rating?: number;
};

export type SocialNetworks = {
	id: number;
	link: string;
	type: 'itch' | 'patreon' | 'discord' | 'website';
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
