import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import NavAuth from './NavAuth';

function Header() {
	const [active, setActive] = useState(false);
	const handleClick = () => {
		setActive(!active);
	};

	return (
		<header className="mb-3 flex flex-wrap items-center justify-center bg-green-600 p-3">
			<nav className="container mx-auto flex flex-wrap items-center justify-between bg-green-600 text-xl text-white">
				<NavLink to="/">
					<span className="">Load Order Library</span>
				</NavLink>
				<button
					className="ml-auto inline-flex rounded p-3 outline-none hover:bg-green-600 hover:text-white lg:hidden"
					type="button"
					onClick={handleClick}
				>
					<svg
						className="h-6 w-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
				<div
					className={`${
						active ? '' : 'hidden'
					}   w-full lg:inline-flex lg:w-auto lg:flex-grow`}
				>
					<div className="flex w-full flex-col items-start lg:ml-auto lg:inline-flex lg:h-auto lg:w-auto lg:flex-row lg:items-center">
						<NavLink to="/test" className="p-2">
							Upload
						</NavLink>
						<NavLink to="/test" className="p-2">
							Browse
						</NavLink>
						<NavLink to="/test" className="p-2">
							Compare
						</NavLink>
						<NavAuth />
					</div>
				</div>
			</nav>
		</header>
	);
}
export default Header;
