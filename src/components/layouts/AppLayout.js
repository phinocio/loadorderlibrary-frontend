import Navigation from '@/components/layouts/Navigation';
import { useAuth } from '@/hooks/auth';
import { Container } from '@mui/system';

const AppLayout = ({ children }) => {
	const { user } = useAuth({ middleware: 'auth' });

	return (
		<>
			<Navigation user={user} />
			<Container>
				{/* Page Content */}
				<main>{children}</main>
			</Container>
		</>
	);
};

export default AppLayout;
