import { NavLink } from 'react-router-dom';

export default function NavAuth() {
	return (
		<>
			<NavLink to="/login">Login</NavLink>
			<NavLink to="/register">Register</NavLink>
		</>
	);
}
