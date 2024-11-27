import React, { useEffect, useState } from "react"
import { useTable, usePagination, Column, HeaderGroup } from "react-table"

// Define the interface for your row data
interface RowData {
  id: string // Assuming each row has an 'id' field, update the type accordingly
  // Add other fields that your rows might have
  [key: string]: any
}

interface TableProps {
  columns: Column<RowData>[]
  data: RowData[]
  pagination?: boolean
  onPageChange?: (pageIndex: number) => void
  onEdit?: (row: RowData) => void
  onDelete?: (id: string) => void
  tableClass?: string
  sizePerPageList?: number[]
  theadClass?: string
}

const TableComponent: React.FC<TableProps> = ({
  columns,
  data,
  pagination = true,
  onPageChange,
  onEdit,
  onDelete,
  tableClass = "",
  sizePerPageList = [10, 20, 50],
  theadClass = "",
}) => {
  const [pageSize, setPageSize] = useState(10) // Example state for page size
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    page,
  } = useTable(
    {
      columns,
      data,
      manualPagination: !!pagination,
      initialState: { pageSize },
    },
    usePagination // Add pagination hook
  )

  const { pageIndex } = state

  // Handling page change
  useEffect(() => {
    if (onPageChange) {
      onPageChange(pageIndex)
    }
  }, [pageIndex, onPageChange])

  const handleDelete = (id: string) => {
    if (onDelete) {
      onDelete(id) // Call onDelete if passed
    }
  }

  return (
    <div className="table-responsive">
      <table
        {...getTableProps()}
        className={`table table-centered react-table ${tableClass}`}
      >
        <thead className={theadClass}>
          {headerGroups.map((headerGroup: HeaderGroup<RowData>) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
                {onEdit && (
                  <td>
                    <button onClick={() => onEdit(row.original)}>Edit</button>
                  </td>
                )}
                {onDelete && (
                  <td>
                    <button
                      onClick={() => handleDelete(row.original.id)} // TypeScript now knows row.original has an 'id'
                      className="btn btn-sm btn-link text-danger"
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>

      {pagination && (
        <div className="pagination-controls">
          {/*   <button
            onClick={() => {
              if (pageIndex > 0) {
                setPageSize(pageSize)
              }
            }}
            disabled={pageIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (pageIndex < rows.length / pageSize) {
                setPageSize(pageSize)
              }
            }}
            disabled={pageIndex === Math.ceil(rows.length / pageSize)}
          >
            Next
          </button> */}
          <select
            onChange={(e) => {
              const newSize = Number(e.target.value)
              setPageSize(newSize)
              if (onPageChange) {
                onPageChange(0) // Go to the first page when page size changes
              }
            }}
            value={pageSize}
          >
            {sizePerPageList.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}

export default TableComponent
