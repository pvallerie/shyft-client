import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexAllLoans = user => {
  return axios({
    url: apiUrl + '/loans',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
