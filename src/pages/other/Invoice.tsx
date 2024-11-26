import React, { useState, useEffect } from "react"
import { Row, Col, Card } from "react-bootstrap"
import PageTitle from "../../components/PageTitle"

interface InvoiceData {
  customerName: string
  customerAddress: string
  customerPhone: string
  date: string
  quotationNo: string
  items: {
    name: string
    model: string
    price: number
    quantity: number
    discountPrice: number
  }[]
  transportLabor: number
  total: number
}

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)

  useEffect(() => {
    // Simulate fetching data (dummy data as per your image)
    const dummyData: InvoiceData = {
      customerName: "Mr. Saravanan",
      customerAddress: "Vellaripatti, Tamil Nadu",
      customerPhone: "9952403906",
      date: "14-09-2024",
      quotationNo: "Q-1224",
      items: [
        {
          name: "60 Watts all in one Solar Street Light",
          model: "ACE-SR-60W",
          price: 5400,
          quantity: 1,
          discountPrice: 3780,
        },
        {
          name: "100 Watts Butterfly model street Light",
          model: "ACE-MX-100W",
          price: 8000,
          quantity: 1,
          discountPrice: 5600,
        },
        {
          name: "150 Watts Butterfly model street Light",
          model: "ACE-MX-150W",
          price: 12000,
          quantity: 1,
          discountPrice: 8400,
        },
        {
          name: "200 Watts Butterfly model street Light",
          model: "ACE-MX-200W",
          price: 15000,
          quantity: 1,
          discountPrice: 10500,
        },
        {
          name: "100 Watts Flood Light",
          model: "S01-100W",
          price: 8000,
          quantity: 1,
          discountPrice: 5600,
        },
      ],
      transportLabor: 8000,
      total: 41880,
    }

    setInvoiceData(dummyData)
  }, [])

  if (!invoiceData) return <p>Loading...</p>

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[{ label: "Invoice", path: "/invoice", active: true }]}
        title={"Invoice"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="clearfix">
                <div className="float-start">
                  <div className="auth-logo">
                    <span className="logo-lg">
                      <img src="/logo.png" alt="Logo" height="50" />
                    </span>
                  </div>
                </div>
                <div className="float-end">
                  <h4 className="m-0 d-print-none">Invoice</h4>
                  <p>
                    Quotation No: <b>{invoiceData.quotationNo}</b>
                  </p>
                  <p>
                    Date: <b>{invoiceData.date}</b>
                  </p>
                </div>
              </div>

              <Row>
                <Col md={6}>
                  <div className="mt-3">
                    <p>
                      <b>Customer Name:</b> {invoiceData.customerName}
                    </p>
                    <p className="text-muted">{invoiceData.customerAddress}</p>
                    <p>
                      <b>Phone:</b> {invoiceData.customerPhone}
                    </p>
                  </div>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col xs={12}>
                  <div className="table-responsive">
                    <table className="table mt-4 table-centered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Item</th>
                          <th>Model</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Discount Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceData.items.map((item, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.model}</td>
                            <td>₹{item.price.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.discountPrice.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm={6}>
                  <h6>Notes:</h6>
                  <small className="text-muted">
                    Digging pit, civil work, and patchwork will be in the
                    customer's scope.
                  </small>
                </Col>
                <Col sm={6}>
                  <div className="float-end">
                    <p>
                      <b>Transport and Labor:</b>{" "}
                      <span className="float-end">
                        ₹{invoiceData.transportLabor.toFixed(2)}
                      </span>
                    </p>
                    <h3>
                      <b>Total:</b> ₹{invoiceData.total.toFixed(2)}
                    </h3>
                  </div>
                </Col>
              </Row>

              <div className="mt-4 mb-1 text-end d-print-none">
                <button
                  className="btn btn-primary waves-effect waves-light me-1"
                  onClick={() => window.print()}
                >
                  <i className="mdi mdi-printer me-1"></i> Print
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Invoice
