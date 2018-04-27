import axios from 'axios'

export const FETCH_BTC = 'FETCH_BTC'
export const FETCH_BTC_START = 'FETCH_BTC_START'
export const FETCH_BTC_END = 'FETCH_BTC_END'

const ROOT_URL = 'https://api.staging.cointec.co.uk'

export function fetchBTC(amount) {
    return (dispatch) => {
        dispatch({
            type: FETCH_BTC_START,
            payload: null
        });
        axios.post(`${ROOT_URL}/quotes/btc`, amount)
        .then((response) => {
            dispatch({
                type: FETCH_BTC,
                payload: response
            })
        })
        .catch((error) => {
            dispatch({
                type: FETCH_BTC_END,
                payload: error
            })
        });
    }
}
