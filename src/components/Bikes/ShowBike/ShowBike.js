import React, { useState, useEffect, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import UpdateBike from '../UpdateBike/UpdateBike'
import LoanForm from '../../Loans/LoanForm/LoanForm'

import { showBike, deleteBike } from '../../../api/bikes'
import { createLoan } from '../../../api/loans'

const ShowBike = props => {
  const { user, match, msgAlert } = props

  // bike states
  const [bike, setBike] = useState({
    owner: {
      id: null
    }
  })
  const [showBikeFormModal, setShowBikeFormModal] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [loanCreated, setLoanCreated] = useState(false)

  // loan state
  const [loanInfo, setLoanInfo] = useState({
    pickup_date: '',
    dropoff_date: '',
    bike: bike
  })

  useEffect(() => {
    showBike(match.params.id, user)
      .then(res => {
        setBike(res.data.bike)
        return res
      })
      .then(res => {
        setLoanInfo({ bike: res.data.bike.id })
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

  const handleChange = event => {
    event.persist()

    setLoanInfo(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const editLoan = Object.assign({}, prevState, updatedField)
      return editLoan
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    createLoan(loanInfo, user)
      .then(res => {
        setLoanCreated(true)
        return res
      })
      .then(res => msgAlert({
        heading: 'Bike Rented Successfully',
        message: `You'll be riding ${bike.name} on ${res.data.pickup_date}.`,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed to Rent Bike',
        message: `Failed to rent bike with error: ${error.message}`,
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
      <p>{bike.owner.email}</p>
    </div>
  )

  if (!bike) {
    return 'loading...'
  }

  if (isDeleted) {
    return <Redirect to={'/index-user-bikes'} />
  }

  if (loanCreated) {
    return <Redirect to={'/index-user-loans'} />
  }

  if (user.id === bike.owner.id) {
    if (showBikeFormModal) {
      return (
        <Fragment>
          <UpdateBike
            user={user}
            bike={bike}
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
        <LoanForm
          user={user}
          loanInfo={loanInfo}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Fragment>
    )
  }
}

export default withRouter(ShowBike)
