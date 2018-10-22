import {
	CREATE_ORDER,
	CREATE_ORDER_START,
	CREATE_ORDER_END,
	CLEAR_ORDER,
	CLEAR_ORDER_START,
	CLEAR_ORDER_END,
	ABANDON_ORDER,
	ABANDON_ORDER_START,
	ABANDON_ORDER_END,
	REFUND_PAYMENT,
	REFUND_PAYMENT_START,
	REFUND_PAYMENT_END,
	STATUS_ORDER,
	STATUS_ORDER_START,
	STATUS_ORDER_END
} from '../actions'

import _ from 'lodash'

const INITIAL_STATE = {
	loading: true,
	error: null,
	create: null,
	abandon: null,
	refund: null,
	clear: null,
	status: null
}

export default (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case CREATE_ORDER:
			return {
				...state,
				create: payload,
				status: null,
				loading: false,
				error: null
			}

		case CLEAR_ORDER:
			return { ...state, clear: payload, loading: false, error: null }

		case ABANDON_ORDER:
			return { ...state, abandon: payload, loading: false, error: null }

		case REFUND_PAYMENT:
			return {
				...state,
				refund: payload,
				loading: false,
				error: null
			}

		case STATUS_ORDER:
			return {
				...state,
				status: payload,
				loading: false,
				error: null
			}

		case CREATE_ORDER_START:
		case CLEAR_ORDER_START:
		case ABANDON_ORDER_START:
		case REFUND_PAYMENT_START:
		case STATUS_ORDER_START:
			return { ...state, loading: true, error: null }

		case CREATE_ORDER_END:
		case CLEAR_ORDER_END:
		case ABANDON_ORDER_END:
		case REFUND_PAYMENT_END:
		case STATUS_ORDER_END:
			return { ...state, loading: false, error: payload }

		default:
			return state
	}
}
