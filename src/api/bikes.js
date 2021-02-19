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

export const showBike = (id, user) => {
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
