import axios from 'axios'
import Cookie from 'js-cookie'
import { ROOT_URL } from '..'
export const CREATE_ORDER = 'CREATE_ORDER'
export const CREATE_ORDER_START = 'CREATE_ORDER_START'
export const CREATE_ORDER_END = 'CREATE_ORDER_END'

export const CLEAR_ORDER = 'CLEAR_ORDER'
export const CLEAR_ORDER_START = 'CLEAR_ORDER_START'
export const CLEAR_ORDER_END = 'CLEAR_ORDER_END'

export const ABANDON_ORDER = 'ABANDON_ORDER'
export const ABANDON_ORDER_START = 'ABANDON_ORDER_START'
export const ABANDON_ORDER_END = 'ABANDON_ORDER_END'

export const REFUND_PAYMENT = 'REFUND_PAYMENT'
export const REFUND_PAYMENT_START = 'REFUND_PAYMENT_START'
export const REFUND_PAYMENT_END = 'REFUND_PAYMENT_END'

export const STATUS_ORDER = 'STATUS_ORDER'
export const STATUS_ORDER_START = 'STATUS_ORDER_START'
export const STATUS_ORDER_END = 'STATUS_ORDER_END'

export function createOrder({
	destAmount,
	sourceAmount,
	sourceCurrency,
	destCurrency,
	exchangeRate,
	dest,
	ctUser,
	createdAt
}) {
	let info = {
		ctUser,
		orderReference: 58852233,
		status: 'PAYMENT',
		paymentAccountId: '',
		createdAt,
		source: 'Cointec',
		dest,
		sourceCurrency,
		sourceAmount,
		destCurrency,
		destAmount,
		exchangeRate
	}
	console.log('createOrder', info)
	const headers = {
		'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
		'CT-ACCOUNT-ID': ctUser
	}
	return dispatch => {
		dispatch({
			type: CREATE_ORDER_START,
			payload: null
		})
		return axios
			.post(`${ROOT_URL}/orders/create/buy`, info, { headers })
			.then(response => {
				dispatch({
					type: CREATE_ORDER,
					payload: response.data
				})
				return response
			})
			.catch(error => {
				dispatch({
					type: CREATE_ORDER_END,
					payload: error
				})
			})
	}
}

export function clearOrder({ orderId, accountId, ctUser }) {
	console.log('clearing order: ', orderId, accountId)
	return dispatch => {
		dispatch({
			type: CLEAR_ORDER_START,
			payload: null
		})
		const headers = {
			'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
			'CT-ACCOUNT-ID': ctUser
		}
		axios
			.get(`${ROOT_URL}/orders/clearing/${orderId}/${accountId}`, { headers })
			.then(response => {
				dispatch({
					type: CLEAR_ORDER,
					payload: response.data
				})
			})
			.catch(error => {
				dispatch({
					type: CLEAR_ORDER_END,
					payload: error
				})
			})
	}
}

export function abandonOrder({ orderId, ctUser, reason }) {
	console.log('abandon order: ', orderId)
	return dispatch => {
		dispatch({
			type: ABANDON_ORDER_START,
			payload: null
		})

		const headers = {
			'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
			'CT-ACCOUNT-ID': ctUser
		}
		const data = {
			AbandonReason: reason
		}
		return axios
			.post(`${ROOT_URL}/orders/abandon/${orderId}`, data, { headers })
			.then(response => {
				dispatch({
					type: ABANDON_ORDER,
					payload: response.data
				})
			})
			.catch(error => {
				dispatch({
					type: ABANDON_ORDER_END,
					payload: error
				})
				throw error
			})
	}
}

export function refundPayment({ orderId, ctUser, dest }) {
	return dispatch => {
		dispatch({
			type: REFUND_PAYMENT_START,
			payload: null
		})

		const headers = {
			'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
			'CT-ACCOUNT-ID': ctUser
		}
		const data = {
			RefundDestination: dest
		}
		return axios
			.post(`${ROOT_URL}/orders/refund/${orderId}`, data, { headers })
			.then(response => {
				dispatch({
					type: REFUND_PAYMENT,
					payload: response.data
				})
			})
			.catch(error => {
				dispatch({
					type: REFUND_PAYMENT_END,
					payload: error
				})
			})
	}
}

export function getStatus({ orderId, ctUser }) {
	console.log('status order: ', orderId)
	return dispatch => {
		dispatch({
			type: STATUS_ORDER_START,
			payload: null
		})

		const headers = {
			'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
			'CT-ACCOUNT-ID': ctUser
		}
		axios
			.get(`${ROOT_URL}/orders/status/${orderId}`, { headers })
			.then(response => {
				dispatch({
					type: STATUS_ORDER,
					// payload: response.data
					payload: {
						Status: {
							CLEARING: 1533471838,
							CREATED: 1533471818,
							PAYMENT: 1533471819
						}
					}
				})
			})
			.catch(error => {
				dispatch({
					type: STATUS_ORDER_END,
					payload: error
				})
				throw error
			})
	}
}
