import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Test from './pages/Test';
import Login from './pages/Login';
import Error from './pages/Error';
import Browse, { listsLoader } from './pages/Browse';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />} errorElement={<Error />}>
			<Route index element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/test" element={<Test />} />
			<Route path="/lists" element={<Browse />} loader={listsLoader} />
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={router} />;
}
