import {
	FETCH_ACCOUNTS,
	FETCH_ACCOUNTS_START,
	FETCH_ACCOUNTS_END,
	ADD_ACCOUNT,
	ADD_ACCOUNT_START,
	ADD_ACCOUNT_END,
	FETCH_USER_DETAILS,
	FETCH_USER_DETAILS_START,
	FETCH_USER_DETAILS_END,
	REQUEST_CONFIRM_EMAIL,
	REQUEST_CONFIRM_EMAIL_START,
	REQUEST_CONFIRM_EMAIL_END,
	REQUEST_CHANGE_EMAIL,
	REQUEST_CHANGE_EMAIL_START,
	REQUEST_CHANGE_EMAIL_END
} from '../actions'

const INITIAL_STATE = {
	loading: false,
	error: null,
	list: null,
	requestEmail: null,
	changeEmail: null,
	userDetails: null,
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

		case REQUEST_CONFIRM_EMAIL:
			return {
				...state,
				requestEmail: payload,
				loading: false,
				error: null
			}

		case REQUEST_CHANGE_EMAIL:
			return {
				...state,
				changeEmail: payload,
				loading: false,
				error: null
			}

		case FETCH_USER_DETAILS:
			return { ...state, userDetails: payload, loading: false, error: null }

		case FETCH_ACCOUNTS_START:
			return { ...state, fetched: false, loading: true, error: null }

		case FETCH_USER_DETAILS_START:
			return { ...state, loading: true, error: null }

		case ADD_ACCOUNT_START:
			return { ...state, loading: true, error: null }

		case REQUEST_CONFIRM_EMAIL_START:
			return { ...state, requestEmail: null, loading: true, error: null }

		case REQUEST_CHANGE_EMAIL_START:
			return { ...state, changeEmail: null, loading: true, error: null }

		case FETCH_ACCOUNTS_END:
		case FETCH_USER_DETAILS_END:
		case ADD_ACCOUNT_END:
		case REQUEST_CONFIRM_EMAIL_END:
		case REQUEST_CHANGE_EMAIL_END:
			return { ...state, loading: false, error: payload }

		default:
			return state
	}
}