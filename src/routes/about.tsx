import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	const meow = ["a", "b", "c"];
	return (
		<>
			{meow.map((item) => {
				<p>{item}</p>;
			})}
		</>
	);
}
