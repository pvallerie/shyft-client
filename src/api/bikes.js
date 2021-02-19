import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexAllBikes = user => {
  return axios({
    url: apiUrl + '/bikes',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const showBike = async (id, user) => {
  return axios({
    url: apiUrl + '/bikes/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const createBike = (bikeInfo, user) => {
  return axios({
    url: apiUrl + '/bikes',
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { bike: bikeInfo }
  })
}

export const updateBike = (bikeInfo, user, id) => {
  return axios({
    url: apiUrl + '/bikes/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { bike: bikeInfo }
  })
}

export const deleteBike = (id, user) => {
  return axios({
    url: apiUrl + '/bikes/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
