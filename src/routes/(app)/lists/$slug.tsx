import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/lists/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/lists/$slug"!</div>
}
