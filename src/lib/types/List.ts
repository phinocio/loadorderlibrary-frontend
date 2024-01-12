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
	files:
		| { name: string; clean_name: string; bytes: number; content: string[]; created: string; updated: string }[]
		| null;
	created: string;
	updated: string;
	private: boolean;
	expires?: string;
};
