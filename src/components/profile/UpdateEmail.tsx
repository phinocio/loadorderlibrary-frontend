import { useState } from 'react';
import { Form } from 'react-router-dom';
import axios from '@/lib/axios';
import InputError from '@/components/InputError';
import useAuth from '@/context/AuthProvider';
import { Auth } from '@/types/AuthTypes';

export type UpdateEmailErrors = {
	email: Array<string>;
};

export default function UpdateEmail({ email }: { email: string | null }) {
	const [newEmail, setNewEmail] = useState('');
	const [errors, setErrors] = useState<UpdateEmailErrors | null>(null);

	const { mutate } = useAuth() as Auth;

	const submitForm = (e: { preventDefault: () => void }) => {
		e.preventDefault();

		axios
			.put('/user/profile-information', {
				email: newEmail,
			})
			.then(() => {
				setNewEmail('');
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
			<label htmlFor="current_email" className="relative block">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform text-gray-400"
				>
					<path
						strokeLinecap="round"
						d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
					/>
				</svg>

				<input
					type="text"
					name="current_email"
					id="current_email"
					value={email ?? 'No email provided'}
					className="block w-full rounded-full border border-gray-900 bg-gray-600 px-4 py-3 pl-14 text-gray-400 placeholder-gray-400"
					disabled
				/>
			</label>
			<label htmlFor="password-confirm" className="relative block">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform text-green-500"
				>
					<path
						strokeLinecap="round"
						d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
					/>
				</svg>

				<input
					type="text"
					name="email"
					id="email"
					value={newEmail}
					onChange={(e) => setNewEmail(e.target.value)}
					className="block w-full rounded-full border border-gray-900 bg-gray-600 px-4 py-3 pl-14 placeholder-gray-400"
					placeholder="New Email"
				/>
			</label>
			{errors?.email && (
				<InputError message={errors.email[0]} className="mt-2" />
			)}
			<section className="flex items-center justify-end">
				<button
					type="submit"
					className="rounded px-2 py-1 hover:bg-blue-500"
				>
					Update Email
				</button>
			</section>
		</Form>
	);
}
