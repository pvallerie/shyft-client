import React, { useState, useEffect, Fragment } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

import CreateBike from '../CreateBike/CreateBike'

import { indexAllBikes } from '../../../api/bikes'

import '../../../index.scss'

const IndexUserBikes = props => {
  const { user, msgAlert } = props
  const [userBikes, setUserBikes] = useState([])
  const [showBikeFormModal, setShowBikeFormModal] = useState(false)

  useEffect(() => {
    // retrieve all bikes from API
    indexAllBikes(user)
      .then(res => {
        // filter all bikes by owner = userId
        const bikes = res.data.bikes
        const filteredBikes = bikes.filter(bike => bike.owner.id === user.id)
        setUserBikes(filteredBikes)
      })
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

  const bikesJsx = userBikes.map(bike => (
    <Card key={bike.id} className='content-bg col-5 bike-cards' style={{ border: '1px solid #cbcbcb', borderRadius: 'calc(0.25rem - 1px)', margin: '10px', padding: '10px', width: '100%', marginTop: '10px' }}>
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

  if (showBikeFormModal) {
    return (
      <Fragment>
        <CreateBike
          user={user}
          msgAlert={msgAlert}
          showBikeFormModal={showBikeFormModal}
          setShowBikeFormModal={setShowBikeFormModal}
        />
        <Button
          variant="primary"
          type="button"
          onClick={() => setShowBikeFormModal(true)}
          style={{ marginTop: '.75rem', backgroundColor: '$tertiary' }}
        >
            Add Bike
        </Button>
        <div className='row' style={{ justifyContent: 'center' }}>{bikesJsx.reverse()}</div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Button
        style={{ marginTop: '.75rem', backgroundColor: '$tertiary' }}
        variant="primary"
        type="button"
        onClick={() => setShowBikeFormModal(true)}
      >
          Add Bike
      </Button>
      <div className='row' style={{ justifyContent: 'center' }}>{bikesJsx.reverse()}</div>
    </Fragment>
  )
}

export default IndexUserBikes
