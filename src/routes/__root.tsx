import { Outlet, createRootRoute } from '@tanstack/react-router'
import { EmployeesContextProvider } from '../employeesContext'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {

  return (
    <EmployeesContextProvider>
      <Outlet />
    </EmployeesContextProvider>
  )
}
