import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useMemo,
} from 'react';
import axios from '@lib/axios';
import useSWR from 'swr';
import { LoginProps, RegisterProps } from '@/types/AuthTypes';

const AuthContext = createContext({});

interface Props {
	children: ReactNode;
}

export function AuthProvider({ children }: Props) {
	const csrf = () => axios.get('/sanctum/csrf-cookie');

	const fetcher = (url: string) =>
		axios.get(url).then((res) => res.data.data);

	const {
		data: user,
		error,
		isLoading,
		mutate,
	} = useSWR('/v1/user', fetcher);

	const login = useCallback(async ({ setErrors, ...props }: LoginProps) => {
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
	}, []);

	const register = useCallback(
		async ({ setErrors, ...props }: RegisterProps) => {
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
		},
		[]
	);

	const logout = useCallback(async () => {
		if (!error) {
			await axios.post('/logout').then(() => mutate());
		}

		window.location.pathname = '/login';
	}, [error, mutate]);

	const authProviderValue = useMemo(
		() => ({
			user,
			isLoading,
			login,
			register,
			logout,
			mutate,
		}),
		[isLoading, login, logout, mutate, register, user]
	);

	return (
		<AuthContext.Provider value={authProviderValue}>
			{children}
		</AuthContext.Provider>
	);
}

export default function useAuth() {
	return useContext(AuthContext);
}

// export default AuthContext;
