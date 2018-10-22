import { ROOT_URL } from '..'

export const FETCH_QUOTE = 'FETCH_QUOTE'
export const FETCH_QUOTE_START = 'FETCH_QUOTE_START'
export const FETCH_QUOTE_END = 'FETCH_QUOTE_END'

export const fetchQuote = data => async dispatch => {
	dispatch({ type: FETCH_QUOTE_START })

	try {
		if (data.SendCurrency === data.ReceiveCurrency) throw new Error()

		const response = await fetch(`${ROOT_URL}/quotes`, {
			method: 'POST',
			body: JSON.stringify(data)
		})
		if (!response.ok) throw new Error(response.statusText)

		const payload = await response.json()
		return dispatch({ type: FETCH_QUOTE, payload })
	} catch (error) {
		return dispatch({
			type: FETCH_QUOTE_END,
			payload: error.message
		})
	}
}
