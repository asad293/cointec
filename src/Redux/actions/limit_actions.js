import axios from 'axios'

export const FETCH_LIMIT = 'FETCH_LIMIT'
export const FETCH_LIMIT_START = 'FETCH_LIMIT_START'
export const FETCH_LIMIT_END = 'FETCH_LIMIT_END'

const ROOT_URL = 'https://api.staging.cointec.co.uk'

export function fetchLimit() {
    return (dispatch) => {
        dispatch({
            type: FETCH_LIMIT_START,
            payload: null
        });

        axios.get(`${ROOT_URL}/accounts/5/limit`)
        .then((response) => {
            dispatch({
                type: FETCH_LIMIT,
                payload: response
            })
        })
        .catch((error) => {
            dispatch({
                type: FETCH_LIMIT_END,
                payload: error
            })
        });
    }
}
