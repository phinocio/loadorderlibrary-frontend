import { useAuth } from '@/hooks/auth';
import { Container } from '@mui/system';
import Head from 'next/head';
import Navigation from './Navigation';

const GuestLayout = ({ children }) => {
	const { user } = useAuth({ middleware: 'guest' });
	return (
		<>
			<Head />
			<Navigation user={user} />

			<Container>
				<div>{children}</div>
			</Container>
		</>
	);
};

export default GuestLayout;
