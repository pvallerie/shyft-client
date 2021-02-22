import React, { useState, useEffect, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { showLoan, updateLoan } from '../../../api/loans'

const ShowLoan = props => {
  const { user, match, msgAlert } = props
  const [loan, setLoan] = useState({
    pickup_date: null,
    bike: {
      name: null
    }
  })
  const [loanInfo, setLoanInfo] = useState({
    pickup_date: '',
    dropoff_date: ''
  })
  const [showEditLoanForm, setShowEditLoanForm] = useState(false)
  const [loanUpdated, setLoanUpdated] = useState(false)

  useEffect(() => {
    showLoan(match.params.id, user)
      .then(res => {
        setLoan(res.data.loan)
        return res
      })
      .then(res => msgAlert({
        heading: 'Retrieved Loan Successfully',
        message: `Now displaying ${res.data.bike.name}`,
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
      .then(res => setLoanUpdated(true))
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

  const loanJsx = (
    <div>
      <p>Bike: {loan.bike.name}</p>
      <p>Pickup date: {loan.pickup_date}</p>
      <p>Dropoff date: {loan.dropoff_date}</p>
    </div>
  )

  if (!loan) {
    return (
      'loading...'
    )
  }

  if (loanUpdated) {
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
        onClick={console.log('delete loan')}
      >
        Delete Loan
      </Button>
    </Fragment>
  )
}

export default withRouter(ShowLoan)
