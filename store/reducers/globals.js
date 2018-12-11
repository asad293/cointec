import { TOGGLE_VERIFICATION_ALERT } from '../actions'

const INITIAL_STATE = {
	verificationAlert: true
}

export default (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case TOGGLE_VERIFICATION_ALERT:
			return { ...state, ...payload }

		default:
			return state
	}
}
