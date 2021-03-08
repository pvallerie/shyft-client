import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

import { indexAllBikes } from '../../../api/bikes'

import '../../../index.scss'

const IndexAllBikes = props => {
  const [bikes, setBikes] = useState([])
  // const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const { user, msgAlert } = props

    // retrieve bikes from API
    indexAllBikes(user)
      .then(res => setBikes(res.data.bikes))
      .then(() => msgAlert({
        heading: 'Retrieved Bikes Successfully',
        message: 'All bikes are currently displayed',
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed to Retrieve Bikes',
        message: `Failed to Retrieve with error: ${error.message}`,
        variant: 'danger'
      }))
  }, [])

  const bikesJsx = bikes.map(bike => (
    <Card key={bike.id} className='content-bg col-5 bike-cards' style={{ border: '1px solid #cbcbcb', margin: '10px', padding: '10px', width: '100%', marginTop: '10px' }}>
      <Card.Body style={{ padding: '0' }}>
        <div style={{ height: '250px', objectFit: 'cover' }}>
          <Card.Img variant="top" src={bike.image} style={{ borderRadius: 'calc(0.25rem - 1px)' }} />
        </div>
        <Card.Title style={{ marginTop: '4rem' }}>{bike.name}</Card.Title>
        <div style={{ fontSize: '16px' }}>
          <ListGroup className="list-group-flush">
            <ListGroupItem style={{ backgroundColor: 'transparent' }}>Size: {bike.size}</ListGroupItem>
            <ListGroupItem style={{ backgroundColor: 'transparent' }}>Type: {bike.type}</ListGroupItem>
            <ListGroupItem style={{ backgroundColor: 'transparent' }}>Location: {bike.location}</ListGroupItem>
          </ListGroup>
          <div className='row' style={{ fontSize: '16px', marginTop: '15px', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
            <Card.Link style={{ display: 'inline' }} href={`#bikes/${bike.id}`}>See Details</Card.Link>
            <Card.Text style={{ display: 'inline' }} className='ml-auto'>${bike.rate}/day</Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  ))

  return (
    <div className='row' style={{ justifyContent: 'center' }}>{bikesJsx.reverse()}</div>
  )
}

export default IndexAllBikes
