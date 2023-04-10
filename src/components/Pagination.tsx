import { Link } from 'react-router-dom';

type Links = {
	links: Array<PaginationLink>;
};

type PaginationLink = {
	url?: string;
	label: string;
	active: boolean;
};

export default function Pagination({ links }: Links) {
	function getClassName(active: boolean) {
		if (active) {
			return 'mr-1 mb-1 px-4 py-3 text-sm leading-4 rounded hover:bg-green-500 bg-blue-500 text-white';
		}
		return 'mr-1 mb-1 px-4 py-3 text-sm leading-4 rounded hover:bg-green-500';
	}

	return links.length > 2 ? (
		<div className="mb-4">
			<div className="mt-8 flex flex-wrap">
				{links.map((link) =>
					link.url === null ? (
						<div
							className="mb-1 mr-1 cursor-not-allowed rounded px-4 py-3 text-sm leading-4 text-gray-400"
							key={crypto.randomUUID()}
						>
							{link.label
								.replace('&laquo;', '«')
								.replace('&raquo;', '»')}
						</div>
					) : (
						<Link
							className={getClassName(link.active)}
							to={`?${link.url?.split('?')[1]}`}
							key={crypto.randomUUID()}
						>
							{link.label
								.replace('&laquo;', '«')
								.replace('&raquo;', '»')}
						</Link>
					)
				)}
			</div>
		</div>
	) : (
		<p>Viewing the only page.</p>
	);
}
