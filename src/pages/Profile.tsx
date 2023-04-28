import { useEffect } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@/types/AuthTypes';
import useAuth from '../context/AuthProvider';
import UpdatePassword from '@/components/profile/UpdatePassword';
import UpdateEmail from '@/components/profile/UpdateEmail';
import { ListData } from '@/types/ListTypes';
import List from '@/components/List';
import axios from '@/lib/axios';

export default function Profile() {
	const { user, isLoading } = useAuth() as Auth;
	const navigate = useNavigate();

	const fetcher = (url: string) =>
		axios.get(url).then((res) => res.data.data);

	const {
		data: lists,
		error,
		isLoading: isLoadingLists,
	} = useSWR('/v1/user/lists', fetcher);

	useEffect(() => {
		if (!isLoading && !user) {
			navigate('/login');
		}
	}, [isLoading, navigate, user]);

	return (
		<>
			{isLoading && <p>Loading User...</p>}

			{!isLoading && user && (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<div className="mb-4 flex items-center justify-between sm:col-span-2">
						<h1 className="flex items-start text-3xl font-bold">
							Hello, {user.name}
							{user.admin && (
								<span className="ml-2 rounded bg-green-700 p-1 text-xs">
									Admin
								</span>
							)}
						</h1>
						<div className="sm:text-right">
							<button
								type="button"
								className="rounded bg-red-500 px-4 py-2 text-red-100"
							>
								Delete Account
							</button>
						</div>
					</div>
					<div>
						{/* Yes, this is abuse of details tag, I don't care :) */}
						<details className="cursor-pointer">
							<summary>
								<h2 className="inline text-xl">Update Email</h2>
							</summary>
							<span className="text-gray-500">
								To remove the email, submit with the field
								blank.
							</span>
							<UpdateEmail email={user.email ?? null} />
						</details>
						<details className="cursor-pointer">
							<summary>
								<h2 className="inline text-xl">
									Update Password
								</h2>
							</summary>
							<UpdatePassword />
						</details>
					</div>
				</div>
			)}

			{isLoadingLists && <p>Loading Lists...</p>}

			{error && <p>Error loading your lists...</p>}

			{!isLoadingLists && lists && (
				<div>
					<h1 className="mt-12 text-3xl font-bold sm:col-span-2 lg:col-span-3">
						Your Lists
					</h1>
					<div className="my-4 grid grid-cols-1 gap-6 sm:gap-y-12 md:grid-cols-2 lg:grid-cols-3">
						{lists.map((list: ListData) => {
							return <List list={list} key={list.slug} />;
						})}
					</div>
				</div>
			)}
		</>
	);
}
