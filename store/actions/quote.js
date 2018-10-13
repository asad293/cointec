import { ROOT_URL } from '..'

export const FETCH_QUOTE = 'FETCH_QUOTE'
export const FETCH_QUOTE_START = 'FETCH_QUOTE_START'
export const FETCH_QUOTE_END = 'FETCH_QUOTE_END'

export const fetchQuote = body => async dispatch => {
	dispatch({ type: FETCH_QUOTE_START })

	const response = await fetch(`${ROOT_URL}/quotes`, { method: 'POST', body })
	const { ok, statusText, json } = response
	if (!ok) return dispatch({ type: FETCH_QUOTE_END, payload: statusText })

	const payload = await json()
	return dispatch({ type: FETCH_QUOTE, payload })
	// .then(response => response.json())
	// .then(response => dispatch({ type: FETCH_QUOTE, payload: response }))
	// .catch(error => dispatch({ type: FETCH_QUOTE_END, payload: error }))
}
