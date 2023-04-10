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
import Browse from './pages/Browse';
import Profile from './pages/Profile';
import ViewList from './pages/ViewList';
import ViewLists from './pages/ViewLists';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />} errorElement={<Error />}>
			<Route errorElement={<Error />}>
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route
					path="lists"
					// element={<Browse />}
					// loader={listsLoader} // Dunno how to get loader working with pagination as well, so not using it for now.
				>
					<Route path="" element={<ViewLists />} />
					<Route path=":slug" element={<ViewList />} />
				</Route>
				<Route path="profile" element={<Profile />} />
			</Route>
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={router} />;
}
