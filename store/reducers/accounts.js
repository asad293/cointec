import {
	FETCH_ACCOUNTS,
	FETCH_ACCOUNTS_START,
	FETCH_ACCOUNTS_END,
	ADD_ACCOUNT,
	ADD_ACCOUNT_START,
	ADD_ACCOUNT_END
} from '../actions'

const INITIAL_STATE = {
	loading: false,
	error: null,
	list: null,
	addFN: null,
	fetched: false
}

export default (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case FETCH_ACCOUNTS:
			return {
				...state,
				addFN: null,
				fetched: true,
				list: payload,
				loading: false,
				error: null
			}

		case ADD_ACCOUNT:
			return {
				...state,
				addFN: payload,
				loading: false,
				error: null
			}

		case FETCH_ACCOUNTS_START:
			return { ...state, fetched: false, loading: true, error: null }

		case ADD_ACCOUNT_START:
			return { ...state, loading: true, error: null }

		case FETCH_ACCOUNTS_END:
		case ADD_ACCOUNT_END:
			return { ...state, loading: false, error: payload }

		default:
			return state
	}
}
