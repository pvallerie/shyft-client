import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import '../../../index.scss'

const BikeForm = props => {
  const { handleSubmit, handleChange } = props
  const [showBikeFormModal, setShowBikeFormModal] = useState(true)
  const [backToUserBikesIndex, setBackToUserBikesIndex] = useState(false)

  const handleCloseModal = () => {
    setShowBikeFormModal(false)
    setBackToUserBikesIndex(true)
  }

  if (backToUserBikesIndex) {
    return (
      <Redirect to={'/index-user-bikes'} />
    )
  }

  return (
    <Modal
      show={showBikeFormModal}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header style={{ color: '$primary', backgroundColor: '$primary' }} closeButton>
        <Modal.Title>Add a Bike</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#f3e9d2' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              name="type"
              placeholder="Type"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicSize">
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="text"
              name="size"
              placeholder="Size"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicRate">
            <Form.Label>Rate</Form.Label>
            <Form.Control
              type="text"
              name="rate"
              placeholder="Rate"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicSize">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              placeholder="Location"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="secondary" onClick={handleCloseModal}>
              Close
          </Button>
          <Button
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default BikeForm
