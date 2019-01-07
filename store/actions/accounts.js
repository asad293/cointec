import Cookie from 'js-cookie'
import axios from 'axios'
import { ROOT_URL } from '..'

export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS'
export const FETCH_ACCOUNTS_START = 'FETCH_ACCOUNTS_START'
export const FETCH_ACCOUNTS_END = 'FETCH_ACCOUNTS_END'

export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const ADD_ACCOUNT_START = 'ADD_ACCOUNT_START'
export const ADD_ACCOUNT_END = 'ADD_ACCOUNT_END'

export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
export const UPDATE_ACCOUNT_START = 'UPDATE_ACCOUNT_START'
export const UPDATE_ACCOUNT_END = 'UPDATE_ACCOUNT_END'

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

export const REQUEST_CHANGE_EMAIL = 'REQUEST_CHANGE_EMAIL'
export const REQUEST_CHANGE_EMAIL_START = 'REQUEST_CHANGE_EMAIL_START'
export const REQUEST_CHANGE_EMAIL_END = 'REQUEST_CHANGE_EMAIL_END'

export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_PASSWORD_START = 'UPDATE_PASSWORD_START'
export const UPDATE_PASSWORD_END = 'UPDATE_PASSWORD_END'

export const REQUEST_PASSWORD_RESET = 'REQUEST_PASSWORD_RESET'
export const REQUEST_PASSWORD_RESET_START = 'REQUEST_PASSWORD_RESET_START'
export const REQUEST_PASSWORD_RESET_END = 'REQUEST_PASSWORD_RESET_END'

export const RESET_PASSWORD_TOKEN = 'RESET_PASSWORD_TOKEN'
export const RESET_PASSWORD_TOKEN_START = 'RESET_PASSWORD_TOKEN_START'
export const RESET_PASSWORD_TOKEN_END = 'RESET_PASSWORD_TOKEN_END'

export const EXPORT_DATA = 'EXPORT_DATA'
export const EXPORT_DATA_START = 'EXPORT_DATA_START'
export const EXPORT_DATA_END = 'EXPORT_DATA_END'

export const REQUEST_DATA = 'REQUEST_DATA'
export const REQUEST_DATA_START = 'REQUEST_DATA_START'
export const REQUEST_DATA_END = 'REQUEST_DATA_END'

export const CLOSE_ACCOUNT = 'CLOSE_ACCOUNT'
export const CLOSE_ACCOUNT_START = 'CLOSE_ACCOUNT_START'
export const CLOSE_ACCOUNT_END = 'CLOSE_ACCOUNT_END'

export const VALIDATE_TOKEN = 'VALIDATE_TOKEN'
export const VALIDATE_TOKEN_START = 'VALIDATE_TOKEN_START'
export const VALIDATE_TOKEN_END = 'VALIDATE_TOKEN_END'

export const REPORT_FRAUD = 'REPORT_FRAUD'
export const REPORT_FRAUD_START = 'REPORT_FRAUD_START'
export const REPORT_FRAUD_END = 'REPORT_FRAUD_END'

export const FETCH_TRANSACTION_LIMITS = 'FETCH_TRANSACTION_LIMITS'
export const FETCH_TRANSACTION_LIMITS_START = 'FETCH_TRANSACTION_LIMITS_START'
export const FETCH_TRANSACTION_LIMITS_END = 'FETCH_TRANSACTION_LIMITS_END'

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

	const headers = {
		'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
		'CT-ACCOUNT-ID': ctUser
	}

	const post = {
		AccountOwner: values.accountName,
		SortCode: values.sortCode,
		AccountNumber: values.accountNumber,
		AccountReference: ''
	}

	return axios
		.post(`${ROOT_URL}/accounts/${ctUser}/bank-accounts`, post, { headers })
		.then(response => {
			dispatch({
				type: ADD_ACCOUNT,
				payload: response.data
			})
			return dispatch(fetchAccounts(ctUser))
		})
		.catch(error => {
			dispatch({
				type: ADD_ACCOUNT_END,
				payload: error.response
			})
			throw error
		})
}

export const updateAccount = (ctUser, values, accountId) => async dispatch => {
	dispatch({ type: UPDATE_ACCOUNT_START })

	const headers = {
		'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
		'CT-ACCOUNT-ID': ctUser
	}

	const post = {
		UserBankAccountId: accountId,
		// AccountOwner: values.accountName,
		// SortCode: values.sortCode,
		// AccountNumber: values.accountNumber,
		AccountReference: values.accountName
	}

	return axios
		.put(`${ROOT_URL}/accounts/${ctUser}/bank-accounts`, post, { headers })
		.then(response => {
			dispatch({
				type: UPDATE_ACCOUNT,
				payload: response.data
			})
			return dispatch(fetchAccounts(ctUser))
		})
		.catch(error => {
			dispatch({
				type: UPDATE_ACCOUNT_END,
				payload: error.response
			})
			throw error
		})
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

export const requestConfirmEmail = ({
	ctUser,
	emailAddress
}) => async dispatch => {
	dispatch({ type: REQUEST_CONFIRM_EMAIL_START })

	const data = {
		EmailAddress: emailAddress
	}

	const headers = {
		'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
		'CT-ACCOUNT-ID': ctUser
	}
	return axios
		.post(`${ROOT_URL}/accounts/request-confirm-email`, data, { headers })
		.then(response => {
			dispatch({
				type: REQUEST_CONFIRM_EMAIL,
				payload: response.data
			})
			return response
		})
		.catch(error => {
			console.log(error)
			dispatch({
				type: REQUEST_CONFIRM_EMAIL_END,
				payload: error
			})
			throw error
		})
}

export const changeEmail = ({
	// ctUser,
	emailAddress,
	newEmailAddress,
	password
}) => async dispatch => {
	dispatch({ type: REQUEST_CHANGE_EMAIL_START })

	const data = {
		EmailAddress: emailAddress,
		NewEmailAddress: newEmailAddress
	}

	const headers = {
		Authorization: 'Basic ' + btoa(emailAddress + ':' + password)
	}
	return axios
		.post(`${ROOT_URL}/accounts/request-change-email`, data, { headers })
		.then(response => {
			dispatch({
				type: REQUEST_CHANGE_EMAIL,
				payload: response.data
			})
			return response
		})
		.catch(error => {
			dispatch({
				type: REQUEST_CHANGE_EMAIL_END,
				payload: error
			})
			throw error
		})
}

export const updatePassword = ({
	ctUser,
	password,
	newPassword
}) => async dispatch => {
	dispatch({ type: UPDATE_PASSWORD_START })

	const data = {
		Password: password,
		NewPassword: newPassword
	}

	const headers = {
		'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
		'CT-ACCOUNT-ID': ctUser
	}

	return axios
		.post(`${ROOT_URL}/accounts/${ctUser}/change-password`, data, { headers })
		.then(response => {
			dispatch({
				type: UPDATE_PASSWORD,
				payload: response.data
			})
			return response
		})
		.catch(error => {
			dispatch({
				type: UPDATE_PASSWORD_END,
				payload: error
			})
			throw error
		})
}

export const resetPassword = ({ emailAddress }) => async dispatch => {
	dispatch({ type: REQUEST_PASSWORD_RESET_START })

	const data = {
		EmailAddress: emailAddress
	}

	return axios
		.post(`${ROOT_URL}/accounts/request-reset`, data)
		.then(response => {
			dispatch({
				type: REQUEST_PASSWORD_RESET,
				payload: response.data
			})
			return response
		})
		.catch(error => {
			dispatch({
				type: REQUEST_PASSWORD_RESET_END,
				payload: error
			})
			throw error
		})
}

export const resetPasswordByToken = ({ token, values }) => async dispatch => {
	dispatch({ type: RESET_PASSWORD_TOKEN_START })

	const data = {
		Password: values.password,
		NewPassword: values.newPassword
	}

	return axios
		.post(`${ROOT_URL}/accounts/reset-password?token=${token}`, data)
		.then(response => {
			dispatch({
				type: RESET_PASSWORD_TOKEN,
				payload: response.data
			})
			return response
		})
		.catch(error => {
			dispatch({
				type: RESET_PASSWORD_TOKEN_END,
				payload: error
			})
			throw error
		})
}

export const exportData = ({ emailAddress, password }) => async dispatch => {
	dispatch({ type: EXPORT_DATA_START })

	const data = {
		EmailAddress: emailAddress
	}

	const headers = {
		Authorization: 'Basic ' + btoa(emailAddress + ':' + password)
	}
	return axios
		.post(`${ROOT_URL}/accounts/export-data`, data, { headers })
		.then(response => {
			dispatch({
				type: EXPORT_DATA,
				payload: response.data
			})
			return response
		})
		.catch(error => {
			dispatch({
				type: EXPORT_DATA_END,
				payload: error
			})
			throw error
		})
}

export const requestData = ({ emailAddress, password }) => async dispatch => {
	dispatch({ type: REQUEST_DATA_START })

	const data = {
		EmailAddress: emailAddress
	}

	const headers = {
		Authorization: 'Basic ' + btoa(emailAddress + ':' + password)
	}
	return axios
		.post(`${ROOT_URL}/accounts/request-data`, data, { headers })
		.then(response => {
			dispatch({
				type: REQUEST_DATA,
				payload: response.data
			})
			return response
		})
		.catch(error => {
			dispatch({
				type: REQUEST_DATA_END,
				payload: error
			})
			throw error
		})
}

export const closeAccount = ({ emailAddress, password }) => async dispatch => {
	dispatch({ type: CLOSE_ACCOUNT_START })

	const data = {
		EmailAddress: emailAddress
	}

	const headers = {
		Authorization: 'Basic ' + btoa(emailAddress + ':' + password)
	}
	return axios
		.post(`${ROOT_URL}/accounts/close-account`, data, { headers })
		.then(response => {
			dispatch({
				type: CLOSE_ACCOUNT,
				payload: response.data
			})
			return response
		})
		.catch(error => {
			dispatch({
				type: CLOSE_ACCOUNT_END,
				payload: error
			})
			throw error
		})
}

export const validateToken = ({ action, token }) => async dispatch => {
	dispatch({ type: VALIDATE_TOKEN_START })

	return axios
		.get(`${ROOT_URL}/accounts/${action}?token=${token}`)
		.then(response => {
			dispatch({
				type: VALIDATE_TOKEN,
				payload: response.data
			})
			return response
		})
		.catch(error => {
			dispatch({
				type: VALIDATE_TOKEN_END,
				payload: error
			})
			throw error
		})
}

export const reportFraud = ({ action, token }) => async dispatch => {
	dispatch({ type: REPORT_FRAUD_START })

	return axios
		.get(`${ROOT_URL}/accounts/report-fraud?action=${action}&token=${token}`)
		.then(response => {
			dispatch({
				type: REPORT_FRAUD,
				payload: response.data
			})
			return response
		})
		.catch(error => {
			dispatch({
				type: REPORT_FRAUD_END,
				payload: error
			})
			throw error
		})
}

export const fetchTransactionLimits = ({ ctUser }) => async dispatch => {
	dispatch({ type: FETCH_TRANSACTION_LIMITS_START })

	const headers = {
		'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
		'CT-ACCOUNT-ID': ctUser
	}

	return axios
		.get(`${ROOT_URL}/accounts/${ctUser}/limits`, { headers })
		.then(response => {
			dispatch({
				type: FETCH_TRANSACTION_LIMITS,
				payload: response.data
			})
			return response
		})
		.catch(error => {
			dispatch({
				type: FETCH_TRANSACTION_LIMITS_END,
				payload: error
			})
			throw error
		})
}
