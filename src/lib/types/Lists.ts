import type { List } from './List';
import type { ListMeta } from './ListMeta';

export type Lists = {
	data: List[];
	links: object;
	meta: ListMeta;
};
