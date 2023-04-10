import { useLocation, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import axios from '@lib/axios';
import { Lists, ListData } from '../types/ListTypes';
import List from '../components/List';
import Pagination from '@/components/Pagination';

export default function ViewLists() {
	// let lists = useLoaderData() as Lists;
	const [lists, setLists] = useState<Lists | null>(null);
	const [searchParams, setSearchParams] = useSearchParams('page=1');
	const location = useLocation();

	useEffect(() => {
		axios
			.get(`/v1/lists?${searchParams}`)
			.then((res) => {
				setLists(res.data);
			})
			.catch((e) => {
				if (e.response.status !== 422) throw e;
			});
	}, [location, searchParams]);

	return (
		<div className="grid">
			<h1 className="text-5xl text-gray-600">All Lists</h1>

			<div className="my-4 grid grid-cols-1 gap-6 sm:gap-y-12 md:grid-cols-2 lg:grid-cols-3">
				{!lists && <p>Loading....</p>}
				{!lists?.data.length && (
					<div>No more results, double check the current page.</div>
				)}
				{lists &&
					lists.data.map((list: ListData) => {
						return <List list={list} key={list.slug} />;
					})}
			</div>

			<div className="flex justify-center">
				{lists && <Pagination links={lists.meta.links} />}
			</div>
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
