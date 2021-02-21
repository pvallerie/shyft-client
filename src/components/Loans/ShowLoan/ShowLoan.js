import React, { useState, useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

// import LoanForm from '../LoanForm/LoanForm'

import { showLoan } from '../../../api/loans'

const ShowLoan = props => {
  const { user, match, msgAlert } = props
  const [loan, setLoan] = useState({
    pickup_date: null,
    bike: {
      name: null
    }
  })

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

  return (
    <Fragment>
      {loanJsx}
      <Button
        variant="primary"
        type="button"
        onClick={console.log('edit loan')}
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
