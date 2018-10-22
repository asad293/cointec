import { ROOT_URL } from '..'

export const FETCH_RATES = 'FETCH_RATES'
export const FETCH_RATES_START = 'FETCH_RATES_START'
export const FETCH_RATES_END = 'FETCH_RATES_END'

export const fetchRates = pair => async dispatch => {
	dispatch({ type: FETCH_RATES_START })

	try {
		const response = await fetch(`${ROOT_URL}/charts/${pair}`)
		if (!response.ok) throw new Error(response.statusText)

		const payload = await response.json()
		return dispatch({
			type: FETCH_RATES,
			payload
		})
	} catch (error) {
		return dispatch({
			type: FETCH_RATES_END,
			payload: error.message
		})
	}
}
