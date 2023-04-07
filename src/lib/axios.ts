import Axios from 'axios';
import { apiUrl } from '../env';

const axios = Axios.create({
	baseURL: apiUrl,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
	},
	withCredentials: true,
});

export default axios;
