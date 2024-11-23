import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Row, Col, Card, Button } from "react-bootstrap"

// components
import PageTitle from "../../../components/PageTitle"

// dummy data
import { products as data, ProductItemTypes } from "./data"

// main component
const Products = () => {
  const [products, setProducts] = useState<Array<ProductItemTypes>>(data)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12 // Set to 12 products per page

  // Function to paginate the products based on current page
  const paginateProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return products.slice(startIndex, endIndex)
  }

  // Function to change the page
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0) // Scroll to the top of the page when the page changes
  }

  // Function to search products by name
  const searchProduct = (value: string) => {
    if (value === "") setProducts(data)
    else {
      const modifiedProducts = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
      setProducts(modifiedProducts)
    }
  }

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage)

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Ecommerce", path: "/apps/ecommerce/products" },
          { label: "Products", path: "/apps/ecommerce", active: true },
        ]}
        title={"Products"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row className="justify-content-between">
                <Col className="col-auto">
                  <form className="d-flex flex-wrap align-items-center">
                    <label htmlFor="inputPassword2" className="visually-hidden">
                      Search
                    </label>
                    <div className="me-3">
                      <input
                        type="search"
                        className="form-control my-1 my-lg-0"
                        id="inputPassword2"
                        placeholder="Search..."
                        onChange={(e: any) => searchProduct(e.target.value)}
                      />
                    </div>
                    <label htmlFor="status-select" className="me-2">
                      Sort By
                    </label>
                    <div className="me-sm-3">
                      <select
                        className="form-select my-1 my-lg-0"
                        id="status-select"
                      >
                        <option defaultValue="all">All</option>
                        <option value="popular">Popular</option>
                        <option value="pricelow">Price Low</option>
                        <option value="pricehigh">Price High</option>
                        <option value="soldout">Sold Out</option>
                      </select>
                    </div>
                  </form>
                </Col>

                <Col className="col-auto">
                  <div className="text-lg-end my-1 my-lg-0">
                    <Button className="btn btn-success waves-effect waves-light me-1">
                      <i className="mdi mdi-cog"></i>
                    </Button>

                    <Link
                      to="/apps/ecommerce/edit-product" // Redirects to ProductEdit component
                      className="btn btn-danger waves-effect waves-light"
                    >
                      <i className="mdi mdi-plus-circle me-1"></i> Add New
                    </Link>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {paginateProducts().map((product, index) => (
          <Col key={index} md={6} xl={3}>
            <Card className="product-box">
              <Card.Body>
                <div className="product-action">
                  <Link
                    to="#"
                    className="btn btn-success btn-xs waves-effect waves-light me-1"
                  >
                    <i className="mdi mdi-pencil"></i>
                  </Link>
                  <Link
                    to="#"
                    className="btn btn-danger btn-xs waves-effect waves-light"
                  >
                    <i className="mdi mdi-close"></i>
                  </Link>
                </div>

                <div className="bg-light">
                  <img src={product.image} alt="" className="img-fluid" />
                </div>

                <div className="product-info">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="font-16 mt-0 sp-line-1">
                        <Link
                          to="/apps/ecommerce/product-details"
                          className="text-dark"
                        >
                          {product.name}
                        </Link>
                      </h5>
                      <div className="text-warning mb-2 font-13">
                        <i className="fa fa-star me-1"></i>
                        <i className="fa fa-star me-1"></i>
                        <i className="fa fa-star me-1"></i>
                        <i className="fa fa-star me-1"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <h5 className="m-0">
                        <span className="text-muted">
                          Stocks : {product.quantity} pcs
                        </span>
                      </h5>
                    </div>
                    <div className="col-auto">
                      <div className="product-price-tag">${product.price}</div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Row>
        <Col>
          <ul className="pagination pagination-rounded justify-content-end mb-3">
            <li className="page-item">
              <Link
                className="page-link"
                to="#"
                aria-label="Previous"
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
              >
                <span aria-hidden="true">«</span>
                <span className="visually-hidden">Previous</span>
              </Link>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <Link
                  className="page-link"
                  to="#"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Link>
              </li>
            ))}
            <li className="page-item">
              <Link
                className="page-link"
                to="#"
                aria-label="Next"
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
              >
                <span aria-hidden="true">»</span>
                <span className="visually-hidden">Next</span>
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Products
