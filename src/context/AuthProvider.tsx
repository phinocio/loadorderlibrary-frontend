import { createContext, useContext, useState } from 'react';
import axios from '@lib/axios';
import { Navigate, redirect } from 'react-router-dom';
import useSWR from 'swr';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
	// const [user, setUser] = useState(null);
	const [errors, setErrors] = useState(null);
	// const navigate = useNavigate();

	const csrf = () => axios.get('/sanctum/csrf-cookie');

	// const getUser = async () => {
	// 	axios
	// 		.get('/v1/user')
	// 		.then((res) => setUser(res.data.data))
	// 		.catch((e) => {
	// 			if (e.response.status !== 409) throw e;

	// 			redirect('/verify-email');
	// 		});
	// };
	const {
		data: user,
		error,
		mutate,
	} = useSWR('/v1/user', () =>
		axios
			.get('/v1/user')
			.then((res) => res.data.data)
			.catch((e) => {
				if (e.response.status !== 409) throw e;

				navigate('/verify-email');
			})
	);

	const login = async ({ ...props }) => {
		await csrf();

		axios
			.post('/login', props)
			.then(() => {
				window.location.pathname = '/profile';
			})
			.catch((e) => {
				if (e.response.status !== 422) throw e;

				setErrors(e.response.data.errors);
			});
	};

	const register = async ({ ...props }) => {
		await csrf();

		axios
			.post('/register', props)
			.then(() => {
				window.location.pathname = '/profile';
			})
			.catch((e) => {
				if (e.response.status !== 422) throw e;

				setErrors(e.response.data.errors);
			});
	};

	const logout = async () => {
		await axios.post('/logout').then(() => mutate());

		window.location.pathname = '/login';
	};

	return (
		<AuthContext.Provider value={{ user, errors, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export default function useAuth() {
	return useContext(AuthContext);
}

// export default AuthContext;
