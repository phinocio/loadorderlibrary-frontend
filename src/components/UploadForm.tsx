import { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import InputError from '@/components/InputError';
import { UploadErrors } from '@/types/UploadTypes';
import axios from '@/lib/axios';
import { Auth } from '@/types/AuthTypes';
import useAuth from '@/context/AuthProvider';

type UploadFormProps = {
	games: Game[];
};

type Game = {
	id: number;
	name: string;
};

export function UploadForm({ games }: UploadFormProps) {
	const { user, isLoading } = useAuth() as Auth;

	const [listName, setListName] = useState<string>('');
	const [description, setDescription] = useState<string | undefined>(
		undefined
	);
	const [version, setVersion] = useState<string | undefined>(undefined);
	const [website, setWebsite] = useState<string | undefined>(undefined);
	const [discord, setDiscord] = useState<string | undefined>(undefined);
	const [readme, setReadme] = useState<string | undefined>(undefined);
	const [game, setGame] = useState<string>('');
	const [expires, setExpires] = useState<string>(
		user && !isLoading ? 'perm' : '24h'
	);
	const [fileList, setFileList] = useState<FileList | null>(null); // The fuck type are files???
	const [isPrivate, setIsPrivate] = useState<boolean>(false);
	const [errors, setErrors] = useState<UploadErrors | null>(null);

	const navigate = useNavigate();

	const files = fileList ? [...fileList] : [];

	const submitForm = (e: { preventDefault: () => void }) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append('name', listName);
		formData.append('game', game);
		files?.forEach((file) => {
			formData.append('files[]', file, file.name);
		});

		formData.append('expires', expires);

		// Form data can't take booleans because fuck me I guess?
		if (isPrivate) {
			formData.append('private', 'true');
		}

		if (description) {
			formData.append('description', description);
		}

		axios
			.post('/v1/lists', formData)
			.then((res) => {
				navigate(res.data.data.links.url);
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

					<div>
						<label htmlFor="version" className="block">
							Version (optional)
							<input
								type="text"
								name="version"
								id="version"
								value={version}
								onChange={(e) => setVersion(e.target.value)}
								className="block w-full rounded-xl border border-gray-900 bg-gray-600 px-4 py-3 placeholder-gray-400"
								placeholder="1.0.0-alpha"
							/>
						</label>
						{errors?.version && (
							<InputError
								message={errors.version[0]}
								className="mt-2"
							/>
						)}
					</div>

					<div>
						<label htmlFor="discord" className="block">
							Discord (optional)
							<input
								type="text"
								name="discord"
								id="discord"
								value={discord}
								onChange={(e) => setDiscord(e.target.value)}
								className="block w-full rounded-xl border border-gray-900 bg-gray-600 px-4 py-3 placeholder-gray-400"
								placeholder="www.example.com/discord"
							/>
						</label>
						{errors?.discord && (
							<InputError
								message={errors.discord[0]}
								className="mt-2"
							/>
						)}
					</div>

					<div>
						<label htmlFor="website" className="block">
							Website (optional)
							<input
								type="text"
								name="website"
								id="website"
								value={website}
								onChange={(e) => setWebsite(e.target.value)}
								className="block w-full rounded-xl border border-gray-900 bg-gray-600 px-4 py-3 placeholder-gray-400"
								placeholder="www.example.com"
							/>
						</label>
						{errors?.website && (
							<InputError
								message={errors.website[0]}
								className="mt-2"
							/>
						)}
					</div>

					<div>
						<label htmlFor="readme" className="block">
							README (optional)
							<input
								type="text"
								name="readme"
								id="readme"
								value={readme}
								onChange={(e) => setReadme(e.target.value)}
								className="block w-full rounded-xl border border-gray-900 bg-gray-600 px-4 py-3 placeholder-gray-400"
								placeholder="www.example.com/README.md"
							/>
						</label>
						{errors?.readme && (
							<InputError
								message={errors.readme[0]}
								className="mt-2"
							/>
						)}
					</div>

					<div>
						<label htmlFor="game" className="block">
							Game
							<select
								id="game"
								name="game"
								value={game}
								className="block w-full rounded-xl border border-gray-900 bg-gray-600 px-4 py-3 placeholder-gray-400"
								onChange={(e) => setGame(e.target.value)}
								required
							>
								<option value="">-Choose Game-</option>
								{games.map((gm) => {
									return (
										<option value={gm.id} key={gm.id}>
											{gm.name}
										</option>
									);
								})}
							</select>
						</label>
						{errors?.game && (
							<InputError
								message={errors.game[0]}
								className="mt-2"
							/>
						)}
					</div>

					<div>
						<label htmlFor="expires" className="block">
							Expires
							<select
								id="expires"
								name="expires"
								value={expires}
								className="block w-full rounded-xl border border-gray-900 bg-gray-600 px-4 py-3 placeholder-gray-400"
								onChange={(e) => setExpires(e.target.value)}
								required
							>
								<option value="3h">3 Hours</option>
								<option value="24h">24 Hours</option>
								<option value="3d">3 Days</option>
								<option value="1w">1 Week</option>
								<option value="perm">Permanent</option>
							</select>
						</label>
						{errors?.expires && (
							<InputError
								message={errors.expires[0]}
								className="mt-2"
							/>
						)}
					</div>

					<div>
						<label htmlFor="files[]" className="block">
							Choose Files
							<input
								type="file"
								name="files[]"
								id="files[]"
								onChange={(e) => setFileList(e.target.files)}
								className="block w-full rounded-xl border border-gray-900 bg-gray-600 px-4 py-3 placeholder-gray-400"
								multiple
								required
							/>
						</label>
						{errors?.files && (
							<InputError
								message={errors.files[0]}
								className="mt-2"
							/>
						)}
					</div>

					<div>
						<label className="block" htmlFor="private">
							Private
							<input
								name="private"
								className="block w-full rounded-xl border border-gray-900 bg-gray-600 px-4 py-3 placeholder-gray-400"
								type="checkbox"
								onChange={(e) => setIsPrivate(e.target.checked)}
								id="private"
								checked={isPrivate}
							/>
						</label>
						{errors?.private && (
							<InputError
								message={errors.private[0]}
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
