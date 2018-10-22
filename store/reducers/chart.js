import { FETCH_RATES, FETCH_RATES_START, FETCH_RATES_END } from '../actions'

const INITIAL_STATE = {
	data: [],
	loading: false,
	error: null
}

export default (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case FETCH_RATES:
			return { ...state, data: payload, loading: false, error: null }

		case FETCH_RATES_START:
			return { ...state, loading: true, error: null }

		case FETCH_RATES_END:
			return { ...state, loading: false, error: payload }

		default:
			return state
	}
}
