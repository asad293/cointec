import Cookie from 'js-cookie'
import { ROOT_URL } from '..'

export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS'
export const FETCH_ACCOUNTS_START = 'FETCH_ACCOUNTS_START'
export const FETCH_ACCOUNTS_END = 'FETCH_ACCOUNTS_END'

export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const ADD_ACCOUNT_START = 'ADD_ACCOUNT_START'
export const ADD_ACCOUNT_END = 'ADD_ACCOUNT_END'

export const fetchAccounts = ctUser => async dispatch => {
	dispatch({ type: FETCH_ACCOUNTS_START })

	try {
		const headers = {
			'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
			'CT-ACCOUNT-ID': ctUser
		}
		const response = await fetch(
			`${ROOT_URL}/accounts/${ctUser}/bank-accounts`,
			{ headers }
		)
		if (!response.ok) throw new Error(response.statusText)

		const payload = await response.json()
		return dispatch({
			type: FETCH_ACCOUNTS,
			payload
		})
	} catch (error) {
		return dispatch({
			type: FETCH_ACCOUNTS_END,
			payload: error.message
		})
	}
}

export const addAccount = (ctUser, values) => async dispatch => {
	dispatch({ type: ADD_ACCOUNT_START })

	const post = {
		AccountOwner: '',
		SortCode: values.sortCode,
		AccountNumber: values.accountNo,
		AccountReference: ''
	}

	try {
		const headers = {
			'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
			'CT-ACCOUNT-ID': ctUser
		}
		const response = await fetch(
			`${ROOT_URL}/accounts/${ctUser}/bank-accounts/add`,
			{
				headers,
				method: 'POST',
				body: JSON.stringify(post)
			}
		)
		if (!response.ok) throw new Error(response.statusText)

		const payload = await response.json()
		dispatch({
			type: ADD_ACCOUNT,
			payload
		})
		// fetch newly added accounts
		return dispatch(fetchAccounts(ctUser))
	} catch (error) {
		return dispatch({
			type: ADD_ACCOUNT_END,
			payload: error
		})
	}
}
