import React, { useState, useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { showBike } from '../../../api/bikes'

const ShowBike = props => {
  const { user, match } = props
  const [bike, setBike] = useState([])

  useEffect(() => {
    showBike(match.params.id, user)
      .then(res => {
        console.log('this is bike:', res.data.bike)
        return res
      })
      .then(res => setBike(res.data.bike))
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

  return (
    <Fragment>
      {bikeJsx}
    </Fragment>
  )
}

export default withRouter(ShowBike)
