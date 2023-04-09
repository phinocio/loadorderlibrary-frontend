import { useCallback, useEffect, useState } from 'react';
import { NavLink, useLocation, Location } from 'react-router-dom';
import useAuth from '../context/AuthProvider';

export default function Header() {
	const [active, setActive] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const location: Location = useLocation();

	const { user, logout } = useAuth();

	const toggleMenu = () => {
		setActive(!active);
	};

	const toggleDropdown = () => {
		setOpen(!open);
	};

	const closeDropdown = () => {
		setOpen(false);
	};

	const handleEscape = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Esc' || event.key === 'Escape') {
				setOpen(false);
			}
		},
		[setOpen]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleEscape);

		return () => document.removeEventListener('keydown', handleEscape);
	}, [handleEscape]);

	useEffect(() => {
		setOpen(false);
		setActive(false);
	}, [location]);

	return (
		<header className="border-b border-gray-500 bg-gray-900">
			<nav className="px-4 py-5 text-xl sm:container sm:mx-auto sm:flex">
				<div className="flex items-center justify-between">
					<NavLink to="/" className="flex-none">
						<img
							src="/logo.png"
							alt="Load Order Library"
							className="h-8 w-8"
						/>
					</NavLink>
					<span className="sm:hidden">Load Order Library</span>
					<button
						type="button"
						className="hover:text-blue-500 sm:hidden"
						onClick={toggleMenu}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="h-8 w-8 cursor-pointer fill-current"
						>
							{!active ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							)}
						</svg>
					</button>
				</div>

				<div
					className={`${
						!active ? 'hidden' : 'block'
					} py-2 sm:flex sm:w-full sm:items-center sm:justify-between`}
				>
					<div className="flex flex-col sm:ml-6 sm:flex-row">
						<NavLink
							to="/upload"
							className="rounded px-2 py-1 hover:bg-blue-500"
						>
							Upload
						</NavLink>
						<NavLink
							to="/lists"
							className="rounded px-2 py-1 hover:bg-blue-500"
						>
							Browse
						</NavLink>
						<NavLink
							to="/compare"
							className="rounded px-2 py-1 hover:bg-blue-500"
						>
							Compare
						</NavLink>
					</div>
					<hr className="my-4 border-gray-700 sm:hidden" />
					{!user && (
						<div className="flex flex-col sm:flex-row">
							<NavLink
								to="/login"
								className="block rounded px-2 py-1 hover:bg-blue-500"
							>
								Login
							</NavLink>
							<NavLink
								to="/register"
								className="block rounded px-2 py-1 hover:bg-blue-500"
							>
								Register
							</NavLink>
						</div>
					)}

					{/* Non-Mobile Account Dropdown */}
					{user && (
						<div className="relative hidden sm:block">
							<button
								type="button"
								className="relative z-10 hidden h-12 w-12 items-center justify-center rounded-full border-2 border-blue-500 bg-gray-800 hover:bg-gray-700 sm:block"
								onClick={toggleDropdown}
							>
								{user.name[0]}
							</button>
							<button
								type="button"
								onClick={closeDropdown}
								aria-labelledby="Close Dropdown"
								className={`${
									open ? '' : 'hidden'
								} fixed inset-0 h-full w-full cursor-default bg-black opacity-50`}
								tabIndex={-1}
							/>
							<div
								className={`${
									!open ? 'sm:hidden' : 'block'
								} mt-2 rounded-lg sm:absolute sm:right-0 sm:w-48 sm:bg-gray-800 sm:py-2 sm:drop-shadow-xl`}
							>
								<NavLink
									to="/profile"
									className="block px-2 py-2 hover:bg-blue-500 sm:px-4"
								>
									Profile
								</NavLink>
								<NavLink
									to="/profile"
									className="block px-2 py-2 hover:bg-blue-500 sm:px-4"
								>
									My Lists
								</NavLink>
								<hr className="my-2 border-gray-500" />
								<button
									type="button"
									className="block w-full px-2 py-2 text-left hover:bg-blue-500 sm:px-4"
									onClick={logout}
								>
									Logout
								</button>
							</div>
						</div>
					)}

					{/* Mobile Account Dropdown */}
					{user && (
						<div className="relative sm:hidden">
							<button
								type="button"
								className="relative z-10 h-12 w-12 items-center justify-center rounded-full border-2 border-blue-500 bg-gray-800 hover:bg-gray-700 sm:block"
							>
								{user.name[0]}
							</button>
							<span className="ml-4">{user.name}</span>

							<div
								className={`${
									!open ? 'sm:hidden' : 'block'
								} mt-2 rounded-lg sm:absolute sm:right-0 sm:w-48 sm:bg-gray-800 sm:py-2 sm:drop-shadow-xl`}
							>
								<NavLink
									to="/profile"
									className="block px-2 py-2 hover:bg-blue-500 sm:px-4"
								>
									Profile
								</NavLink>
								<NavLink
									to="/profile"
									className="block px-2 py-2 hover:bg-blue-500 sm:px-4"
								>
									My Lists
								</NavLink>
								<button
									type="button"
									className="block w-full px-2 py-2 text-left hover:bg-blue-500 sm:px-4"
									onClick={logout}
								>
									Logout
								</button>
							</div>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
}
