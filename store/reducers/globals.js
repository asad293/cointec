import {
	TOGGLE_VERIFICATION_ALERT,
	SHOW_TRANSACTION_ALERT,
	HIDE_TRANSACTION_ALERT
} from '../actions'

const INITIAL_STATE = {
	verificationAlert: true,
	transactionAlert: false
}

export default (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case TOGGLE_VERIFICATION_ALERT:
			return { ...state, ...payload }

		case SHOW_TRANSACTION_ALERT:
			return { ...state, transactionAlert: true }

		case HIDE_TRANSACTION_ALERT:
			return { ...state, transactionAlert: false }

		default:
			return state
	}
}
