import axios from 'axios'

export const FETCH_GBP = 'FETCH_GBP'
export const FETCH_GBP_START = 'FETCH_GBP_START'
export const FETCH_GBP_END = 'FETCH_GBP_END'

const ROOT_URL = 'https://api.staging.cointec.co.uk'

export function fetchGBP(amount) {
    return (dispatch) => {
        dispatch({
            type: FETCH_GBP_START,
            payload: null
        });
        axios.post(`${ROOT_URL}/quotes/gbp`, amount)
        .then((response) => {
            dispatch({
                type: FETCH_GBP,
                payload: response
            })
        })
        .catch((error) => {
            dispatch({
                type: FETCH_GBP_END,
                payload: error
            })
        });
    }
}
