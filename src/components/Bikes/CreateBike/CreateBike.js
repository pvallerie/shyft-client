import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import BikeForm from '../BikeForm/BikeForm'

import { createBike } from '../../../api/bikes'

const CreateBike = props => {
  const { user, msgAlert, showBikeFormModal, setShowBikeFormModal } = props
  const [bikeInfo, setBikeInfo] = useState({
    name: '',
    type: '',
    size: '',
    rate: null,
    location: '',
    owner: { id: user.id },
    image: ''
  })
  const [createdId, setCreatedId] = useState(null)

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

    console.log('bikeInfo at API call:', bikeInfo)

    createBike(bikeInfo, user)
      .then(res => {
        setCreatedId(res.data.bike.id)
        return res
      })
      .then(res => msgAlert({
        heading: 'Created Bike Successfully',
        message: `Successfully Created ${res.data.bike.name}`,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed to Create Bike',
        message: `Failed to Create with error: ${error.message}`,
        variant: 'danger'
      }))
  }

  if (createdId) {
    return <Redirect to={`/bikes/${createdId}`} />
  }

  return (
    <div>
      <BikeForm
        bikeInfo={bikeInfo}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        showBikeFormModal={showBikeFormModal}
        setShowBikeFormModal={setShowBikeFormModal}
        formTitle="Add Bike"
      />
    </div>
  )
}

export default CreateBike
