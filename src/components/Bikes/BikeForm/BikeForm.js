import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import '../../../index.scss'

const BikeForm = props => {
  const { handleSubmit, handleChange, bike, showBikeFormModal, setShowBikeFormModal, handleCloseModal, formTitle } = props
  // const [showBikeFormModal, setShowBikeFormModal] = useState(true)
  const [backToPrevPage, setBackToPrevPage] = useState(false)

  const swapShowBikeFormModalToFalse = () => {
    setShowBikeFormModal(false)
  }

  if (backToPrevPage) {
    if (formTitle === 'Add Bike') {
      return (
        <Redirect to={'/index-user-bikes'} />
      )
    } else {
      return (
        <Redirect to={`/bikes/${bike.id}`} />
      )
    }
  }

  return (
    <Modal
      show={showBikeFormModal}
      onHide={() => {
        setBackToPrevPage(true)
        swapShowBikeFormModalToFalse()
      }}
      backdrop="static"
      keyboard={false}
      style={{ borderRadiusBottom: 'calc(0.25rem - 1px)' }}
    >
      <Modal.Header style={{ color: '$primary', backgroundColor: '$primary' }} closeButton>
        <Modal.Title>{formTitle}</Modal.Title>
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

          <Form.Group controlId="formBasicLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              placeholder="Location"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              img="true"
              type="text"
              name="image"
              placeholder="Link to image"
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
