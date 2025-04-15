import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/about")({
	component: About,
});

function About() {
	const meow = ["a", "b", "c"];
	return (
		<>
			{meow.map((item) => {
				return <p key={item}>{item}</p>;
			})}
		</>
	);
}
