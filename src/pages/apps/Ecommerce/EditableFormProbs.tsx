import React, { useState } from "react"

interface EditableFormProps {
  initialData: { [key: string]: string }
  onSave: (updatedData: { [key: string]: string }) => void
}

const EditableForm: React.FC<EditableFormProps> = ({ initialData, onSave }) => {
  // State to manage whether the form is in edit mode
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] =
    useState<{ [key: string]: string }>(initialData)

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle save
  const handleSave = () => {
    onSave(formData) // Pass updated data to the parent component
    setIsEditing(false) // Switch back to non-edit mode
  }

  // Handle edit toggle
  const handleEdit = () => {
    setIsEditing(true)
  }

  return (
    <div>
      {isEditing ? (
        <div>
          {/* Editable fields */}
          {Object.keys(initialData).map((key) => (
            <div key={key}>
              <label>{key}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
              />
            </div>
          ))}
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          {/* Non-editable view */}
          {Object.keys(initialData).map((key) => (
            <div key={key}>
              <label>{key}</label>
              <span>{formData[key]}</span>
            </div>
          ))}
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  )
}

export default EditableForm
