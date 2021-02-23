import React, { useState, useEffect, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'

import { showLoan, updateLoan, deleteLoan } from '../../../api/loans'

const ShowLoan = props => {
  const { user, match, msgAlert } = props
  const [loan, setLoan] = useState({
    pickup_date: null,
    bike: {
      name: null,
      owner: {
        email: ''
      }
    }
  })
  const [loanInfo, setLoanInfo] = useState({
    pickup_date: '',
    dropoff_date: ''
  })
  const [showEditLoanForm, setShowEditLoanForm] = useState(false)
  const [loanUpdatedOrDeleted, setLoanUpdatedOrDeleted] = useState(false)

  useEffect(() => {
    showLoan(match.params.id, user)
      .then(res => {
        setLoan(res.data.loan)
        return res
      })
      .then(res => {
        console.log('this is res:', res)
        return res
      })
      .then(res => msgAlert({
        heading: 'Retrieved Loan Successfully',
        message: `Now displaying ${res.data.loan.name}`,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed to Retrieve Loan',
        message: `Failed to Retrieve with error: ${error.message}`,
        variant: 'danger'
      }))
  }, [])

  const handleChange = event => {
    event.persist()

    setLoanInfo(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const editLoan = Object.assign({}, prevState, updatedField)
      return editLoan
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    updateLoan(loanInfo, user, loan.id)
      .then(res => setLoanUpdatedOrDeleted(true))
      .then(() => msgAlert({
        heading: 'Bike Rented Successfully',
        message: 'Your changes have been updated successfully.',
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed to Update Loan',
        message: `Failed to update loan with error: ${error.message}`,
        variant: 'danger'
      }))
  }

  const deleteThisLoan = () => {
    deleteLoan(loan.id, user)
      .then(() => setLoanUpdatedOrDeleted(true))
      .then(res => msgAlert({
        heading: 'Deleted Loan Successfully',
        message: `Loan for ${loan.bike.name} has been successfully deleted.`,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed to Delete Bike',
        message: `Failed to delete with error: ${error.message}`,
        variant: 'danger'
      }))
  }

  const loanJsx = (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <img src={loan.bike.image} alt={loan.bike.name} style={{ height: '350px', borderRadius: 'calc(0.25rem - 1px)' }}></img>
      <Card style={{ width: '100%', marginTop: '5px', backgroundColor: '#f5ebd5' }}>
        <Card.Body>
          <Card.Title>{loan.bike.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Owner: {loan.bike.owner.email}</Card.Subtitle>
          <Card.Text>{loan.bike.type}</Card.Text>
          <Card.Text>{loan.bike.size}</Card.Text>
          <Card.Text>{loan.bike.rate}</Card.Text>
          <Card.Text>{loan.bike.location}</Card.Text>
          <div className="loan-form" style={{ borderRadius: 'calc(0.25rem - 1px)', border: '1px grey solid' }}>
            <Card.Text>Pickup: {loan.pickup_date}</Card.Text>
            <Card.Text>Dropoff: {loan.dropoff_date}</Card.Text>
          </div>
          <div style={{ marginTop: '10px' }}>
            <Button
              variant="primary"
              type="button"
              onClick={() => setShowEditLoanForm(true)}
            >
              Edit Loan
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={deleteThisLoan}
              style={{ marginLeft: '10px' }}
            >
              Delete Loan
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  )

  if (!loan) {
    return (
      'loading...'
    )
  }

  if (loanUpdatedOrDeleted) {
    return <Redirect to={'/index-user-loans'} />
  }

  if (showEditLoanForm) {
    return (
      <Fragment>
        {loanJsx}
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
            Submit Changes
          </Button>
        </Form>
      </Fragment>
    )
  }

  return (
    <Fragment>
      {loanJsx}
    </Fragment>
  )
}

export default withRouter(ShowLoan)
