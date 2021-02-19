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
  const [updatedId, setUpdatedId] = useState(null)

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
      .then(res => {
        console.log('this is res:', res)
        return res
      })
      .then(res => setUpdatedId(res.data.bike.id))
  }

  if (updatedId) {
    return <Redirect to={'/bikes/'} />
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
