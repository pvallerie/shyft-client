import React, { useState, useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import UpdateBike from '../UpdateBike/UpdateBike'

import { showBike } from '../../../api/bikes'

const ShowBike = props => {
  const { user, match } = props
  const [bike, setBike] = useState([])
  const [showBikeFormModal, setShowBikeFormModal] = useState(false)

  useEffect(() => {
    showBike(match.params.id, user)
      .then(res => {
        setBike(res.data.bike)
        console.log('this is bike.owner 1:', bike.owner)
      })
  }, [])

  const bikeJsx = (
    <div>
      <p>{bike.name}</p>
      <p>{bike.type}</p>
      <p>{bike.size}</p>
      <p>{bike.rate}</p>
      <p>{bike.location}</p>
      <p>{bike.owner}</p>
    </div>
  )

  if (!bike) {
    return 'loading...'
  }

  if (user.id === bike.owner) {
    if (showBikeFormModal) {
      return (
        <Fragment>
          <UpdateBike
            user={user}
            id={bike.id}
          />
          <Button
            variant="primary"
            type="button"
            onClick={() => setShowBikeFormModal(true)}
          >
              Edit Bike
          </Button>
          <div>{bikeJsx}</div>
        </Fragment>
      )
    }
    return (
      <Fragment>
        <Button
          variant="primary"
          type="button"
          onClick={() => setShowBikeFormModal(true)}
        >
            Edit Bike
        </Button>
        <div>{bikeJsx}</div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        {bikeJsx}
      </Fragment>
    )
  }
}

export default withRouter(ShowBike)
