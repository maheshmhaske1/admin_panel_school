// DataTable.js
import React from 'react'
import PropTypes from 'prop-types'
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table'
import { Table, FormControl, Button } from 'react-bootstrap'
// import { useState } from 'react'
import * as XLSX from 'xlsx'
import './DataTable.css' // Import the CSS file

const DataTable = ({ columns, data, name }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, // Set initial pageSize to tablePageSize
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  )

  const downloadExcel = () => {
    const excelData = data.map((row) =>
      columns.reduce((acc, column) => {
        acc[column.Header] = row[column.accessor]
        return acc
      }, {}),
    )

    const ws = XLSX.utils.json_to_sheet(excelData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
    XLSX.writeFile(wb, 'data.xlsx')
  }

  return (
    <div className="data-table-container">
        <h5>{name?name:""}</h5>
      <div className="data-table-header">
        <div className="search-box-container">
          <FormControl
            type="text"
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
          <span className="search-icon">&#x1F50D;</span>
        </div>
        <Button onClick={() => downloadExcel()} variant="success" className='download_excel' style={{ color: 'white' }}>
          Download Excel
        </Button>
      </div>
      <div className="table-wrapper">
      <Table {...getTableProps()} bordered hover responsive>
        <thead>
          <tr>
            <th>Sr. No.</th>
            {headerGroups.map((headerGroup) => (
              <React.Fragment key={headerGroup._id}>
                {headerGroup.headers.map((column) => (
                  <th key={column._id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  </th>
                ))}
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr key={row._id} {...row.getRowProps()}>
                <td>{pageIndex * pageSize + i + 1}</td>
                {row.cells.map((cell) => (
                  <td key={cell.column._id} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </Table>
      </div>
     
      <div className="pagination-controls">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(page.length - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <span>
          &nbsp;Page <strong>{pageIndex + 1}</strong> of {Math.ceil(data.length / pageSize)} pages | Showing {data.length} Records
        </span>
      </div>
    </div>
  )
}

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
}

export default DataTable