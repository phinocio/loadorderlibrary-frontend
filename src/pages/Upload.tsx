import { useEffect, useState } from 'react';
import UploadForm from '@/components/UploadForm';
import axios from '@/lib/axios';

// Make this actually fetch from API.
// const games = [
// 	{ id: 0, name: 'skyrim' },
// 	{ id: 1, name: 'fallout' },
// ];

function Upload() {
	const [games, setGames] = useState();
	const [errors, setErrors] = useState();

	useEffect(() => {
		axios
			.get('/v1/games')
			.then((res) => {
				setGames(res.data.data);
			})
			.catch((err) => {
				if (err.response.status !== 422) throw err;

				setErrors(err.response.data.errors);
			});
	}, []);

	return (
		<>
			{!games && <p>Loading...</p>}
			{errors && <p>Something went wrong fetching list of games...</p>}
			{games && !errors && <UploadForm games={games} />}
		</>
	);
}
export default Upload;
