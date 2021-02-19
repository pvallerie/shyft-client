import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'

import { indexAllBikes } from '../../../api/bikes'

const IndexAllBikes = props => {
  const [bikes, setBikes] = useState([])
  // const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const { user } = props

    // retrieve bikes from API
    indexAllBikes(user)
      .then(res => setBikes(res.data.bikes))
  }, [])

  const bikesJsx = bikes.map(bike => (
    <Card key={bike.id} className='content-bg' style={{ border: '1px solid #cbcbcb', margin: '10px', padding: '10px', width: '100%', marginTop: '10px' }}>
      <Card.Body>
        <Card.Title>{bike.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Owner: {bike.owner}</Card.Subtitle>
        <Card.Text>Rate: ${bike.rate} /day</Card.Text>
        <Card.Text>Size: {bike.size}</Card.Text>
        <Card.Text>Type: {bike.type}</Card.Text>
        <Card.Text>Location: {bike.location}</Card.Text>
        <Card.Link href={`#bikes/${bike.id}`}>See Details</Card.Link>
      </Card.Body>
    </Card>
  ))

  return (
    <div>{bikesJsx}</div>
  )
}

export default IndexAllBikes
