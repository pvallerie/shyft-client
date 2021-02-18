import React, { useState, useEffect, Fragment } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { indexAllBikes } from '../../../api/bikes'

const IndexUserBikes = props => {
  const [userBikes, setUserBikes] = useState([])

  useEffect(() => {
    const { user } = props

    // retrieve all bikes from API
    indexAllBikes(user)
      .then(res => {
        // filter all bikes by owner = userId
        const bikes = res.data.bikes
        const filteredBikes = bikes.filter(bike => bike.owner === user.id)
        setUserBikes(filteredBikes)
      })
  }, [])

  const bikesJsx = userBikes.map(bike => (
    <Card key={bike.id} className='content-bg' style={{ border: '1px solid #cbcbcb', margin: '10px', padding: '10px', width: '100%', marginTop: '10px' }}>
      <Card.Body>
        <Card.Title>{bike.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Owner: {bike.owner}</Card.Subtitle>
        <Card.Text>Rate: ${bike.rate} /day</Card.Text>
        <Card.Text>Size: {bike.size}</Card.Text>
        <Card.Text>Type: {bike.type}</Card.Text>
        <Card.Text>Location: {bike.location}</Card.Text>
        <Card.Link href={'#/index-all-bikes'}>See Details</Card.Link>
      </Card.Body>
    </Card>
  ))

  return (
    <Fragment>
      <Button
        variant="primary"
        type="button"
        onClick={() => console.log('add new bike!')}
      >
          Add Bike
      </Button>
      <div>{bikesJsx}</div>
    </Fragment>
  )
}

export default IndexUserBikes
