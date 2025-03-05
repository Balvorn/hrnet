import React, { useMemo, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    ColumnDef,
    flexRender,
} from "@tanstack/react-table";

import unsorted from '../assets/sort_both.png';
import sort_asc from '../assets/sort_asc.png';
import sort_desc from '../assets/sort_desc.png';

interface Employee {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    startDate: Date;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    department: "Sales" | "Marketing" | "Engineering" | "Human Resources" | "Legal";
}

function EmployeeTable() {
    const [globalFilter, setGlobalFilter] = useState("");

    const columns: ColumnDef<Employee>[] = useMemo(() => [
        {
            accessorKey: "firstName",
            header: "First Name",
        },
        {
            accessorKey: "lastName",
            header: "Last Name",
        },
        {
            accessorKey: "dateOfBirth",
            header: "Date of Birth",
        },
        {
            accessorKey: "startDate",
            header: "Start Date",
        },
        {
            accessorKey: "street",
            header: "Street",
        },
        {
            accessorKey: "city",
            header: "City",
        },
        {
            accessorKey: "state",
            header: "State",
        },
        {
            accessorKey: "zipCode",
            header: "Zip Code",
        },
        {
            accessorKey: "department",
            header: "Department",
        },
    ], []);

    //✅ GOOD: This will not cause an infinite loop of re-renders because `data` is a stable reference
    const [employees, setEmployees] = useState(() => JSON.parse(localStorage.getItem("employees") || "[]")
    );

    const table = useReactTable({
        data: employees,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
    });

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded w-full"
            />

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="bg-gray-200">
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="border border-gray-300 p-2 cursor-pointer"
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() === "asc" ? <img src={sort_asc}></img>
                                        : header.column.getIsSorted() === "desc" ? <img src={sort_desc}></img>
                                            : <img src={unsorted}></img>
                                    }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-100">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="border border-gray-300 p-2">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="border border-gray-300 p-2 text-center">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="flex items-center justify-between mt-4">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Précédent
                </button>

                <span>
                    Page <strong>{table.getState().pagination.pageIndex + 1}</strong> sur{" "}
                    <strong>{table.getPageCount()}</strong>
                </span>

                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default EmployeeTable;