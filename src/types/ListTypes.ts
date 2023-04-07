export type Lists = {
	data: Array<ListData>;
	meta: {
		current_page: number;
		from: number;
		last_page: number;
		links: Array<PaginationLinks>;
		path: string;
		per_page: number;
		to: number;
		total: number;
	};
};

export type PaginationLinks = {
	url?: string;
	label: string;
	active: boolean;
};

export type List = {
	list: ListData;
};

export interface ListData {
	name: string;
	version?: string;
	slug: string;
	url: string;
	description?: string;
	website?: string;
	discord?: string;
	readme?: string;
	private: boolean;
	expires: string;
	created: string;
	updated: string;
	author?: Author;
	game: Game; // Make game type
	files?: object; // Make files type
	links: {
		url: string;
		self: string;
	};
}

export type Author = {
	name: string;
};

export type Game = {
	name: string;
};
