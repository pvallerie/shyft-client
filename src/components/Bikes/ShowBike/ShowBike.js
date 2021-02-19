import React, { useState, useEffect, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import UpdateBike from '../UpdateBike/UpdateBike'

import { showBike, deleteBike } from '../../../api/bikes'

const ShowBike = props => {
  const { user, match, msgAlert } = props
  const [bike, setBike] = useState([])
  const [showBikeFormModal, setShowBikeFormModal] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    showBike(match.params.id, user)
      .then(res => {
        setBike(res.data.bike)
        return res
      })
      .then(res => msgAlert({
        heading: 'Retrieved Bike Successfully',
        message: `Now displaying ${res.data.bike.name}`,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed to Retrieve Bike',
        message: `Failed to Retrieve with error: ${error.message}`,
        variant: 'danger'
      }))
  }, [])

  const deleteThisBike = () => {
    deleteBike(bike.id, user)
      .then(() => setIsDeleted(true))
      .then(res => msgAlert({
        heading: 'Deleted Bike Successfully',
        message: `${bike.name} has been successfully deleted.`,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed to Delete Bike',
        message: `Failed to delete with error: ${error.message}`,
        variant: 'danger'
      }))
  }

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

  if (isDeleted) {
    return <Redirect to={'/index-user-bikes'} />
  }

  if (user.id === bike.owner) {
    if (showBikeFormModal) {
      return (
        <Fragment>
          <UpdateBike
            user={user}
            id={bike.id}
            msgAlert={msgAlert}
          />
          <Button
            variant="primary"
            type="button"
            onClick={() => setShowBikeFormModal(true)}
          >
            Edit Bike
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={deleteThisBike}
          >
            Delete Bike
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
        <Button
          variant="danger"
          type="button"
          onClick={deleteThisBike}
        >
          Delete Bike
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
