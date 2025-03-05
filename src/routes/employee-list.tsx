import * as React from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import EmployeeTable from '../components/table'

export const Route = createFileRoute('/employee-list')({
  component: AboutComponent,
})

function AboutComponent() {

  return (
    <div id="employee-div" className="container">
      <h3>Current Employees</h3>
      <EmployeeTable/>
      <Link to='/'>Home</Link>
    </div>
  )
}