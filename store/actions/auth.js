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
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESET_PASSWORD_START = 'RESET_PASSWORD_START'
export const RESET_PASSWORD_END = 'RESET_PASSWORD_END'

export const signUp = body => async dispatch => {
	dispatch({ type: SIGN_UP_START })

	const headers = { 'Content-Type': 'application/json' }
	const response = await fetch(`${ROOT_URL}/accounts/sign-up`, {
		method: 'POST',
		body,
		headers
	})
	const { ok, statusText, json } = response
	if (!ok) return dispatch({ type: SIGN_UP_END, payload: statusText })

	const payload = await json()
	return dispatch({ type: SIGN_UP, payload })
}

export const signIn = ({ email, password }) => async dispatch => {
	dispatch({ type: SIGN_IN_START })

	const headers = {
		Authorization: 'Basic ' + btoa(email + ':' + password)
	}
	const response = await fetch(`${ROOT_URL}/auth/login`, { headers })
	const { ok, statusText, json } = response

	if (!ok) return dispatch({ type: SIGN_IN_END, payload: statusText })

	const payload = await json()
	if (!payload.Success)
		return dispatch({ type: SIGN_IN_END, payload: statusText })

	const userData = JSON.stringify(payload)
	localStorage.setItem('user', userData)
	return dispatch({ type: SIGN_IN, payload })
}

export const forgotPassword = body => async dispatch => {
	dispatch({ type: FORGOT_PASSWORD_START, payload: null })

	const headers = { 'Content-Type': 'application/json' }
	const response = await fetch(`${ROOT_URL}/accounts/forgot-password`, {
		method: 'POST',
		body,
		headers
	})
	const { ok, statusText, json } = response

	if (!ok) return dispatch({ type: FORGOT_PASSWORD_END, payload: statusText })

	const payload = await json()
	return dispatch({ type: FORGOT_PASSWORD, payload })
}

export const resetPassword = body => async dispatch => {
	dispatch({ type: RESET_PASSWORD_START, payload: null })

	const response = await Promise.resolve({})
	const { ok, statusText, json } = response

	if (!ok) return dispatch({ type: RESET_PASSWORD_END, payload: statusText })

	const payload = await Promise.resolve() // json()
	return dispatch({ type: RESET_PASSWORD, payload })
}
