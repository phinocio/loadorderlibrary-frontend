import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function AccountDropdown() {
	const [open, setOpen] = useState<boolean>(false);

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
	return (
		<div className="relative">
			<button
				type="button"
				className="relative z-10 hidden h-12 w-12 items-center justify-center rounded-full border-2 border-blue-500 bg-gray-800 hover:bg-gray-700 sm:block"
				onClick={toggleDropdown}
			>
				P
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
				<NavLink
					to="/Logout"
					className="block px-2 py-2 hover:bg-blue-500 sm:px-4"
				>
					Logout
				</NavLink>
			</div>
		</div>
	);
}
