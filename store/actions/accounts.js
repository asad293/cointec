import Cookie from 'js-cookie'
import axios from 'axios'
import { ROOT_URL } from '..'

export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS'
export const FETCH_ACCOUNTS_START = 'FETCH_ACCOUNTS_START'
export const FETCH_ACCOUNTS_END = 'FETCH_ACCOUNTS_END'

export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const ADD_ACCOUNT_START = 'ADD_ACCOUNT_START'
export const ADD_ACCOUNT_END = 'ADD_ACCOUNT_END'

export const DELETE_ACCOUNT = 'DELETE_ACCOUNT'
export const DELETE_ACCOUNT_START = 'DELETE_ACCOUNT_START'
export const DELETE_ACCOUNT_END = 'DELETE_ACCOUNT_END'

export const FETCH_USER_DETAILS = 'FETCH_USER_DETAILS'
export const FETCH_USER_DETAILS_START = 'FETCH_USER_DETAILS_START'
export const FETCH_USER_DETAILS_END = 'FETCH_USER_DETAILS_END'

export const SAVE_USER_DETAILS = 'SAVE_USER_DETAILS'
export const SAVE_USER_DETAILS_START = 'SAVE_USER_DETAILS_START'
export const SAVE_USER_DETAILS_END = 'SAVE_USER_DETAILS_END'

export const REQUEST_CONFIRM_EMAIL = 'REQUEST_CONFIRM_EMAIL'
export const REQUEST_CONFIRM_EMAIL_START = 'REQUEST_CONFIRM_EMAIL_START'
export const REQUEST_CONFIRM_EMAIL_END = 'REQUEST_CONFIRM_EMAIL_END'

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
		AccountOwner: values.accountName,
		SortCode: values.sortCode,
		AccountNumber: values.accountNumber,
		AccountReference: ''
	}

	try {
		const headers = {
			'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
			'CT-ACCOUNT-ID': ctUser
		}
		const response = await fetch(
			`${ROOT_URL}/accounts/${ctUser}/bank-accounts`,
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

export const deleteAccount = (ctUser, id) => async dispatch => {
	dispatch({ type: DELETE_ACCOUNT_START })

	try {
		const headers = {
			'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
			'CT-ACCOUNT-ID': ctUser
		}
		const response = await fetch(
			`${ROOT_URL}/accounts/${ctUser}/bank-accounts/${id}`,
			{
				headers,
				method: 'DELETE'
			}
		)
		console.log('response', response)
		if (!response.ok) throw new Error(response.statusText)

		const payload = await response.json()
		console.log('payload', payload)
		dispatch({
			type: DELETE_ACCOUNT,
			payload
		})
		return dispatch(fetchAccounts(ctUser))
	} catch (error) {
		return dispatch({
			type: DELETE_ACCOUNT_END,
			payload: error
		})
	}
}

export const fetchUserDetails = ctUser => async dispatch => {
	dispatch({ type: FETCH_USER_DETAILS_START })

	try {
		const headers = {
			'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
			'CT-ACCOUNT-ID': ctUser
		}
		const response = await fetch(`${ROOT_URL}/accounts/${ctUser}/details`, {
			headers
		})
		if (!response.ok) throw new Error(response.statusText)

		const payload = await response.json()
		return dispatch({
			type: FETCH_USER_DETAILS,
			payload
		})
	} catch (error) {
		return dispatch({
			type: FETCH_USER_DETAILS_END,
			payload: error.message
		})
	}
}

export const saveUserDetails = (
	ctUser,
	emailAddress,
	values
) => async dispatch => {
	dispatch({ type: SAVE_USER_DETAILS_START })

	const data = {
		FirstName: values.firstName,
		LastName: values.lastName,
		EmailAddress: emailAddress,
		// MobileNo: '07397224277',
		AddressLine1: values.address1,
		AddressLine2: values.address2 || ' ',
		Town: values.town,
		Country: 'England',
		Postcode: values.postCode,
		DateOfBirth: values.birthDate
	}
	const headers = {
		'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
		'CT-ACCOUNT-ID': ctUser
	}
	return axios
		.post(`${ROOT_URL}/accounts/${ctUser}/details/update`, data, {
			headers
		})
		.then(response => {
			dispatch({
				type: SAVE_USER_DETAILS,
				payload: response.data
			})
			return response
		})
		.catch(error => {
			dispatch({
				type: SAVE_USER_DETAILS_END,
				payload: error
			})
			throw error
		})
}

export const requestConfirmEmail = ctUser => async dispatch => {
	dispatch({ type: REQUEST_CONFIRM_EMAIL_START })

	try {
		const headers = {
			'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
			'CT-ACCOUNT-ID': ctUser
		}
		const response = await fetch(
			`https://api.staging.cointec.co.uk/accounts/request-confirm-email`,
			{
				headers
			}
		)
		if (!response.ok) throw new Error(response.statusText)

		const payload = await response.json()
		return dispatch({
			type: REQUEST_CONFIRM_EMAIL,
			payload
		})
	} catch (error) {
		return dispatch({
			type: REQUEST_CONFIRM_EMAIL_END,
			payload: error.message
		})
	}
}
