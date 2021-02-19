import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import BikeForm from '../BikeForm/BikeForm'

import { updateBike } from '../../../api/bikes'

const UpdateBike = props => {
  const { user, id } = props
  const [bikeInfo, setBikeInfo] = useState({
    name: '',
    type: '',
    size: '',
    rate: null,
    location: '',
    owner: null
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
  }

  if (isUpdated) {
    return <Redirect to={`/bikes/${id}`} />
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
