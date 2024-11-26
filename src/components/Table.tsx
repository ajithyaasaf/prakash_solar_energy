import React, { useRef, useEffect, forwardRef, useState } from "react"
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useGlobalFilter,
  useAsyncDebounce,
  useExpanded,
} from "react-table"
import classNames from "classnames"

// components
import Pagination from "./Pagination"

// Global filter for search functionality
interface GlobalFilterProps {
  preGlobalFilteredRows: any
  globalFilter: any
  setGlobalFilter: any
  searchBoxClass: any
}

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  searchBoxClass,
}: GlobalFilterProps) => {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState<any>(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <div className={classNames(searchBoxClass)}>
      <span className="d-flex align-items-center">
        Search:{" "}
        <input
          type="search"
          value={value || ""}
          onChange={(e: any) => {
            setValue(e.target.value)
            onChange(e.target.value)
          }}
          placeholder={`${count} records...`}
          className="form-control w-auto ms-1"
        />
      </span>
    </div>
  )
}

// Checkbox component for row selection
interface IndeterminateCheckboxProps {
  indeterminate: any
  children?: React.ReactNode
}

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  IndeterminateCheckboxProps
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef()
  const resolvedRef: any = ref || defaultRef

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        ref={resolvedRef}
        {...rest}
      />
      <label htmlFor="form-check-input" className="form-check-label"></label>
    </div>
  )
})

interface TableProps {
  isSearchable?: boolean
  isSortable?: boolean
  pagination?: boolean
  isSelectable?: boolean
  isExpandable?: boolean
  sizePerPageList?: {
    text: string
    value: number
  }[]
  columns: {
    Header: string
    accessor: string
    sort?: boolean
    Cell?: any
    className?: string
  }[]
  data: any[]
  pageSize?: any
  searchBoxClass?: string
  tableClass?: string
  theadClass?: string
  onEdit?: (id: any) => void
  onDelete?: (id: any) => void
}

const Table = (props: TableProps) => {
  const {
    isSearchable,
    isSortable,
    pagination,
    isSelectable,
    isExpandable,
    sizePerPageList,
    columns,
    data,
    pageSize,
    searchBoxClass,
    tableClass,
    theadClass,
    onEdit,
    onDelete,
  } = props

  let otherProps: any = {}

  if (isSearchable) {
    otherProps["useGlobalFilter"] = useGlobalFilter
  }
  if (isSortable) {
    otherProps["useSortBy"] = useSortBy
  }
  if (isExpandable) {
    otherProps["useExpanded"] = useExpanded
  }
  if (pagination) {
    otherProps["usePagination"] = usePagination
  }
  if (isSelectable) {
    otherProps["useRowSelect"] = useRowSelect
  }

  const dataTable = useTable(
    {
      columns,
      data,
      initialState: { pageSize: pageSize || 10 },
    },
    otherProps.hasOwnProperty("useGlobalFilter") &&
      otherProps["useGlobalFilter"],
    otherProps.hasOwnProperty("useSortBy") && otherProps["useSortBy"],
    otherProps.hasOwnProperty("useExpanded") && otherProps["useExpanded"],
    otherProps.hasOwnProperty("usePagination") && otherProps["usePagination"],
    otherProps.hasOwnProperty("useRowSelect") && otherProps["useRowSelect"],
    (hooks) => {
      isSelectable &&
        hooks.visibleColumns.push((columns: any) => [
          {
            id: "selection",
            Header: ({ getToggleAllPageRowsSelectedProps }: any) => (
              <div>
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                />
              </div>
            ),
            Cell: ({ row }: any) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ])

      isExpandable &&
        hooks.visibleColumns.push((columns: any) => [
          {
            id: "expander",
            Header: ({
              getToggleAllRowsExpandedProps,
              isAllRowsExpanded,
            }: any) => (
              <span {...getToggleAllRowsExpandedProps()}>
                {isAllRowsExpanded ? "-" : "+"}
              </span>
            ),
            Cell: ({ row }) =>
              row.canExpand ? (
                <span
                  {...row.getToggleRowExpandedProps({
                    style: {
                      paddingLeft: `${row.depth * 2}rem`,
                    },
                  })}
                >
                  {row.isExpanded ? "-" : "+"}
                </span>
              ) : null,
          },
          ...columns,
        ])
    }
  )

  let rows = pagination ? dataTable.page : dataTable.rows

  return (
    <>
      {isSearchable && (
        <GlobalFilter
          preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
          globalFilter={dataTable.state.globalFilter}
          setGlobalFilter={dataTable.setGlobalFilter}
          searchBoxClass={searchBoxClass}
        />
      )}

      <div className="table-responsive">
        <table
          {...dataTable.getTableProps()}
          className={classNames("table table-centered react-table", tableClass)}
        >
          <thead className={theadClass}>
            {(dataTable.headerGroups || []).map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {(headerGroup.headers || []).map((column: any) => (
                  <th
                    {...column.getHeaderProps(
                      isSortable && column.sort
                        ? column.getSortByToggleProps()
                        : undefined
                    )}
                    className={classNames({
                      sorting_desc: column.isSortedDesc === true,
                      sorting_asc: column.isSortedDesc === false,
                      sortable: column.sort === true,
                    })}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...dataTable.getTableBodyProps()}>
            {(rows || []).map((row: any, i: number) => {
              dataTable.prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {(row.cells || []).map((cell: any) => (
                    <td
                      {...cell.getCellProps([
                        { className: cell.column.className },
                      ])}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                  <td>
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row.original.id)}
                        className="btn btn-sm btn-link text-primary"
                        title="Edit"
                      >
                        <i className="fas fa-edit" />
                      </button>
                    )}
                  </td>
                  <td>
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row.original.id)}
                        className="btn btn-sm btn-link text-danger"
                        title="Delete"
                      >
                        <i className="fas fa-trash-alt" />
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {pagination && (
        <Pagination tableProps={dataTable} sizePerPageList={sizePerPageList} />
      )}
    </>
  )
}

export default Table
