import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/users/$name')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/users/$name"!</div>
}
