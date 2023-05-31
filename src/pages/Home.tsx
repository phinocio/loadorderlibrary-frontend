function Home() {
	return (
		<div className="flex flex-col rounded bg-gray-700">
			{/* List Card Header */}
			<div className="flex justify-between border-b border-gray-600 bg-gray-800 p-4">
				<div className="flex flex-col">
					<h1>What is this?</h1>
				</div>
			</div>
			{/* List Card Body */}
			<div className="h-100 flex-auto bg-gray-700 p-4">
				<p className="mb-3">
					Load Order Library is a website/tool to share mod lists of
					Bethesda games with other players. Primarily for debugging
					purposes, but can be quite useful for YouTuber&apos;s to
					have mod lists for each of their let&apos;s play characters,
					mod list creators to share with users, etc.
				</p>
				<p>
					To upload a mod list, simply click &quot;upload&quot; and
					select the mod list/game inis you want to upload. It&apos;s
					recommended to copy them to a single folder first so you can
					select them all in the file picker popup. Once uploaded, a
					handy link will be provided to share with others! An account
					is not required to upload, but recommended for extra
					features such as deleting lists. More features will come in
					the future. Checkout the{' '}
					<a
						href="https://github.com/Load-Order-Library/frontend/blob/main/README.md"
						className="text-green-500"
					>
						Github README
					</a>{' '}
					for more info.
				</p>
			</div>
		</div>
	);
}
export default Home;
