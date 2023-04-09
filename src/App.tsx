import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';
import Browse, { listsLoader } from './pages/Browse';
import Profile from './pages/Profile';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />} errorElement={<Error />}>
			<Route errorElement={<Error />}>
				<Route index element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/lists"
					element={<Browse />}
					loader={listsLoader}
				/>
				<Route path="/profile" element={<Profile />} />
			</Route>
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={router} />;
}
