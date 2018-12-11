export const TOGGLE_VERIFICATION_ALERT = 'TOGGLE_VERIFICATION_ALERT'

export const toggleVerificationAlert = toggle => async dispatch => {
	return dispatch({
		type: TOGGLE_VERIFICATION_ALERT,
		payload: {
			verificationAlert: toggle
		}
	})
}
