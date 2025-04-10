import React, { createContext, useEffect, useReducer, useState } from 'react';
import { Employee } from './components/table';


type InitialState = {
    employees: Employee[];
    addEmployee: (employee: Employee) => void;
};
export const EmployeesContext = createContext<InitialState | undefined>(undefined);
// CartProvider Component
export const EmployeesContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const storedEmployees = localStorage.getItem('employees');
        if (storedEmployees) {
            const employees = JSON.parse(storedEmployees);
            setEmployees(employees)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees))
    }, [employees])

    const addEmployee = (employee: Employee) => {
        setEmployees([...employees, employee])
    };

    const values = {
        employees,
        addEmployee,
    }
    return (
        <EmployeesContext.Provider value={values}>
            {children}
        </EmployeesContext.Provider>
    );
}