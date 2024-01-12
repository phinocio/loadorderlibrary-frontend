export type ListMeta = {
	current_page: number;
	from: number;
	last_page: number;
	links: {
		url: string | null;
		label: string;
		active: boolean;
	}[];
	path: string;
	per_page: number;
	to: number;
	total: number;
};
