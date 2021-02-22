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

export const showLoan = (id, user) => {
  return axios({
    url: apiUrl + '/loans/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const createLoan = (loanInfo, user) => {
  return axios({
    url: apiUrl + '/loans',
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { loan: loanInfo }
  })
}

export const updateLoan = (loanInfo, user, id) => {
  return axios({
    url: apiUrl + '/loans/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { loan: loanInfo }
  })
}

export const deleteLoan = (id, user) => {
  return axios({
    url: apiUrl + '/loans/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
