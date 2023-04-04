import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function RootLayout() {
	return (
		<div className="root-layout">
			<Header />

			<main className="container mx-auto">
				<Outlet />
			</main>
		</div>
	);
}
