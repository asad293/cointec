import {
	FETCH_VERIFICATION_STATUS,
	FETCH_VERIFICATION_STATUS_START,
	FETCH_VERIFICATION_STATUS_END
} from '../actions'

const INITIAL_STATE = {
	loading: false,
	error: null
}

export default (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case FETCH_VERIFICATION_STATUS:
			return { ...state, ...payload, loading: false, error: null }

		case FETCH_VERIFICATION_STATUS_START:
			return { ...state, loading: true, error: null }

		case FETCH_VERIFICATION_STATUS_END:
			return { ...state, loading: false, error: payload }

		default:
			return state
	}
}
