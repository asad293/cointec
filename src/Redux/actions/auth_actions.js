import axios from 'axios'

export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_START = 'SIGN_UP_START'
export const SIGN_UP_END = 'SIGN_UP_END'

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