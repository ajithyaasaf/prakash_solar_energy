import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button, Form } from "react-bootstrap"
import FormInput from "./ExambleForm" // Assuming this is the correct import for FormInput

interface AddCustomerProps {
  onAddCustomer: (data: any) => void
  existingCustomer: any | null
  setCustomerToEdit: (customer: any | null) => void
}

const AddCustomer = ({
  onAddCustomer,
  existingCustomer,
  setCustomerToEdit,
}: AddCustomerProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (existingCustomer) {
      reset(existingCustomer)
    } else {
      reset({
        name: "",
        email: "",
        phone: "",
        location: "",
        propertyType: "Residential",
        status: "active",
      })
    }
  }, [existingCustomer, reset])

  const onSubmit = (data: any) => {
    onAddCustomer(data)
    reset({
      name: "",
      email: "",
      phone: "",
      location: "",
      propertyType: "Residential",
      status: "active",
    })
    setCustomerToEdit(null)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Name"
        name="name"
        placeholder="Enter customer name"
        type="text"
        register={register}
        errors={errors}
        containerClass="mb-3"
        validation={{
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Name must be at least 3 characters",
          },
        }}
      />
      <FormInput
        label="Email"
        name="email"
        placeholder="Enter customer email"
        type="email"
        register={register}
        errors={errors}
        containerClass="mb-3"
        validation={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        }}
      />
      <FormInput
        label="Phone"
        name="phone"
        placeholder="Enter customer phone"
        type="text"
        register={register}
        errors={errors}
        containerClass="mb-3"
        validation={{
          required: "Phone number is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Phone number must be 10 digits",
          },
        }}
      />
      <FormInput
        label="Location"
        name="location"
        placeholder="Enter customer location"
        type="text"
        register={register}
        errors={errors}
        containerClass="mb-3"
        validation={{
          required: "Location is required",
        }}
      />
      <Form.Group className="mb-3">
        <Form.Label>Property Type</Form.Label>
        <Form.Select
          {...register("propertyType", {
            required: "Property type is required",
          })}
        >
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Industrial">Industrial</option>
        </Form.Select>
        {errors.propertyType && (
          <p className="text-danger">{errors.propertyType.message}</p>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select
          {...register("status", { required: "Status is required" })}
        >
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </Form.Select>
        {errors.status && (
          <p className="text-danger">{errors.status.message}</p>
        )}
      </Form.Group>
      <Button type="submit" variant="primary">
        {existingCustomer ? "Update Customer" : "Add Customer"}
      </Button>
    </Form>
  )
}

export default AddCustomer
