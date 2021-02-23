import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoanForm = props => {
  const { handleChange, handleSubmit } = props
  // const [createdId, setCreatedId] = useState(null)

  return (
    <div className="loan-form ml-auto" style={{ display: 'inline', marginRight: '20px' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicPickUpDate">
          <Form.Label>Pickup Date</Form.Label>
          <Form.Control
            type="date"
            name="pickup_date"
            placeholder="YYYY-MM-DD"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDropOffDate">
          <Form.Label>Dropoff Date</Form.Label>
          <Form.Control
            type="date"
            name="dropoff_date"
            placeholder="YYYY-MM-DD"
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
        >
          Rent it!
        </Button>
      </Form>
    </div>
  )
}

export default LoanForm
