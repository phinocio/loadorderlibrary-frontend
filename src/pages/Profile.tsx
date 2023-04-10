import { useNavigate } from 'react-router-dom';
import { Auth } from '@/types/AuthTypes';
import useAuth from '../context/AuthProvider';

export default function Profile() {
	const { user, isLoading } = useAuth() as Auth;
	const navigate = useNavigate();

	if (!isLoading && !user) {
		navigate('/login');
	}

	return (
		<>
			{!user ? (
				<p>Loading...</p>
			) : (
				<div>
					<h1>{user.name}</h1>
					<p>{user.admin ? 'admin ' : 'not admin'}</p>
				</div>
			)}

			<div>A Div to stop error shoo, fragment.</div>
		</>
	);
}
