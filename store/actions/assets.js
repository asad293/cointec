import { ROOT_URL } from '..'

export const FETCH_ASSETS_LIST = 'FETCH_ASSETS_LIST'
export const FETCH_ASSETS_LIST_START = 'FETCH_ASSETS_LIST_START'
export const FETCH_ASSETS_LIST_END = 'FETCH_ASSETS_LIST_END'

export const FETCH_ASSETS_STATUS = 'FETCH_ASSETS_STATUS'
export const FETCH_ASSETS_STATUS_START = 'FETCH_ASSETS_STATUS_START'
export const FETCH_ASSETS_STATUS_END = 'FETCH_ASSETS_STATUS_END'

export const SET_CURRENT_ASSET = 'SET_CURRENT_ASSET'

export const fetchAssetsList = () => async dispatch => {
	dispatch({ type: FETCH_ASSETS_LIST_START })
	try {
		const response = await fetch(`${ROOT_URL}/assets/exchangeables`)
		if (!response.ok) throw new Error(response.statusText)

		const payload = await response.json()
		return dispatch({
			type: FETCH_ASSETS_LIST,
			payload
		})
	} catch (error) {
		dispatch({
			type: FETCH_ASSETS_LIST_END,
			payload: error.message
		})
		throw error
	}
}

export const fetchAssetsStatus = () => async dispatch => {
	dispatch({ type: FETCH_ASSETS_STATUS_START })

	try {
		const response = await fetch(`${ROOT_URL}/assets/status`)
		if (!response.ok) throw new Error(response.statusText)

		const payload = await response.json()
		return dispatch({
			type: FETCH_ASSETS_STATUS,
			payload
		})
	} catch (error) {
		return dispatch({
			type: FETCH_ASSETS_STATUS_END,
			payload: error.message
		})
	}
}

export const setCurrentAsset = asset => async dispatch => {
	return dispatch({ type: SET_CURRENT_ASSET, payload: asset })
}
