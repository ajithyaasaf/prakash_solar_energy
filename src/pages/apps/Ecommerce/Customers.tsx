import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Row, Col, Card, Button } from "react-bootstrap"
import classNames from "classnames"
import * as XLSX from "xlsx"

// components
import PageTitle from "../../../components/PageTitle"
import Table from "../../../components/Table"
import AddCustomer from "../CRM/Customers/AddCustomer" // Ensure the path to AddCustomer is correct

// dummy data
import { customers } from "../CRM/Customers/data"

/* name column render */
const NameColumn = ({ row }: { row: any }) => {
  return (
    <div className="table-user">
      <img src={row.original.avatar} alt="" className="me-2 rounded-circle" />
      <Link to="#" className="text-body fw-semibold">
        {row.original.name}
      </Link>
    </div>
  )
}

/* status column render */
const StatusColumn = ({ row }: { row: any }) => {
  return (
    <React.Fragment>
      <span
        className={classNames("badge", {
          "bg-soft-success text-success": row.original.status === "Active",
          "bg-soft-danger text-danger": row.original.status === "Blocked",
        })}
      >
        {row.original.status}
      </span>
    </React.Fragment>
  )
}

/* action column render */
const ActionColumn = ({ row }: { row: any }) => {
  const handleEdit = (customerId: string) => {
    alert(`Edit customer with ID: ${customerId}`)
    // Implement edit logic here
  }

  const handleDelete = (customerId: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete customer with ID: ${customerId}?`
      )
    ) {
      alert(`Customer with ID: ${customerId} deleted`)
      // Implement delete logic here
    }
  }

  return (
    <React.Fragment>
      <Link
        to="#"
        className="action-icon"
        onClick={() => handleEdit(row.original.id)}
      >
        <i className="mdi mdi-square-edit-outline"></i>
      </Link>
      <Link
        to="#"
        className="action-icon"
        onClick={() => handleDelete(row.original.id)}
      >
        <i className="mdi mdi-delete"></i>
      </Link>
    </React.Fragment>
  )
}

const columns = [
  {
    Header: "Customer",
    accessor: "name",
    sort: true,
    Cell: NameColumn,
    classes: "table-user",
  },
  {
    Header: "Phone",
    accessor: "phone",
    sort: false,
  },
  {
    Header: "Email",
    accessor: "email",
    sort: false,
  },
  {
    Header: "Location",
    accessor: "location",
    sort: false,
  },
  {
    Header: "Create Date",
    accessor: "created_on",
    sort: false,
  },
  {
    Header: "Status",
    accessor: "status",
    sort: false,
    Cell: StatusColumn,
  },
  {
    Header: "Action",
    accessor: "action",
    sort: false,
    classes: "table-action",
    Cell: ActionColumn,
  },
]

// Export data as an Excel file with custom headers
const exportToExcel = (data: any[]) => {
  // Prepare the data for export with custom headers
  const exportData = data.map((customer) => ({
    Customer: customer.name,
    Phone: customer.phone,
    Email: customer.email,
    Location: customer.location,
    "Create Date": customer.created_on,
    Status: customer.status,
  }))

  // Define headers explicitly for the columns
  const ws = XLSX.utils.json_to_sheet(exportData, {
    header: ["Customer", "Phone", "Email", "Location", "Create Date", "Status"], // Custom header names
  })

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Customers")

  // Write to Excel file and trigger download
  XLSX.writeFile(wb, "customers.xlsx")
}

// main component
const Customers = () => {
  /*
   *   modal handling
   */
  const [show, setShow] = useState<boolean>(false)
  const onCloseModal = () => setShow(false)
  const onOpenModal = () => setShow(true)

  /*
   *   handle form submission
   */
  const onSubmit = (data: any) => {
    console.log("Customer Data Submitted:", data) // Here you can handle the customer data (e.g., save it)
    onCloseModal()
  }

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "CRM", path: "/apps/crm/customers" },
          { label: "Customers", path: "/apps/crm/customers", active: true },
        ]}
        title={"Customers"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row className="mb-2">
                <Col sm={4}>
                  <Button
                    variant="danger"
                    className="waves-effect waves-light"
                    onClick={onOpenModal}
                  >
                    <i className="mdi mdi-plus-circle me-1"></i> Add Customer
                  </Button>
                </Col>

                <Col sm={8}>
                  <div className="text-sm-end mt-2 mt-sm-0">
                    {/* Commented out the settings and import buttons */}
                    {/* <Button className="btn btn-success mb-2 me-1">
                      <i className="mdi mdi-cog"></i>
                    </Button>
                    <Button className="btn btn-light mb-2 me-1">Import</Button> */}
                    <Button
                      className="btn btn-light mb-2"
                      onClick={() => exportToExcel(customers)}
                    >
                      Export
                    </Button>
                  </div>
                </Col>
              </Row>

              <Table
                columns={columns}
                data={customers}
                pageSize={12}
                isSortable={true}
                pagination={true}
                isSelectable={true}
                tableClass="table-nowrap table-striped"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Customer Modal */}
      <AddCustomer show={show} onHide={onCloseModal} onSubmit={onSubmit} />
    </React.Fragment>
  )
}

export default Customers
