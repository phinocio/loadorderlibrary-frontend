import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<footer className="text-md border-t border-gray-700 bg-gray-900">
			<div className="px-4 py-5 text-center sm:container sm:mx-auto sm:flex sm:justify-between">
				<div className="space-y-2">
					<p className="font-bold text-green-500">
						Load Order Library
					</p>
					<p>
						Created By{' '}
						<span className="text-blue-500">Phinocio</span>
					</p>
				</div>
				<hr className="my-4 border-gray-700 sm:hidden" />
				<div className="space-y-2">
					<p className="font-bold text-green-500">Social</p>
					<p className="flex justify-center space-x-2">
						<Link
							to="https://github.com/Load-Order-Library"
							className="hover:text-blue-500"
						>
							GitHub
						</Link>

						<Link
							to="https://discord.gg/K3KnEgrQE4"
							className="hover:text-blue-500"
						>
							Discord
						</Link>

						<Link
							to="https://www.reddit.com/r/LoadOrderLibrary/"
							className="hover:text-blue-500"
						>
							Reddit
						</Link>
					</p>
				</div>
				<hr className="my-4 border-gray-700 sm:hidden" />
				<div className="space-y-2">
					<p className="font-bold text-green-500">API Resources</p>
					<p className="flex justify-center space-x-2">
						<Link
							to="https://docs.loadorderlibrary.com"
							className="hover:text-blue-500"
						>
							Documentation
						</Link>
					</p>
				</div>
				<hr className="my-4 border-gray-700 sm:hidden" />
				<div className="space-y-2">
					<p className="font-bold text-green-500">Support Me</p>
					<p className="flex justify-center space-x-2">
						<Link
							to="https://patreon.com/phinocio"
							className="hover:text-blue-500"
						>
							Patreon
						</Link>

						<Link
							to="https://ko-fi.com/phinocio"
							className="hover:text-blue-500"
						>
							Ko-Fi
						</Link>
					</p>
				</div>
			</div>
		</footer>
	);
}
