import axios from '@lib/axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListData } from '@/types/ListTypes';
import List from '../components/List';

export default function ViewList() {
	const { slug } = useParams();
	const [list, setList] = useState<ListData | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`/v1/lists/${slug}`)
			.then((res) => setList(res.data.data))
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
					<List list={list} />
					<div className="mt-4 flex flex-col">
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
