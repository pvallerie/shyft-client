import React, { useState, useEffect, Fragment } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

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
      <div>You have not rented any bikes yet! Click <a href={'#/index-all-bikes'}>here</a> to check some out.</div>
    )
  } else {
    loansJsx = userLoans.map(loan => (
      <Card key={loan.id} className='content-bg loan-cards' style={{ border: '1px solid #cbcbcb', margin: '10px', padding: '10px', width: '100%', marginTop: '10px' }}>
        <Card.Body>
          <Card.Title>Loan for {loan.bike.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Owner: {loan.bike.owner.email}</Card.Subtitle>
          <ListGroup className="list-group-flush">
            <ListGroupItem style={{ backgroundColor: 'transparent' }}>Pickup Date: {loan.pickup_date}</ListGroupItem>
            <ListGroupItem style={{ backgroundColor: 'transparent' }}>Dropoff Date: {loan.dropoff_date}</ListGroupItem>
            <ListGroupItem style={{ backgroundColor: 'transparent' }}>Location: {loan.location}</ListGroupItem>
          </ListGroup>
          <div className='row' style={{ fontSize: '16px', marginTop: '15px', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
            <Card.Link style={{ display: 'inline' }} href={`#loans/${loan.id}`}>See Details</Card.Link>
          </div>
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
