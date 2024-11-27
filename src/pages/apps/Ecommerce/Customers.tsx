import React, { useState, useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import Table from "../../../components/Table"
import Pagination from "../../../components/Pagination"

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  location: string
  propertyType: string
  createdAt: string
  status: "active" | "inactive"
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([
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
      name: "Ajith",
      email: "ajith@example.com",
      phone: "1234567890",
      location: "New York",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 3,
      name: "Vishnu",
      email: "vishnu@example.com",
      phone: "1234567890",
      location: "New York",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "4567890123",
      location: "Houston",
      propertyType: "Industrial",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 5,
      name: "James Brown",
      email: "james.brown@example.com",
      phone: "5678901234",
      location: "Phoenix",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 6,
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      phone: "6789012345",
      location: "Philadelphia",
      propertyType: "Commercial",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 7,
      name: "David Martinez",
      email: "david.martinez@example.com",
      phone: "7890123456",
      location: "San Antonio",
      propertyType: "Industrial",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 8,
      name: "Linda Wilson",
      email: "linda.wilson@example.com",
      phone: "8901234567",
      location: "San Diego",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 9,
      name: "Robert Moore",
      email: "robert.moore@example.com",
      phone: "9012345678",
      location: "Dallas",
      propertyType: "Commercial",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 10,
      name: "Patricia Taylor",
      email: "patricia.taylor@example.com",
      phone: "1239876543",
      location: "San Jose",
      propertyType: "Industrial",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 11,
      name: "Daniel Anderson",
      email: "daniel.anderson@example.com",
      phone: "2348765432",
      location: "Austin",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 12,
      name: "Sarah Thomas",
      email: "sarah.thomas@example.com",
      phone: "3457654321",
      location: "Jacksonville",
      propertyType: "Commercial",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 13,
      name: "Joseph Jackson",
      email: "joseph.jackson@example.com",
      phone: "4566543210",
      location: "Fort Worth",
      propertyType: "Industrial",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 14,
      name: "Karen White",
      email: "karen.white@example.com",
      phone: "5675432109",
      location: "Columbus",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 15,
      name: "Brian Harris",
      email: "brian.harris@example.com",
      phone: "6784321098",
      location: "Charlotte",
      propertyType: "Commercial",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 16,
      name: "Nancy Clark",
      email: "nancy.clark@example.com",
      phone: "7893210987",
      location: "Detroit",
      propertyType: "Industrial",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 17,
      name: "William Lewis",
      email: "william.lewis@example.com",
      phone: "8902109876",
      location: "El Paso",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 18,
      name: "Megan Lee",
      email: "megan.lee@example.com",
      phone: "9011098765",
      location: "Seattle",
      propertyType: "Commercial",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 19,
      name: "Steven Walker",
      email: "steven.walker@example.com",
      phone: "1122334455",
      location: "Denver",
      propertyType: "Industrial",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 20,
      name: "Deborah Hall",
      email: "deborah.hall@example.com",
      phone: "2233445566",
      location: "Washington",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 21,
      name: "George Allen",
      email: "george.allen@example.com",
      phone: "3344556677",
      location: "Boston",
      propertyType: "Commercial",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 22,
      name: "Betty Young",
      email: "betty.young@example.com",
      phone: "4455667788",
      location: "Nashville",
      propertyType: "Industrial",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 23,
      name: "Edward King",
      email: "edward.king@example.com",
      phone: "5566778899",
      location: "Oklahoma City",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 24,
      name: "Rachel Scott",
      email: "rachel.scott@example.com",
      phone: "6677889900",
      location: "Portland",
      propertyType: "Commercial",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 25,
      name: "Matthew Adams",
      email: "matthew.adams@example.com",
      phone: "7788990011",
      location: "Las Vegas",
      propertyType: "Industrial",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 26,
      name: "Sophia Martin",
      email: "sophia.martin@example.com",
      phone: "8899001122",
      location: "Miami",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 27,
      name: "Ethan Thompson",
      email: "ethan.thompson@example.com",
      phone: "9900112233",
      location: "Atlanta",
      propertyType: "Commercial",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 28,
      name: "Isabella Garcia",
      email: "isabella.garcia@example.com",
      phone: "1011122233",
      location: "Orlando",
      propertyType: "Industrial",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 29,
      name: "Liam Rodriguez",
      email: "liam.rodriguez@example.com",
      phone: "1122334455",
      location: "Tampa",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 30,
      name: "Ava Martinez",
      email: "ava.martinez@example.com",
      phone: "2233445566",
      location: "San Francisco",
      propertyType: "Commercial",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 31,
      name: "Noah Hernandez",
      email: "noah.hernandez@example.com",
      phone: "3344556677",
      location: "Austin",
      propertyType: "Industrial",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 32,
      name: "Mason Lee",
      email: "mason.lee@example.com",
      phone: "4455667788",
      location: "Dallas",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 33,
      name: "Chloe Perez",
      email: "chloe.perez@example.com",
      phone: "5566778899",
      location: "Seattle",
      propertyType: "Commercial",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 34,
      name: "Oliver Clark",
      email: "oliver.clark@example.com",
      phone: "6677889900",
      location: "Chicago",
      propertyType: "Industrial",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 35,
      name: "Amelia Wright",
      email: "amelia.wright@example.com",
      phone: "7788990011",
      location: "Los Angeles",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 36,
      name: "Elijah Robinson",
      email: "elijah.robinson@example.com",
      phone: "8899001122",
      location: "New York",
      propertyType: "Commercial",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 37,
      name: "Jackie Adams",
      email: "jackie.adams@example.com",
      phone: "9900112233",
      location: "Miami",
      propertyType: "Industrial",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 38,
      name: "Harper Cooper",
      email: "harper.cooper@example.com",
      phone: "1011122233",
      location: "Philadelphia",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 39,
      name: "Lucas Scott",
      email: "lucas.scott@example.com",
      phone: "1122334455",
      location: "Chicago",
      propertyType: "Commercial",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 40,
      name: "Mila Young",
      email: "mila.young@example.com",
      phone: "2233445566",
      location: "San Antonio",
      propertyType: "Industrial",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 41,
      name: "Benjamin Walker",
      email: "benjamin.walker@example.com",
      phone: "3344556677",
      location: "Portland",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 42,
      name: "Lily King",
      email: "lily.king@example.com",
      phone: "4455667788",
      location: "Houston",
      propertyType: "Commercial",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 43,
      name: "David Baker",
      email: "david.baker@example.com",
      phone: "5566778899",
      location: "Washington",
      propertyType: "Industrial",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 44,
      name: "Zoe Harris",
      email: "zoe.harris@example.com",
      phone: "6677889900",
      location: "Columbus",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 45,
      name: "Samuel Nelson",
      email: "samuel.nelson@example.com",
      phone: "7788990011",
      location: "Phoenix",
      propertyType: "Commercial",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 46,
      name: "Ella Moore",
      email: "ella.moore@example.com",
      phone: "8899001122",
      location: "San Francisco",
      propertyType: "Industrial",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
    {
      id: 47,
      name: "David Walker",
      email: "david.walker@example.com",
      phone: "9900112233",
      location: "Seattle",
      propertyType: "Residential",
      createdAt: new Date().toLocaleString(),
      status: "inactive",
    },
    {
      id: 48,
      name: "Charlotte Green",
      email: "charlotte.green@example.com",
      phone: "1011122233",
      location: "Las Vegas",
      propertyType: "Commercial",
      createdAt: new Date().toLocaleString(),
      status: "active",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [customerToEdit, setCustomerToEdit] = useState<Customer | null>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5) // Dynamic page size
  const [searchQuery, setSearchQuery] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null
  )

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery) ||
      customer.phone.includes(searchQuery) ||
      customer.location.toLowerCase().includes(searchQuery) ||
      customer.status.toLowerCase().includes(searchQuery)
    )
  })

  useEffect(() => {
    const totalPages = Math.ceil(filteredCustomers.length / pageSize)
    if (page > totalPages) {
      setPage(totalPages) // Move to the last page if current page exceeds total pages
    }
  }, [filteredCustomers, pageSize, page])

  const handleAddCustomer = (
    newCustomer: Omit<Customer, "id" | "createdAt">
  ) => {
    let updatedCustomers: Customer[]

    if (customerToEdit) {
      // Update the customer at the correct position (replacing existing)
      updatedCustomers = customers.map((customer) =>
        customer.id === customerToEdit.id
          ? { ...customer, ...newCustomer }
          : customer
      )
    } else {
      // Add a new customer at the top
      const id = customers.length + 1
      const createdAt = new Date().toLocaleString()
      const customerWithId = { id, createdAt, ...newCustomer }
      updatedCustomers = [customerWithId, ...customers] // Add to the top
    }

    // Update customers state
    setCustomers(updatedCustomers)

    // Reset modal
    setShowModal(false)
    setCustomerToEdit(null)
  }

  const handleEdit = (customer: Customer) => {
    setCustomerToEdit(customer)
    setShowModal(true)
  }

  const handleDelete = (customer: Customer) => {
    setCustomerToDelete(customer)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    if (customerToDelete) {
      const updatedCustomers = customers.filter(
        (customer) => customer.id !== customerToDelete.id
      )
      setCustomers(updatedCustomers)
      setShowDeleteConfirm(false)
      setCustomerToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setCustomerToDelete(null)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize)
    setPage(1) // Reset to first page when page size changes
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase())
    setPage(1) // Reset to the first page when search query changes
  }

  const totalCustomers = filteredCustomers.length
  const totalPages = Math.ceil(totalCustomers / pageSize)
  const currentCustomers = filteredCustomers.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  return (
    <div>
      <h2>Customers</h2>

      {/* Search Bar */}
      <Form.Control
        type="text"
        placeholder="Search customers..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-3"
        style={{ maxWidth: "300px" }}
      />

      {/* Add Customer Button */}
      <Button
        variant="primary"
        onClick={() => setShowModal(true)}
        className="mb-3"
      >
        Add Customer
      </Button>

      {/* Customer Table */}
      <Table
        columns={[
          { Header: "Name", accessor: "name" },
          { Header: "Email", accessor: "email" },
          { Header: "Phone", accessor: "phone" },
          { Header: "Location", accessor: "location" },
          { Header: "Property Type", accessor: "propertyType" },
          { Header: "Created At", accessor: "createdAt" },
          {
            Header: "Status",
            accessor: "status",
            Cell: ({ value }: { value: string }) => (
              <span
                className={value === "active" ? "text-success" : "text-danger"}
              >
                {value}
              </span>
            ),
          },
          {
            Header: "Actions",
            accessor: "action",
            Cell: ({ row }: { row: any }) => (
              <>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(row.original)}
                  className="me-2"
                  title="Edit Customer"
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(row.original)}
                  title="Delete Customer"
                >
                  <FaTrashAlt />
                </Button>
              </>
            ),
          },
        ]}
        data={currentCustomers}
      />

      {/* Pagination Component */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        sizePerPage={pageSize}
        sizePerPageList={[
          { text: "2 Rows", value: 2 },
          { text: "5 Rows", value: 5 },
          { text: "10 Rows", value: 10 },
        ]}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* Add/Update Customer Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {customerToEdit ? "Update Customer" : "Add Customer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault()

              const form = e.target as HTMLFormElement
              const name = (form.elements.namedItem("name") as HTMLInputElement)
                .value
              const email = (
                form.elements.namedItem("email") as HTMLInputElement
              ).value
              const phone = (
                form.elements.namedItem("phone") as HTMLInputElement
              ).value
              const location = (
                form.elements.namedItem("location") as HTMLInputElement
              ).value
              const propertyType = (
                form.elements.namedItem("propertyType") as HTMLInputElement
              ).value
              const status = (
                form.elements.namedItem("status") as HTMLSelectElement
              ).value as "active" | "inactive" // Type cast to ensure correct type

              handleAddCustomer({
                name,
                email,
                phone,
                location,
                propertyType,
                status,
              })
            }}
          >
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={customerToEdit?.name || ""}
                name="name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={customerToEdit?.email || ""}
                name="email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                defaultValue={customerToEdit?.phone || ""}
                name="phone"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                defaultValue={customerToEdit?.location || ""}
                name="location"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPropertyType">
              <Form.Label>Property Type</Form.Label>
              <Form.Control
                type="text"
                defaultValue={customerToEdit?.propertyType || ""}
                name="propertyType"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                defaultValue={customerToEdit?.status || "active"}
                name="status"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              {customerToEdit ? "Update Customer" : "Add Customer"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this customer?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Customers
