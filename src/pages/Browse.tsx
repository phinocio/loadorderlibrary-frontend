import { useLoaderData } from 'react-router-dom';
import { AxiosError } from 'axios';
import axios from '@lib/axios';
import { Lists, ListData } from '../types/ListTypes';
import List from '../components/List';

export default function Browse() {
	const lists = useLoaderData() as Lists;
	return (
		<div className="grid">
			<h1 className="text-5xl text-gray-600">All Lists</h1>

			<div className="my-4 grid grid-cols-1 gap-6 sm:gap-y-12 md:grid-cols-2 lg:grid-cols-3">
				{lists.data.map((list: ListData) => {
					return <List list={list} key={list.slug} />;
				})}
			</div>

			<p>Links! {lists.meta.links[1].label}</p>
		</div>
	);
}

export const listsLoader = async () => {
	try {
		const res = await axios.get('/v1/lists');
		return res.data;
	} catch (e: unknown) {
		if (e instanceof AxiosError) {
			if (e.response) {
				throw new Error(
					`${e.response.status} ${e.response.statusText}`
				);
			} else if (e.request) {
				throw new Error(`${e.request.status} ${e.request.statusText}`);
			} else {
				throw new Error(e.message);
			}
		} else {
			throw new Error(
				'Something went wrong fetching lists. Let Phin know.'
			);
		}
	}
};
