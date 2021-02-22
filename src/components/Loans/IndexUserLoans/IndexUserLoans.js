import React, { useState, useEffect, Fragment } from 'react'
import Card from 'react-bootstrap/Card'

import { indexAllLoans } from '../../../api/loans'

const IndexUserLoans = props => {
  const { user, msgAlert } = props
  const [userLoans, setUserLoans] = useState([])
  const [loansLoaded, setLoansLoaded] = useState(false)

  useEffect(() => {
    indexAllLoans(user)
      .then(res => {
        const loans = res.data
        const filteredLoans = loans.filter(loan => loan.bike_loaner === user.id)
        setUserLoans(filteredLoans)
      })
      .then(() => setLoansLoaded(true))
      .then(() => msgAlert({
        heading: 'Retrieved Loans Successfully',
        message: 'All loans are currently displayed',
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed to Retrieve Loans',
        message: `Failed to retrieve with error: ${error.message}`,
        variant: 'danger'
      }))
  }, [])

  let loansJsx

  if (loansLoaded === true && userLoans.length === 0) {
    loansJsx = (
      <div>You have not rented any bikes yet! Click <a href={'#bikes/'}>here</a> to check some out.</div>
    )
  } else {
    loansJsx = userLoans.map(loan => (
      <Card key={loan.id} className='content-bg' style={{ border: '1px solid #cbcbcb', margin: '10px', padding: '10px', width: '100%', marginTop: '10px' }}>
        <Card.Body>
          <Card.Title>Loan for {loan.bike.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Owner: {loan.bike.owner.email}</Card.Subtitle>
          <Card.Text>Pick-up Date: {loan.pickup_date}</Card.Text>
          <Card.Text>Drop-off Date: {loan.dropoff_date}</Card.Text>
          <Card.Text>Location: {loan.bike.location}</Card.Text>
          <Card.Link href={`#loans/${loan.id}`}>See Details</Card.Link>
        </Card.Body>
      </Card>
    ))
  }
  return (
    <Fragment>
      {loansJsx}
    </Fragment>
  )
}

export default IndexUserLoans
