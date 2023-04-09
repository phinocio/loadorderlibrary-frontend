import useAuth from '@/hooks/auth';

export default function Profile() {
	const { user } = useAuth({ middleware: 'auth' });

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
