import { useSearchParams } from 'react-router-dom';
import { ListData } from '../types/ListTypes';
import List from '../components/List';
import Pagination from '@/components/Pagination';
import useLists from '@/hookss/useLists';

export default function ViewLists() {
	// let lists = useLoaderData() as Lists;
	// const [lists, setLists] = useState<Lists | null>(null);
	const [searchParams, setSearchParams] = useSearchParams('page=1');

	const { lists, error, isLoading } = useLists(searchParams);

	// useEffect(() => {
	// 	axios
	// 		.get(`/v1/lists?${searchParams}`)
	// 		.then((res) => {
	// 			setLists(res.data);
	// 		})
	// 		.catch((e) => {
	// 			if (e.response.status !== 422) throw e;
	// 		});
	// }, [location, searchParams]);

	return (
		<div className="grid">
			<h1 className="text-5xl text-gray-600">All Lists</h1>

			<div className="my-4 grid grid-cols-1 gap-6 sm:gap-y-12 md:grid-cols-2 lg:grid-cols-3">
				{isLoading && (
					<div className="absolute left-1/2 self-center">
						<div
							className="text-primary inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
							role="status"
						>
							<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
								Loading...
							</span>
						</div>
					</div>
				)}

				{error && <div>Something went wrong fetching lists</div>}

				{!isLoading && !error && !lists?.data.length && (
					<div>No more results, double check the current page.</div>
				)}

				{lists &&
					lists.data.map((list: ListData) => {
						return <List list={list} key={list.slug} />;
					})}
			</div>

			<div className="flex justify-center">
				{lists && <Pagination links={lists.meta.links} />}
			</div>
		</div>
	);
}

// Currently unused
// export const listsLoader = async () => {
// 	try {
// 		const res = await axios.get('/v1/lists');
// 		return res.data;
// 	} catch (e: unknown) {
// 		if (e instanceof AxiosError) {
// 			if (e.response) {
// 				throw new Error(
// 					`${e.response.status} ${e.response.statusText}`
// 				);
// 			} else if (e.request) {
// 				throw new Error(`${e.request.status} ${e.request.statusText}`);
// 			} else {
// 				throw new Error(e.message);
// 			}
// 		} else {
// 			throw new Error(
// 				'Something went wrong fetching lists. Let Phin know.'
// 			);
// 		}
// 	}
// };
