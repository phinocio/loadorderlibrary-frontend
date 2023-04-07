import { json, useLoaderData } from 'react-router-dom';
import { apiUrl } from '../env';
import List from '../components/List';

export default function Browse() {
	const lists = useLoaderData();
	return (
		<div className="grid">
			<h1 className="text-5xl text-gray-600">All Lists</h1>

			<div className="my-4 grid grid-cols-1 gap-6 sm:gap-y-12 md:grid-cols-2 lg:grid-cols-3">
				{lists.data.map((list) => {
					return <List list={list} key={list.slug} />;
				})}
			</div>

			<p>Links! {lists.meta.links[1].label}</p>
		</div>
	);
}

export const listsLoader = async () => {
	const res = await fetch(`${apiUrl}/lists`);

	return res.json();
};
