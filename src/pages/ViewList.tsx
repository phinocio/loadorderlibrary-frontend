import axios from '@lib/axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ListData } from '@/types/ListTypes';
import List from '../components/List';

export default function ViewList() {
	const { slug } = useParams();
	const [list, setList] = useState<ListData | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`/v1/lists/${slug}`)
			.then((res) => {
				setList(res.data.data);
			})
			.catch((e) => {
				if (e.response.status === 404) {
					navigate('/404');
				}
				if (e.response.status !== 422) throw e;
			});
	}, [navigate, slug]);

	type File = {
		name: string;
		bytes: number;
		clean_name: string;
		created: string;
		updated: string;
	};

	return (
		<div>
			{!list && <p>Loading...</p>}
			{list && (
				<div>
					<div className="grid grid-cols-4 gap-6">
						<List list={list} className="col-span-3" />
						<div className="col-span-1 flex flex-col justify-between space-y-2 bg-gray-800 p-4">
							<div className="flex flex-row justify-between">
								{list.website ? (
									<div>
										<Link
											to={`https://${list.website}`}
											className="text-green-400 hover:text-green-600"
											target="_blank"
											rel="noopener noreferrer"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="mr-2 inline h-6 w-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
												/>
											</svg>
											Website
										</Link>
									</div>
								) : (
									<div>
										<p className="cursor-not-allowed text-gray-400 line-through">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="mr-2 inline h-6 w-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
												/>
											</svg>
											Website
										</p>
									</div>
								)}

								{list.readme ? (
									<div>
										<Link
											to={`https://${list.readme}`}
											className="text-green-400 hover:text-green-600"
											target="_blank"
											rel="noopener noreferrer"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="mr-2 inline h-6 w-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
												/>
											</svg>
											Readme
										</Link>
									</div>
								) : (
									<div>
										<p className="cursor-not-allowed text-gray-400 line-through">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="mr-2 inline h-6 w-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
												/>
											</svg>
											Readme
										</p>
									</div>
								)}

								{list.discord ? (
									<div>
										<Link
											to={`https://${list.discord}`}
											className="text-green-400 hover:text-green-600"
											target="_blank"
											rel="noopener noreferrer"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="mr-2 inline h-6 w-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
												/>
											</svg>
											Discord
										</Link>
									</div>
								) : (
									<div>
										<p className="cursor-not-allowed text-gray-400 line-through">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="mr-2 inline h-6 w-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
												/>
											</svg>
											Discord
										</p>
									</div>
								)}
							</div>
							<div className="self-center">
								<button
									type="button"
									className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
								>
									Download Files
								</button>
							</div>
						</div>
					</div>
					<div className="mt-4 grid grid-cols-1">
						{list.files?.map((file: File) => {
							return (
								<div
									className="mb-2 flex flex-row justify-between bg-gray-800 p-4"
									key={file.name}
								>
									<p className="text-green-500">
										{file.clean_name}
									</p>
									<p>{file.bytes / 1000} KB</p>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
