import React, { useState, useEffect, Fragment } from 'react'
import Card from 'react-bootstrap/Card'

import { indexAllLoans } from '../../../api/loans'

const IndexUserLoans = props => {
  const { user, msgAlert } = props
  const [userLoans, setUserLoans] = useState([])

  useEffect(() => {
    indexAllLoans(user)
      .then(res => {
        const loans = res.data
        const filteredLoans = loans.filter(loan => loan.bike_loaner === user.id)
        setUserLoans(filteredLoans)
      })
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

  const loansJsx = userLoans.map(loan => (
    <Card key={loan.id} className='content-bg' style={{ border: '1px solid #cbcbcb', margin: '10px', padding: '10px', width: '100%', marginTop: '10px' }}>
      <Card.Body>
        <Card.Title>Loan for {loan.bike.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Owner: {loan.bike.owner.email}</Card.Subtitle>
        <Card.Text>Pick-up Date: {loan.pickup_date}</Card.Text>
        <Card.Text>Drop-off Date: {loan.dropoff_date}</Card.Text>
        <Card.Text>Location: {loan.bike.location}</Card.Text>
        {/* <Card.Link href={`#bikes/${bike.id}`}>See Details</Card.Link> */}
      </Card.Body>
    </Card>
  ))

  return (
    <Fragment>
      {loansJsx}
    </Fragment>
  )
}

export default IndexUserLoans
