import axios from 'axios'
import jwt from 'jwt-simple'

export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_START = 'SIGN_UP_START'
export const SIGN_UP_END = 'SIGN_UP_END'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_START = 'SIGN_IN_START'
export const SIGN_IN_END = 'SIGN_IN_END'
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const FORGOT_PASSWORD_START = 'FORGOT_PASSWORD_START'
export const FORGOT_PASSWORD_END = 'FORGOT_PASSWORD_END'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESET_PASSWORD_START = 'RESET_PASSWORD_START'
export const RESET_PASSWORD_END = 'RESET_PASSWORD_END'

const ROOT_URL = 'https://api.staging.cointec.co.uk'

export function signUp(values) {
  return dispatch => {
    dispatch({ type: SIGN_UP_START, payload: null })

    const headers = { 'Content-Type': 'application/json' }
    return axios
      .post(`${ROOT_URL}/accounts/sign-up`, values, { headers })
      .then(response => dispatch({ type: SIGN_UP, payload: response }))
      .catch(error => {
        dispatch({ type: SIGN_UP_END, payload: error.response.data })
        throw error
      })
  }
}

export function signIn({ email, password }) {
  return dispatch => {
    dispatch({ type: SIGN_IN_START, payload: null })

    const headers = {
      Authorization: 'Basic ' + btoa(email + ':' + password)
    }
    return axios
      .get(`${ROOT_URL}/auth/login`, { headers, withCredentials: true })
      .then(response => {
        if (response.data.Success === false) {
          dispatch({ type: SIGN_IN_END, payload: response.data })
          throw { response }
        } else {
          const userData = JSON.stringify(response.data)
          const token = jwt.encode(userData, process.env.APP_SECRET_KEY)
          localStorage.setItem('user', token)
          return dispatch({ type: SIGN_IN, payload: response })
        }
      })
      .catch(error => {
        dispatch({ type: SIGN_IN_END, payload: error.response.data })
        throw error
      })
  }
}

export function forgotPassword(data) {
  return dispatch => {
    dispatch({ type: FORGOT_PASSWORD_START, payload: null })

    const headers = { 'Content-Type': 'application/json' }
    return axios
      .post(`${ROOT_URL}/accounts/forgot-password`, data, { headers })
      .then(response => dispatch({ type: FORGOT_PASSWORD, payload: response }))
      .catch(error => {
        dispatch({ type: FORGOT_PASSWORD_END, payload: error.response.data })
        throw error
      })
  }
}

export function resetPassword(data) {
  return dispatch => {
    dispatch({ type: RESET_PASSWORD_START, payload: null })

    return Promise.resolve() // TODO: replace with reset password call
      .then(response => dispatch({ type: RESET_PASSWORD, payload: response }))
      .catch(error => {
        dispatch({ type: RESET_PASSWORD_END, payload: error.response.data })
        throw error
      })
  }
}
