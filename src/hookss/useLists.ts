import useSWR from 'swr';
import axios from '@/lib/axios';

export default function useLists(page: URLSearchParams) {
	const fetcher = (url: string) => axios.get(url).then((res) => res.data);

	const { data, error, isLoading } = useSWR(`/v1/lists?${page}`, fetcher);

	return {
		lists: data,
		error,
		isLoading,
	};
}
