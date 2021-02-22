import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import BikeForm from '../BikeForm/BikeForm'

import { updateBike } from '../../../api/bikes'

const UpdateBike = props => {
  const { user, id, msgAlert, bike } = props
  const [bikeInfo, setBikeInfo] = useState({
    name: bike.name,
    type: bike.type,
    size: bike.size,
    rate: bike.rate,
    location: bike.location,
    owner: bike.owner.id
  })
  const [isUpdated, setIsUpdated] = useState(false)

  const handleChange = event => {
    event.persist()

    setBikeInfo(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const editBike = Object.assign({}, prevState, updatedField)
      return editBike
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    updateBike(bikeInfo, user, id)
      .then(res => setIsUpdated(true))
      .then(() => msgAlert({
        heading: 'Updated Bike Successfully',
        message: `Successfully updated ${bikeInfo.name}`,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed to Update Bike',
        message: `Failed to update with error: ${error.message}`,
        variant: 'danger'
      }))
  }

  if (isUpdated) {
    return <Redirect to={'/index-user-bikes'} />
  }

  return (
    <div>
      <BikeForm
        bikeInfo={bikeInfo}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default UpdateBike
