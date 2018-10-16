import { ROOT_URL } from '..'

export const FETCH_RATES = 'FETCH_RATES'
export const FETCH_RATES_START = 'FETCH_RATES_START'
export const FETCH_RATES_END = 'FETCH_RATES_END'

export const fetchRates = pair => async dispatch => {
	dispatch({ type: FETCH_RATES_START })

	const response = await fetch(`${ROOT_URL}/charts/${pair}`)
	const { ok, statusText, json } = response
	if (!ok) return dispatch({ type: FETCH_RATES_END, payload: statusText })

	const payload = await json()
	return dispatch({ type: FETCH_RATES, payload })
}
