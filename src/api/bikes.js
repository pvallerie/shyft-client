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
