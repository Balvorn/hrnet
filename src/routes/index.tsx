import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { states } from '../states'
import './index.css'
export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {



  const saveEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formValues = new FormData(form);
    console.log(formValues)
    const employees = JSON.parse(localStorage.getItem('employees') || "[]");
    const employee = Object.fromEntries(formValues.entries())
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));
    const dialog = document.getElementById('confirmation') as HTMLDialogElement
    dialog.showModal()
  }

  return (
    <>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <a href="employee-list.html">View Current Employees</a>
        <h2>Create Employee</h2>
        <form onSubmit={saveEmployee} id="create-employee">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <input id="date-of-birth" type="text" name="date-of-birth" />

          <label htmlFor="start-date">Start Date</label>
          <input id="start-date" type="text" name="start-date" />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" name="street" />

            <label htmlFor="city">City</label>
            <input id="city" type="text" name="city" />

            <label htmlFor="state">State</label>
            <select name="state" id="state">
              {
                states.map(state => {
                  return <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                })
              }
            </select>

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" name="zip-code" />
          </fieldset>

          <label htmlFor="department">Department</label>
          <select name="department" id="department">
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>
          <button type="submit">Save</button>
        </form>


      </div >
      <dialog id="confirmation" className="modal">
        Employee Created!
        <button onClick={() => (document.getElementById('confirmation') as HTMLDialogElement).close()}>close</button>
      </dialog>
    </>
  )
}
