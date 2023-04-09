import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { List as ListType } from '../types/ListTypes';

export default function List({ list }: ListType) {
	return (
		<div className="flex flex-col rounded bg-gray-700">
			{/* List Card Header */}
			<div className="flex justify-between border-b border-gray-600 bg-gray-800 p-4">
				<div className="flex flex-col">
					<strong>
						<Link
							to={`/lists/${list.slug}`}
							className="text-xl capitalize text-green-400"
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
							className="ml-2 text-sm text-green-400"
						>
							{list.author?.name ?? 'Anonymous'}
						</Link>
					</p>
				</div>

				<p>
					<Link
						to={`/lists?filter[game]=${list.game?.name}`}
						className="ml-2 text-sm text-blue-400"
					>
						{list.game?.name ?? 'Anonymous'}
					</Link>
				</p>
			</div>
			{/* List Card Body */}
			<div className="h-100 flex-auto bg-gray-700 p-4">
				{list.description ?? 'No description provided.'}
			</div>

			{/* List Card Footer */}
			<div className="align-end border-t border-gray-800 bg-gray-800 p-4 text-gray-500">
				<p>
					Uploaded{' '}
					{formatDistanceToNow(new Date(list.created), {
						addSuffix: true,
					})}
				</p>
				<p>
					Updated{' '}
					{formatDistanceToNow(new Date(list.updated), {
						addSuffix: true,
					})}
				</p>
				<p className={`${list.expires ?? 'hidden'}`}>
					Expires{' '}
					{formatDistanceToNow(new Date(list.expires), {
						addSuffix: true,
					})}
				</p>
			</div>
		</div>
	);
}
