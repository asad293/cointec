export const TOGGLE_VERIFICATION_ALERT = 'TOGGLE_VERIFICATION_ALERT'
export const SHOW_TRANSACTION_ALERT = 'SHOW_TRANSACTION_ALERT'
export const HIDE_TRANSACTION_ALERT = 'HIDE_TRANSACTION_ALERT'

export const toggleVerificationAlert = toggle => async dispatch => {
	return dispatch({
		type: TOGGLE_VERIFICATION_ALERT,
		payload: {
			verificationAlert: toggle
		}
	})
}

export const showTransactionAlert = () => async dispatch => {
	return dispatch({
		type: SHOW_TRANSACTION_ALERT
	})
}

export const hideTransactionAlert = () => async dispatch => {
	return dispatch({
		type: HIDE_TRANSACTION_ALERT
	})
}
