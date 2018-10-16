import { ROOT_URL } from '..'

export const FETCH_ASSETS_LIST = 'FETCH_ASSETS_LIST'
export const FETCH_ASSETS_LIST_START = 'FETCH_ASSETS_LIST_START'
export const FETCH_ASSETS_LIST_END = 'FETCH_ASSETS_LIST_END'

export const fetchAssetsList = () => async dispatch => {
	dispatch({ type: FETCH_ASSETS_LIST_START })

	const response = await fetch(`${ROOT_URL}/assets/exchangeables`)
	const { ok, statusText, json } = response
	if (!ok) return dispatch({ type: FETCH_ASSETS_LIST_END, payload: statusText })

	const payload = await json()
	return dispatch({ type: FETCH_ASSETS_LIST, payload })
}
