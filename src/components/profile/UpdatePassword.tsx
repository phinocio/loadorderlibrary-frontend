import { useState } from 'react';
import { Form } from 'react-router-dom';
import axios from '@/lib/axios';
import InputError from '@/components/InputError';
import useAuth from '@/context/AuthProvider';
import { Auth } from '@/types/AuthTypes';

export type UpdatePasswordErrors = {
	current_password: Array<string>;
	password: Array<string>;
	password_confirmation: Array<string>;
};

export default function UpdatePassword() {
	const [newPassword, setNewPassword] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [errors, setErrors] = useState<UpdatePasswordErrors | null>(null);

	const { mutate } = useAuth() as Auth;

	const submitForm = (e: { preventDefault: () => void }) => {
		e.preventDefault();

		axios
			.put('/user/password', {
				current_password: currentPassword,
				password: newPassword,
				password_confirmation: passwordConfirmation,
			})
			.then(() => {
				setNewPassword('');
				setCurrentPassword('');
				setPasswordConfirmation('');
				mutate();
			})
			.catch((err) => {
				if (err.response.status !== 422) throw err;

				setErrors(err.response.data.errors);
			});
	};

	return (
		<Form
			className="mt-5 flex flex-col space-y-4"
			method="post"
			onSubmit={submitForm}
		>
			<label htmlFor="current_password" className="relative block">
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
					name="current_password"
					id="current_password"
					value={currentPassword}
					onChange={(e) => setCurrentPassword(e.target.value)}
					className="block w-full rounded-full border border-gray-900 bg-gray-600 px-4 py-3 pl-14 placeholder-gray-400"
					placeholder="Current Password..."
					required
					autoComplete="current-password"
				/>
			</label>
			{errors?.current_password && (
				<InputError
					message={errors.current_password[0]}
					className="mt-2"
				/>
			)}
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
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					className="block w-full rounded-full border border-gray-900 bg-gray-600 px-4 py-3 pl-14 placeholder-gray-400"
					placeholder="New Password..."
					required
					autoComplete="new-password"
				/>
			</label>
			{errors?.password && (
				<InputError message={errors.password[0]} className="mt-2" />
			)}
			<label htmlFor="password-confirm" className="relative block">
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
					name="password-confirm"
					id="password-confirm"
					value={passwordConfirmation}
					onChange={(e) => setPasswordConfirmation(e.target.value)}
					className="block w-full rounded-full border border-gray-900 bg-gray-600 px-4 py-3 pl-14 placeholder-gray-400"
					placeholder="Password Confirm..."
					required
					autoComplete="new-password"
				/>
			</label>
			{errors?.password_confirmation && (
				<InputError
					message={errors.password_confirmation[0]}
					className="mt-2"
				/>
			)}
			<section className="flex items-center justify-end">
				<button
					type="submit"
					className="rounded px-2 py-1 hover:bg-blue-500"
				>
					Update Password
				</button>
			</section>
		</Form>
	);
}
