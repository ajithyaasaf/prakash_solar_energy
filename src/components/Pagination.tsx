import React, { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import classNames from "classnames"

interface PaginationProps {
  currentPage: number // 1-indexed
  totalPages: number
  onPageChange: (page: number) => void
  sizePerPage?: number // Tracks current page size
  sizePerPageList?: {
    text: string
    value: number
  }[] // Optional: List of page size options
  onPageSizeChange?: (size: number) => void // Optional: Callback for size changes
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  sizePerPage,
  sizePerPageList = [],
  onPageSizeChange,
}: PaginationProps) => {
  const [pageIndex, setPageIndex] = useState<number>(currentPage - 1) // Convert currentPage to 0-indexed

  useEffect(() => {
    setPageIndex(currentPage - 1)
  }, [currentPage])

  // Get the list of visible pages
  const getVisiblePages = useCallback((page: number | null, total: number) => {
    if (total < 7) {
      return Array.from({ length: total }, (_, index) => index + 1)
    } else {
      if (page! > 4 && page! + 2 < total) {
        return [1, page! - 1, page!, page! + 1, total]
      } else if (page! > 4 && page! + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total]
      } else {
        return [1, 2, 3, 4, 5, total]
      }
    }
  }, [])

  const [visiblePages, setVisiblePages] = useState<number[]>(
    getVisiblePages(pageIndex + 1, totalPages)
  )

  useEffect(() => {
    setVisiblePages(getVisiblePages(pageIndex + 1, totalPages))
  }, [pageIndex, totalPages, getVisiblePages])

  const changePage = (page: number) => {
    if (page === pageIndex + 1) return // Prevent re-render if same page is selected
    onPageChange(page) // Pass the page to onPageChange
    setPageIndex(page - 1)
  }

  const activePage = pageIndex + 1 // 1-indexed page

  return (
    <div className="d-lg-flex align-items-center text-center pb-1">
      {/* Dropdown for selecting page size */}
      {sizePerPageList.length > 0 && (
        <div className="d-inline-block me-3">
          <label className="me-1">Display:</label>
          <select
            value={sizePerPage}
            onChange={(e) => {
              const newSize = Number(e.target.value)
              onPageSizeChange?.(newSize) // Notify parent of size change
            }}
            className="form-select d-inline-block w-auto"
          >
            {sizePerPageList.map((pageSize, index) => (
              <option key={index} value={pageSize.value}>
                {pageSize.text}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Current page indicator */}
      {/*    <span className="me-3">
        Page{" "}
        <strong>
          {activePage} of {totalPages}
        </strong>
      </span> */}

      {/* Input for directly jumping to a page */}
      {/*     <span className="d-inline-block align-items-center text-sm-start text-center my-sm-0 my-2">
        <label className="form-label">Go to page:</label>
        <input
          type="number"
          value={activePage}
          min="1"
          max={totalPages}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) : 1
            changePage(page)
          }}
          className="form-control w-25 ms-1 d-inline-block"
        />
      </span> */}

      {/* Pagination controls */}
      <ul className="pagination pagination-rounded d-inline-flex ms-auto align-item-center mb-0">
        <li
          className={classNames("page-item", "previous", {
            disabled: activePage === 1,
          })}
          onClick={() => changePage(activePage - 1)}
        >
          <Link to="#" className="page-link">
            <i className="mdi mdi-chevron-left"></i>
          </Link>
        </li>

        {visiblePages.map((page) => (
          <li
            key={page}
            className={classNames("page-item", {
              active: activePage === page,
            })}
            onClick={() => changePage(page)}
          >
            <Link to="#" className="page-link">
              {page}
            </Link>
          </li>
        ))}

        <li
          className={classNames("page-item", "next", {
            disabled: activePage === totalPages,
          })}
          onClick={() => changePage(activePage + 1)}
        >
          <Link to="#" className="page-link">
            <i className="mdi mdi-chevron-right"></i>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
