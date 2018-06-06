import axios from 'axios'

export const FETCH_LIMIT = 'FETCH_LIMIT'
export const FETCH_LIMIT_START = 'FETCH_LIMIT_START'
export const FETCH_LIMIT_END = 'FETCH_LIMIT_END'

export const FETCH_CONSTANT = 'FETCH_CONSTANT'
export const FETCH_CONSTANT_START = 'FETCH_CONSTANT_START'
export const FETCH_CONSTANT_END = 'FETCH_CONSTANT_END'

export const FETCH_ASSETS = 'FETCH_ASSETS'
export const FETCH_ASSETS_START = 'FETCH_ASSETS_START'
export const FETCH_ASSETS_END = 'FETCH_ASSETS_END'

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

export function fetchConsts() {
    return (dispatch) => {
        dispatch({
            type: FETCH_CONSTANT_START,
            payload: null
        });

        axios.get(`${ROOT_URL}/service/status`)
        .then((response) => {
            dispatch({
                type: FETCH_CONSTANT,
                payload: response
            })
        })
        .catch((error) => {
            dispatch({
                type: FETCH_CONSTANT_END,
                payload: error
            })
        });
    }
}

export function fetchAssets() {
    return (dispatch) => {
        dispatch({
            type: FETCH_ASSETS_START,
            payload: null
        });

        axios.get(`${ROOT_URL}/assets/status`)
        .then((response) => {
            dispatch({
                type: FETCH_ASSETS,
                payload: response
            })
        })
        .catch((error) => {
            dispatch({
                type: FETCH_ASSETS_END,
                payload: error
            })
        });
    }
}
