import React, { useState } from "react"
import Table from "../../../components/Table"
import AddCustomer from "./AddCustomer"
import { Modal, Button } from "react-bootstrap"

const Customers = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      location: "New York",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "0987654321",
      location: "Los Angeles",
      propertyType: "Commercial",
      createdAt: new Date().toLocaleString(),
      status: "blocked",
    },
  ])

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState<number | null>(null)
  const [customerToEdit, setCustomerToEdit] = useState<any | null>(null)

  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Location", accessor: "location" }, // New Field
    { Header: "Property Type", accessor: "propertyType" },
    { Header: "Created At", accessor: "createdAt" },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }: { value: string }) => (
        <span className={value === "active" ? "text-success" : "text-danger"}>
          {value}
        </span>
      ),
    },
  ]

  const handleAddCustomer = (newCustomer: any) => {
    if (customerToEdit) {
      setCustomers(
        customers.map((customer) =>
          customer.id === customerToEdit.id
            ? { ...customer, ...newCustomer }
            : customer
        )
      )
      setCustomerToEdit(null)
    } else {
      const id = customers.length + 1
      const createdAt = new Date().toLocaleString()
      setCustomers([...customers, { id, createdAt, ...newCustomer }])
    }
  }

  const handleEdit = (id: number) => {
    const customerToEdit = customers.find((customer) => customer.id === id)
    if (customerToEdit) {
      setCustomerToEdit(customerToEdit)
    }
  }

  const handleDelete = () => {
    if (customerToDelete !== null) {
      setCustomers(
        customers.filter((customer) => customer.id !== customerToDelete)
      )
      setShowDeleteModal(false)
    }
  }

  const openDeleteModal = (id: number) => {
    setCustomerToDelete(id)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setCustomerToDelete(null)
  }

  return (
    <div>
      <h2>Customers</h2>
      <AddCustomer
        onAddCustomer={handleAddCustomer}
        existingCustomer={customerToEdit}
        setCustomerToEdit={setCustomerToEdit}
      />
      <Table
        columns={columns}
        data={customers}
        isSearchable
        isSortable
        pagination
        pageSize={5}
        onEdit={handleEdit}
        onDelete={openDeleteModal}
      />

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this customer?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Customers
