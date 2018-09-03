import axios from 'axios'

export const FETCH_RATES = 'FETCH_RATES'
export const FETCH_RATES_START = 'FETCH_RATES_START'
export const FETCH_RATES_END = 'FETCH_RATES_END'

const ROOT_URL = 'https://api.staging.cointec.co.uk'

export function fetchRates(pair) {
  return (dispatch) => {
    dispatch({
      type: FETCH_RATES_START,
      payload: null
    })

    axios.get(`${ROOT_URL}/charts/${pair}`)
      .then((response) => {
        dispatch({
          type: FETCH_RATES,
          payload: response
        })
      })
      .catch((error) => {
        dispatch({
          type: FETCH_RATES_END,
          payload: error
        })
      })
  }
}