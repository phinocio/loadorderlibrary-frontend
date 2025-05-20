import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/games/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/games/$slug"!</div>
}
