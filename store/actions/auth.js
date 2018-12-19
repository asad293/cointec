import axios from 'axios'
import Cookie from 'js-cookie'
import { ROOT_URL } from '..'

export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_START = 'SIGN_UP_START'
export const SIGN_UP_END = 'SIGN_UP_END'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_START = 'SIGN_IN_START'
export const SIGN_IN_END = 'SIGN_IN_END'
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const FORGOT_PASSWORD_START = 'FORGOT_PASSWORD_START'
export const FORGOT_PASSWORD_END = 'FORGOT_PASSWORD_END'
// export const RESET_PASSWORD = 'RESET_PASSWORD'
// export const RESET_PASSWORD_START = 'RESET_PASSWORD_START'
// export const RESET_PASSWORD_END = 'RESET_PASSWORD_END'
export const FETCH_LIMIT = 'FETCH_LIMIT'
export const FETCH_LIMIT_START = 'FETCH_LIMIT_START'
export const FETCH_LIMIT_END = 'FETCH_LIMIT_END'

export const signUp = data => async dispatch => {
	dispatch({ type: SIGN_UP_START })

	try {
		const headers = { 'Content-Type': 'application/json' }
		const response = await fetch(`${ROOT_URL}/accounts/sign-up`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers
		})

		if (!response.ok) throw new Error(response.statusText)

		const payload = await response.json()
		return dispatch({
			type: SIGN_UP,
			payload
		})
	} catch (error) {
		dispatch({
			type: SIGN_UP_END,
			payload: error.message
		})
		throw error
	}
}

export const signIn = ({ email, password }) => async dispatch => {
	dispatch({ type: SIGN_IN_START })

	const headers = {
		Authorization: 'Basic ' + btoa(email + ':' + password)
	}
	const response = await axios
		.get(`${ROOT_URL}/auth/login`, {
			headers,
			withCredentials: true
		})
		.then(response => {
			if (response.data.Success === false) {
				dispatch({ type: SIGN_IN_END, payload: response.data })
				throw { response }
			} else {
				const data = { ...response.data, email }
				const userData = JSON.stringify(data)
				localStorage.setItem('user', userData)
				return dispatch({ type: SIGN_IN, payload: data })
			}
		})
		.catch(error => {
			dispatch({ type: SIGN_IN_END, payload: error.response.data })
			throw error
		})
	return response
}

export const forgotPassword = body => async dispatch => {
	dispatch({ type: FORGOT_PASSWORD_START })

	try {
		const headers = { 'Content-Type': 'application/json' }
		const response = await fetch(`${ROOT_URL}/accounts/forgot-password`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers
		})

		if (!response.ok) throw new Error(response.statusText)

		const payload = await response.json()
		return dispatch({
			type: FORGOT_PASSWORD,
			payload
		})
	} catch (error) {
		return dispatch({
			type: FORGOT_PASSWORD_END,
			payload: error.message
		})
	}
}

// export const resetPassword = body => async dispatch => {
// 	dispatch({ type: RESET_PASSWORD_START, payload: null })

// 	try {
// 		const response = await Promise.resolve({}) // fetch()
// 		if (!response.ok) throw new Error(response.statusText)

// 		const payload = await Promise.resolve() // response.json()
// 		return dispatch({ type: RESET_PASSWORD, payload })
// 	} catch (error) {
// 		return dispatch({ type: RESET_PASSWORD_END, payload: error.message })
// 	}
// }

export const fetchLimit = ctUser => async dispatch => {
	dispatch({ type: FETCH_LIMIT_START })

	try {
		const headers = {
			'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
			'CT-ACCOUNT-ID': ctUser
		}
		const response = await fetch(`${ROOT_URL}/accounts/${ctUser}/limit`, {
			headers
		})

		if (!response.ok) throw new Error(response.statusText)

		const payload = await response.json()
		return dispatch({
			type: FETCH_LIMIT,
			payload
		})
	} catch (error) {
		return dispatch({
			type: FETCH_LIMIT_END,
			payload: error.message
		})
	}
}
