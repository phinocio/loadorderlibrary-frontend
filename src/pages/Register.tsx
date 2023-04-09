import { useState } from 'react';
import { Form, Link } from 'react-router-dom';
import useAuth from '@/hooks/auth';
import InputError from '@/components/InputError';

export default function Register() {
	const { register } = useAuth({
		middleware: 'guest',
		redirectIfAuthenticated: '/profile',
	});

	type RegisterErrors = {
		name: Array<string>;
		password: Array<string>;
		password_confirmation: Array<string>;
	};

	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [errors, setErrors] = useState<RegisterErrors>({
		name: [],
		password: [],
		password_confirmation: [],
	});

	const submitForm = (e: { preventDefault: () => void }) => {
		e.preventDefault();

		register({
			name,
			password,
			password_confirmation: passwordConfirmation,
			setErrors,
		});
	};

	return (
		<div className="flex flex-col content-center items-center justify-center px-4 text-xl">
			<div className="justify-startp-5 flex flex-col items-center">
				<h1 className="text-5xl text-gray-600">Register</h1>
				<Form
					className="mt-5 flex flex-col space-y-4"
					method="post"
					onSubmit={submitForm}
				>
					<div>
						<label htmlFor="name" className="relative block">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform text-green-500"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
								/>
							</svg>
							<input
								type="text"
								name="name"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="block w-full rounded-full border border-gray-900 bg-gray-600 px-4 py-3 pl-14 placeholder-gray-400"
								placeholder="Username..."
								required
							/>
						</label>
						<InputError messages={errors.name} className="mt-2" />
					</div>

					<div>
						<label htmlFor="password" className="relative block">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform text-green-500"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
								/>
							</svg>

							<input
								type="password"
								name="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="block w-full rounded-full border border-gray-900 bg-gray-600 px-4 py-3 pl-14 placeholder-gray-400"
								placeholder="Password..."
								required
							/>
						</label>

						<InputError
							messages={errors.password}
							className="mt-2"
						/>
					</div>

					<div>
						<label
							htmlFor="password-confirm"
							className="relative block"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform text-green-500"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
								/>
							</svg>

							<input
								type="password"
								name="password"
								id="password-confirm"
								value={passwordConfirmation}
								onChange={(e) =>
									setPasswordConfirmation(e.target.value)
								}
								className="block w-full rounded-full border border-gray-900 bg-gray-600 px-4 py-3 pl-14 placeholder-gray-400"
								placeholder="Password Confirm..."
								required
							/>
						</label>
						<InputError
							messages={errors.password_confirmation}
							className="mt-2"
						/>
					</div>

					<section className="flex items-center justify-between">
						<Link
							to="/login"
							className="text-sm text-gray-400 underline hover:text-gray-600"
						>
							Already Registered?
						</Link>
						<button
							type="submit"
							className="rounded px-2 py-1 hover:bg-blue-500"
						>
							Register
						</button>
					</section>
				</Form>
			</div>
		</div>
	);
}
