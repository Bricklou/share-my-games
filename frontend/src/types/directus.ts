export type DirectusActivity = {
	action: string;
	collection: string;
	comment?: string | undefined;
	id: number;
	ip?: string | undefined;
	item: string;
	origin?: string | undefined;
	revisions: string & DirectusRevisions[];
	timestamp: string;
	user?: (string & DirectusUsers) | undefined;
	user_agent?: string | undefined;
};

export type DirectusCollections = {
	accountability?: string | undefined;
	archive_app_filter: boolean;
	archive_field?: string | undefined;
	archive_value?: string | undefined;
	collapse: string;
	collection: string;
	color?: string | undefined;
	display_template?: string | undefined;
	group?: (string & DirectusCollections) | undefined;
	hidden: boolean;
	icon?: string | undefined;
	item_duplication_fields?: unknown;
	note?: string | undefined;
	singleton: boolean;
	sort?: number | undefined;
	sort_field?: string | undefined;
	translations?: unknown;
	unarchive_value?: string | undefined;
};

export type DirectusDashboards = {
	color?: string | undefined;
	date_created?: string | undefined;
	icon: string;
	id: string;
	name: string;
	note?: string | undefined;
	panels: string & DirectusPanels[];
	user_created?: (string & DirectusUsers) | undefined;
};

export type DirectusFields = {
	collection: string & DirectusCollections;
	conditions?: unknown;
	display?: string | undefined;
	display_options?: unknown;
	field: string;
	group?: (string & DirectusFields) | undefined;
	hidden: boolean;
	id: number;
	interface?: string | undefined;
	note?: string | undefined;
	options?: unknown;
	readonly: boolean;
	required?: boolean | undefined;
	sort?: number | undefined;
	special?: unknown;
	translations?: unknown;
	validation?: unknown;
	validation_message?: string | undefined;
	width?: string | undefined;
};

export type DirectusFiles = {
	charset?: string | undefined;
	description?: string | undefined;
	duration?: number | undefined;
	embed?: string | undefined;
	filename_disk?: string | undefined;
	filename_download: string;
	filesize?: number | undefined;
	folder?: (string & DirectusFolders) | undefined;
	height?: number | undefined;
	id: string;
	location?: string | undefined;
	metadata?: unknown;
	modified_by?: (string & DirectusUsers) | undefined;
	modified_on: string;
	storage: string;
	tags?: unknown;
	title?: string | undefined;
	type?: string | undefined;
	uploaded_by?: (string & DirectusUsers) | undefined;
	uploaded_on: string;
	width?: number | undefined;
};

export type DirectusFlows = {
	accountability?: string | undefined;
	color?: string | undefined;
	date_created?: string | undefined;
	description?: string | undefined;
	icon?: string | undefined;
	id: string;
	name: string;
	operation?: (string & DirectusOperations) | undefined;
	operations: string & DirectusOperations[];
	options?: unknown;
	status: string;
	trigger?: string | undefined;
	user_created?: (string & DirectusUsers) | undefined;
};

export type DirectusFolders = {
	id: string;
	name: string;
	parent?: (string & DirectusFolders) | undefined;
};

export type DirectusMigrations = {
	name: string;
	timestamp?: string | undefined;
	version: string;
};

export type DirectusNotifications = {
	collection?: string | undefined;
	id: number;
	item?: string | undefined;
	message?: string | undefined;
	recipient: string & DirectusUsers;
	sender?: (string & DirectusUsers) | undefined;
	status?: string | undefined;
	subject: string;
	timestamp?: string | undefined;
};

export type DirectusOperations = {
	date_created?: string | undefined;
	flow: string & DirectusFlows;
	id: string;
	key: string;
	name?: string | undefined;
	options?: unknown;
	position_x: number;
	position_y: number;
	reject?: (string & DirectusOperations) | undefined;
	resolve?: (string & DirectusOperations) | undefined;
	type: string;
	user_created?: (string & DirectusUsers) | undefined;
};

export type DirectusPanels = {
	color?: string | undefined;
	dashboard: string & DirectusDashboards;
	date_created?: string | undefined;
	height: number;
	icon?: string | undefined;
	id: string;
	name?: string | undefined;
	note?: string | undefined;
	options?: unknown;
	position_x: number;
	position_y: number;
	show_header: boolean;
	type: string;
	user_created?: (string & DirectusUsers) | undefined;
	width: number;
};

export type DirectusPermissions = {
	action: string;
	collection: string;
	fields?: unknown;
	id: number;
	permissions?: unknown;
	presets?: unknown;
	role?: (string & DirectusRoles) | undefined;
	validation?: unknown;
};

export type DirectusPresets = {
	bookmark?: string | undefined;
	collection?: string | undefined;
	color?: string | undefined;
	filter?: unknown;
	icon: string;
	id: number;
	layout?: string | undefined;
	layout_options?: unknown;
	layout_query?: unknown;
	refresh_interval?: number | undefined;
	role?: (string & DirectusRoles) | undefined;
	search?: string | undefined;
	user?: (string & DirectusUsers) | undefined;
};

export type DirectusRelations = {
	id: number;
	junction_field?: string | undefined;
	many_collection: string;
	many_field: string;
	one_allowed_collections?: unknown;
	one_collection?: string | undefined;
	one_collection_field?: string | undefined;
	one_deselect_action: string;
	one_field?: string | undefined;
	sort_field?: string | undefined;
};

export type DirectusRevisions = {
	activity: number & DirectusActivity;
	collection: string;
	data?: unknown;
	delta?: unknown;
	id: number;
	item: string;
	parent?: (number & DirectusRevisions) | undefined;
};

export type DirectusRoles = {
	admin_access: boolean;
	app_access: boolean;
	description?: string | undefined;
	enforce_tfa: boolean;
	icon: string;
	id: string;
	ip_access?: unknown;
	name: string;
	users: string & DirectusUsers[];
};

export type DirectusSessions = {
	expires: string;
	ip?: string | undefined;
	origin?: string | undefined;
	share?: (string & DirectusShares) | undefined;
	token: string;
	user?: (string & DirectusUsers) | undefined;
	user_agent?: string | undefined;
};

export type DirectusSettings = {
	auth_login_attempts?: number | undefined;
	auth_password_policy?: string | undefined;
	basemaps?: unknown;
	custom_aspect_ratios?: unknown;
	custom_css?: string | undefined;
	default_language: string;
	id: number;
	mapbox_key?: string | undefined;
	module_bar?: unknown;
	project_color?: string | undefined;
	project_descriptor?: string | undefined;
	project_logo?: (string & DirectusFiles) | undefined;
	project_name: string;
	project_url?: string | undefined;
	public_background?: (string & DirectusFiles) | undefined;
	public_foreground?: (string & DirectusFiles) | undefined;
	public_note?: string | undefined;
	storage_asset_presets?: unknown;
	storage_asset_transform?: string | undefined;
	storage_default_folder?: (string & DirectusFolders) | undefined;
	translation_strings?: unknown;
};

export type DirectusShares = {
	collection?: (string & DirectusCollections) | undefined;
	date_created?: string | undefined;
	date_end?: string | undefined;
	date_start?: string | undefined;
	id: string;
	item?: string | undefined;
	max_uses?: number | undefined;
	name?: string | undefined;
	password?: string | undefined;
	role?: (string & DirectusRoles) | undefined;
	times_used?: number | undefined;
	user_created?: (string & DirectusUsers) | undefined;
};

export type DirectusUsers = {
	auth_data?: unknown;
	avatar?: (string & DirectusFiles) | undefined;
	description?: string | undefined;
	email?: string | undefined;
	email_notifications?: boolean | undefined;
	external_identifier?: string | undefined;
	first_name?: string | undefined;
	id: string;
	language?: string | undefined;
	last_access?: string | undefined;
	last_name?: string | undefined;
	last_page?: string | undefined;
	location?: string | undefined;
	password?: string | undefined;
	provider: string;
	role?: (string & DirectusRoles) | undefined;
	status: string;
	tags?: unknown;
	tfa_secret?: string | undefined;
	theme?: string | undefined;
	title?: string | undefined;
	token?: string | undefined;
};

export type DirectusWebhooks = {
	actions: unknown;
	collections: unknown;
	data: boolean;
	headers?: unknown;
	id: number;
	method: string;
	name: string;
	status: string;
	url: string;
};

export type Game = {
	create_at?: string | undefined;
	creator: GameCreator;
	description?: string | undefined;
	id: number;
	name: string;
	previews: string & GamePreviews[];
	published_at?: string | undefined;
	rating?: number | undefined;
	slug: string;
	tags: GameTags[];
	update_at?: string | undefined;
	socials: SocialNetworks[];
};

export type GameCreator = {
	id: number;
	name: string;
};

export type GamePreviews = {
	game_id: number & Game;
	id: number;
	preview: string & DirectusFiles;
};

export type GameTags = {
	game_id: Game;
	id: number;
	tags_id: Tags;
};

export type SocialNetworks = {
	game_id?: (number & Game) | undefined;
	id: number;
	link: string;
	type: string;
};

export type Tags = {
	games: string & GameTags[];
	id: number;
	name: string;
	slug?: string | undefined;
};

export type CustomDirectusTypes = {
	directus_activity: DirectusActivity;
	directus_collections: DirectusCollections;
	directus_dashboards: DirectusDashboards;
	directus_fields: DirectusFields;
	directus_files: DirectusFiles;
	directus_flows: DirectusFlows;
	directus_folders: DirectusFolders;
	directus_migrations: DirectusMigrations;
	directus_notifications: DirectusNotifications;
	directus_operations: DirectusOperations;
	directus_panels: DirectusPanels;
	directus_permissions: DirectusPermissions;
	directus_presets: DirectusPresets;
	directus_relations: DirectusRelations;
	directus_revisions: DirectusRevisions;
	directus_roles: DirectusRoles;
	directus_sessions: DirectusSessions;
	directus_settings: DirectusSettings;
	directus_shares: DirectusShares;
	directus_users: DirectusUsers;
	directus_webhooks: DirectusWebhooks;
	game: Game;
	game_creator: GameCreator;
	game_previews: GamePreviews;
	game_tags: GameTags;
	social_networks: SocialNetworks;
	tags: Tags;
};
