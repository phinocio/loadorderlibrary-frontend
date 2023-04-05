import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
	const [active, setActive] = useState(false);
	const handleClick = () => {
		setActive(!active);
	};

	return (
		<header className="border-b border-gray-800 bg-green-600">
			<nav className="container mx-auto flex items-center justify-between px-4 py-6 text-xl">
				<div className="flex items-center">
					<NavLink to="/" className="flex-none">
						Load Order Library
					</NavLink>
					<ul className="ml-14 flex space-x-5">
						<li>
							<NavLink
								to="/upload"
								className="hover:text-gray-200"
							>
								Upload
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/lists"
								className="hover:text-gray-200"
							>
								Browse
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/compare"
								className="hover:text-gray-200"
							>
								Compare
							</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}
export default Header;
