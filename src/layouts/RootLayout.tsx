import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '@/components/Footer';

export default function RootLayout() {
	return (
		<>
			<Header />

			<main className="container mx-auto px-8 py-6 text-white sm:px-4">
				<Outlet />
			</main>

			<Footer />
		</>
	);
}
