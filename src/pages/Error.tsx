import {
	isRouteErrorResponse,
	NavigateFunction,
	useNavigate,
	useRouteError,
} from 'react-router-dom';

export default function Error() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const error: any = useRouteError();
	const navigate: NavigateFunction = useNavigate();
	if (isRouteErrorResponse(error)) {
		return (
			<div
				id="error-page"
				className="flex h-screen flex-col content-center items-center justify-center px-4 text-xl"
			>
				<strong className="text-3xl">HTTP {error.status}</strong>
				<code className="m-3 w-96 rounded border border-red-500 bg-gray-800 p-6 text-center shadow-inner ">
					<i>{error.statusText}</i>
				</code>
				<button
					type="button"
					onClick={() => navigate(-1)}
					className="mt-4 rounded-full bg-blue-600 px-6 py-3"
				>
					Go Back
				</button>
			</div>
		);
	}
	return (
		<div
			id="error-page"
			className="flex h-screen flex-col content-center items-center justify-center px-4 text-xl"
		>
			<strong className="text-3xl">There was an error.</strong>
			<code className="m-3 w-96 rounded border border-red-500 bg-gray-800 p-6 text-center shadow-inner ">
				<i>{error.message}</i>
			</code>
			<p>Please report this error to Phinocio.</p>
		</div>
	);
}
