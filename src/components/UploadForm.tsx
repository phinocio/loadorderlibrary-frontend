import { useState } from 'react';
import { Form, Link } from 'react-router-dom';
import InputError from '@/components/InputError';
import { UploadErrors } from '@/types/UploadTypes';
import axios from '@/lib/axios';

type UploadFormProps = {
	games: Game[];
};

type Game = {
	id: number;
	name: string;
};

export function UploadForm({ games }: UploadFormProps) {
	const [listName, setListName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [errors, setErrors] = useState<UploadErrors | null>(null);

	const submitForm = (e: { preventDefault: () => void }) => {
		e.preventDefault();

		axios
			.post('/v1/lists', { name: listName })
			.then(() => {
				console.log('meow');
			})
			.catch((err) => {
				if (err.response.status !== 422) throw err;

				setErrors(err.response.data.errors);
			});
	};

	return (
		<div className="flex flex-row content-center justify-between px-4 text-xl">
			<div className="flex w-2/3 flex-col items-center justify-start">
				<h1 className="text-5xl text-gray-600">Upload a List</h1>
				<Form
					className="mt-5 flex w-full flex-col space-y-4"
					method="post"
					onSubmit={submitForm}
				>
					<div>
						<label htmlFor="listName" className="block">
							List Name
							<input
								type="text"
								name="listName"
								id="listName"
								value={listName}
								onChange={(e) => setListName(e.target.value)}
								className="block w-full rounded-xl border border-gray-900 bg-gray-600 px-4 py-3 placeholder-gray-400"
								placeholder="List Name..."
								required
							/>
						</label>
						{errors?.name && (
							<InputError
								message={errors.name[0]}
								className="mt-2"
							/>
						)}
					</div>

					<div>
						<label htmlFor="description" className="block">
							Description (optional)
							<textarea
								name="description"
								id="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="block w-full rounded-xl border border-gray-900 bg-gray-600 px-4 py-3 placeholder-gray-400"
							/>
						</label>
						{errors?.description && (
							<InputError
								message={errors.description[0]}
								className="mt-2"
							/>
						)}
					</div>

					<section className="flex items-center justify-between">
						<button
							type="submit"
							className="rounded px-2 py-1 hover:bg-blue-500"
						>
							Upload
						</button>
					</section>
				</Form>
			</div>
			<div className="w-1/3">
				<div>
					<h1 className="text-center text-5xl text-gray-600">
						Valid Files
					</h1>
					<ul className="text-right">
						<li>enblocal.ini</li>
						<li>enbseries.ini</li>
						<li>fallout.ini</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default UploadForm;
