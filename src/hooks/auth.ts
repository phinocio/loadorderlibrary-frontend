import useSWR from 'swr';
import axios from '@lib/axios';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
	middleware?: 'guest' | 'auth';
	redirectIfAuthenticated?: string;
}

export default function useAuth({
	middleware,
	redirectIfAuthenticated,
}: AuthProps = {}) {
	const navigate = useNavigate();

	const {
		data: user,
		error,
		mutate,
	} = useSWR('/v1/user', () =>
		axios
			.get('/v1/user')
			.then((res) => res.data.data)
			.catch((e) => {
				if (e.response.status !== 409) throw error;

				navigate('/verify-email');
			})
	);

	const csrf = () => axios.get('/sanctum/csrf-cookie');

	type RegisterErrors = {
		name: Array<string>;
		password: Array<string>;
		password_confirmation: Array<string>;
	};

	type RegisterProps = {
		setErrors: React.Dispatch<React.SetStateAction<RegisterErrors>>;
		name: string;
		password: string;
		password_confirmation: string;
	};

	const register = async ({ setErrors, ...props }: RegisterProps) => {
		await csrf();

		setErrors({ name: [], password: [], password_confirmation: [] });

		axios
			.post('/register', props)
			.then(() => mutate())
			.catch((e) => {
				if (e.response.status !== 422) throw e;

				setErrors(e.response.data.errors);
			});
	};

	type LoginErrors = {
		name: Array<string>;
		password: Array<string>;
	};

	type LoginProps = {
		setErrors: React.Dispatch<React.SetStateAction<LoginErrors>>;
		name: string;
		password: string;
	};

	const login = async ({ setErrors, ...props }: LoginProps) => {
		await csrf();

		setErrors({ name: [], password: [] });
		// setStatus(null);

		axios
			.post('/login', props)
			.then(() => mutate())
			.catch((e) => {
				if (e.response.status !== 422) throw e;

				setErrors(e.response.data.errors);
			});
	};

	// const forgotPassword = async ({ setErrors, setStatus, email }) => {
	// 	await csrf();

	// 	setErrors([]);
	// 	setStatus(null);

	// 	axios
	// 		.post('/forgot-password', { email })
	// 		.then((response) => setStatus(response.data.status))
	// 		.catch((error) => {
	// 			if (error.response.status !== 422) throw error;

	// 			setErrors(error.response.data.errors);
	// 		});
	// };

	// const resetPassword = async ({ setErrors, setStatus, ...props }) => {
	// 	await csrf();

	// 	setErrors([]);
	// 	setStatus(null);

	// 	axios
	// 		.post('/reset-password', { token: router.query.token, ...props })
	// 		.then((response) =>
	// 			router.push('/login?reset=' + btoa(response.data.status))
	// 		)
	// 		.catch((error) => {
	// 			if (error.response.status !== 422) throw error;

	// 			setErrors(error.response.data.errors);
	// 		});
	// };

	// const resendEmailVerification = ({ setStatus }) => {
	// 	axios
	// 		.post('/email/verification-notification')
	// 		.then((response) => setStatus(response.data.status));
	// };

	const logout = useCallback(async () => {
		if (!error) {
			await axios.post('/logout').then(() => mutate());
		}

		window.location.pathname = '/login';
	}, [error, mutate]);

	useEffect(() => {
		if (middleware === 'guest' && redirectIfAuthenticated && user)
			navigate(redirectIfAuthenticated);
		// if (
		// 	window.location.pathname === '/verify-email' &&
		// 	user?.email_verified_at
		// )
		// 	navigate(redirectIfAuthenticated);
		if (middleware === 'auth' && error) logout();
	}, [user, error, middleware, redirectIfAuthenticated, navigate, logout]);

	return {
		user,
		register,
		login,
		// forgotPassword,
		// resetPassword,
		// resendEmailVerification,
		logout,
	};
}
