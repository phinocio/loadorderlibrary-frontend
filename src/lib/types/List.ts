import type { ListFile } from './ListFile';

export type List = {
	name: string;
	version: string;
	links: string[];
	slug: string;
	author: { name: string; verified: boolean } | null;
	description: string;
	website: string;
	discord: string;
	readme: string;
	game: { name: string };
	files: ListFile[] | null;
	created: string;
	updated: string;
	private: boolean;
	expires?: string;
};
