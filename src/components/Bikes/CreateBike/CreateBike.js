import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import BikeForm from '../BikeForm/BikeForm'

import { createBike } from '../../../api/bikes'

const CreateBike = props => {
  // [name, setName] = useState('')
  // [type, setType] = useState('')
  // [size, setSize] = useState('')
  // [rate, setRate] = useState(null)
  // [location, setLocation] = useState('')
  // [owner, setOwner] = useState(null)
  const [bikeInfo, setBikeInfo] = useState({
    name: '',
    type: '',
    size: '',
    rate: null,
    location: '',
    owner: null
  })
  const [createdId, setCreatedId] = useState(null)

  const handleChange = event => {
    event.persist()

    setBikeInfo(() => {
      return {
        bikeInfo: { ...bikeInfo, [event.target.name]: event.target.value }
      }
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const { user } = props
    console.log('this is user:', user)
    console.log('this is bikeInfo:', bikeInfo)

    createBike(bikeInfo, user)
      .then(res => {
        console.log('this is res:', res)
        return res
      })
      .then(res => setCreatedId(res.data.bike.id))
  }

  if (createdId) {
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

export default CreateBike
