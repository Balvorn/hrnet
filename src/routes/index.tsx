import * as React from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { states } from '../states'
import './index.css'
import Modal, {openModal} from '@balvorn/reactmodal'
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
    openModal()
  }

  return (
    <>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to='/employee-list'>View Current Employees</Link>
        <h2>Create Employee</h2>
        <form onSubmit={saveEmployee} id="create-employee">
          <label htmlFor="firstName">First Name</label>
          <input required minLength={2} type="text" id="firstName" name="firstName" />

          <label htmlFor="lastName">Last Name</label>
          <input required minLength={2} type="text" id="lastName" name="lastName" />

          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input required id="dateOfBirth" type="date" name="dateOfBirth" />

          <label htmlFor="startDate">Start Date</label>
          <input required id="startDate" type="date" name="startDate" />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input required minLength={2} id="street" type="text" name="street" />

            <label htmlFor="city">City</label>
            <input required minLength={2} id="city" type="text" name="city" />

            <label htmlFor="state">State</label>
            <select name="state" id="state">
              {
                states.map(state => {
                  return <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                })
              }
            </select>

            <label htmlFor="zipCode">Zip Code</label>
            <input required minLength={5} id="zipCode" type="number" name="zipCode" />
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

      <Modal backDropClose>
        <div>Employee Created!</div>
      </Modal>
    </>
  )
}
