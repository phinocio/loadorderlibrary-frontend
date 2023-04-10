export default function ListSkeleton() {
	return (
		<div className="flex h-72 flex-col rounded bg-gray-700">
			{/* List Card Header */}
			<div className="flex justify-between border-b border-gray-600 bg-gray-800 p-4">
				<div className="flex h-10 w-full flex-col bg-gray-600" />
			</div>
			{/* List Card Body */}
			<div className="h-100 flex-auto bg-gray-700 p-4" />

			{/* List Card Footer */}
			<div className="align-end h-20 border-t border-gray-800 bg-gray-800 p-4 text-gray-500">
				<div className="flex h-10 w-full flex-col bg-gray-600" />
			</div>
		</div>
	);
}
