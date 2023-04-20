import { Link } from 'react-router-dom';
import { formatDistanceToNow, format } from 'date-fns';
import { List as ListType } from '../types/ListTypes';
import useAuth from '@/context/AuthProvider';
import { Auth } from '@/types/AuthTypes';

export default function List({ list, className }: ListType) {
	const { user } = useAuth() as Auth;

	return (
		<div className={`${className} flex flex-col rounded bg-gray-700`}>
			{/* List Card Header */}
			<div className="flex justify-between border-b border-gray-600 bg-gray-800 p-4">
				<div className="flex flex-col">
					<strong>
						<Link
							to={`/lists/${list.slug}`}
							className="text-xl capitalize text-green-400 hover:text-green-600"
						>
							{list.name}
						</Link>
						<p className="ml-2 inline-block">
							{list.version ?? ''}
						</p>
					</strong>
					<p>
						by
						<Link
							to={`/lists?filter[author]=${list.author?.name}`}
							className="ml-2 text-sm text-green-400 hover:text-green-600"
						>
							{list.author?.name ?? 'Anonymous'}{' '}
							{list.author?.verified && (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="inline h-5 w-5 text-blue-400"
								>
									<path
										fillRule="evenodd"
										d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
										clipRule="evenodd"
									/>
								</svg>
							)}
						</Link>
					</p>
				</div>

				<p className="flex flex-col items-end">
					<Link
						to={`/lists?filter[game]=${list.game?.name}`}
						className="ml-2 text-sm text-blue-400 hover:text-blue-600"
					>
						{list.game?.name ?? 'Anonymous'}
					</Link>
					<em className="font-light">{list.private && 'Private'}</em>
				</p>
			</div>
			{/* List Card Body */}
			<div className="h-100 flex-auto bg-gray-700 p-4">
				<p>{list.description ?? 'No description provided.'}</p>
			</div>

			{/* List Card Footer */}
			<div className="align-end flex items-end justify-between border-t border-gray-800 bg-gray-800 p-4 text-gray-500">
				<div>
					<p title={format(new Date(list.created), 'PPpp')}>
						Uploaded{' '}
						{formatDistanceToNow(new Date(list.created), {
							addSuffix: true,
						})}
					</p>
					<p title={format(new Date(list.updated), 'PPpp')}>
						Updated{' '}
						{formatDistanceToNow(new Date(list.updated), {
							addSuffix: true,
						})}
					</p>
					<p
						className={`${list.expires ?? 'hidden'}`}
						title={format(new Date(list.expires), 'PPpp')}
					>
						Expires{' '}
						{formatDistanceToNow(new Date(list.expires), {
							addSuffix: true,
						})}
					</p>
				</div>
				{user?.name === list.author?.name && (
					<div className="space-x-2">
						<button
							type="button"
							className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						>
							Edit
						</button>
						<button
							type="button"
							className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
						>
							Delete
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
