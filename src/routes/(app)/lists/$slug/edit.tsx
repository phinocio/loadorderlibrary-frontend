import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/lists/$slug/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/lists/$slug/edit"!</div>
}
