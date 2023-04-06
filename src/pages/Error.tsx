import { NavigateFunction, useNavigate, useRouteError } from 'react-router-dom';

export default function Error() {
	const error: unknown = useRouteError();
	const navigate: NavigateFunction = useNavigate();

	return (
		<div
			id="error-page"
			className="flex h-screen flex-col content-center items-center justify-center px-4 text-xl"
		>
			<strong className="text-3xl">HTTP {error.status}</strong>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
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
