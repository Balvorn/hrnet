import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {

  return (
    <>
      <Outlet />
    </>
  )
}
