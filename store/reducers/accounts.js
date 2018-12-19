import {
	FETCH_ACCOUNTS,
	FETCH_ACCOUNTS_START,
	FETCH_ACCOUNTS_END,
	ADD_ACCOUNT,
	ADD_ACCOUNT_START,
	ADD_ACCOUNT_END,
	UPDATE_ACCOUNT,
	UPDATE_ACCOUNT_START,
	UPDATE_ACCOUNT_END,
	DELETE_ACCOUNT,
	DELETE_ACCOUNT_START,
	DELETE_ACCOUNT_END,
	FETCH_USER_DETAILS,
	FETCH_USER_DETAILS_START,
	FETCH_USER_DETAILS_END,
	REQUEST_CONFIRM_EMAIL,
	REQUEST_CONFIRM_EMAIL_START,
	REQUEST_CONFIRM_EMAIL_END,
	REQUEST_CHANGE_EMAIL,
	REQUEST_CHANGE_EMAIL_START,
	REQUEST_CHANGE_EMAIL_END,
	UPDATE_PASSWORD,
	UPDATE_PASSWORD_START,
	UPDATE_PASSWORD_END,
	REQUEST_PASSWORD_RESET,
	REQUEST_PASSWORD_RESET_START,
	REQUEST_PASSWORD_RESET_END,
	REQUEST_DATA,
	REQUEST_DATA_START,
	REQUEST_DATA_END,
	EXPORT_DATA,
	EXPORT_DATA_START,
	EXPORT_DATA_END,
	CLOSE_ACCOUNT,
	CLOSE_ACCOUNT_START,
	CLOSE_ACCOUNT_END
} from '../actions'

const INITIAL_STATE = {
	loading: false,
	error: null,
	list: null,
	requestEmail: null,
	changeEmail: null,
	userDetails: null,
	resetPassword: null,
	addFN: null,
	updateFN: null,
	fetched: false,
	action: null
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
				action: null,
				error: null
			}

		case UPDATE_ACCOUNT:
			return {
				...state,
				updateFN: payload,
				loading: false,
				action: null,
				error: null
			}

		case DELETE_ACCOUNT:
			return {
				...state,
				loading: false,
				action: null,
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

		case UPDATE_PASSWORD:
			return {
				...state,
				updatePassword: payload,
				loading: false,
				error: null
			}

		case REQUEST_PASSWORD_RESET:
			return {
				...state,
				resetPassword: payload,
				loading: false,
				error: null
			}

		case REQUEST_DATA:
		case EXPORT_DATA:
		case CLOSE_ACCOUNT:
			return {
				...state,
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
			return { ...state, loading: true, action: 'add', error: null }

		case UPDATE_ACCOUNT_START:
			return { ...state, loading: true, action: 'add', error: null }

		case DELETE_ACCOUNT_START:
			return { ...state, loading: true, action: 'delete', error: null }

		case REQUEST_CONFIRM_EMAIL_START:
			return { ...state, requestEmail: null, loading: true, error: null }

		case REQUEST_CHANGE_EMAIL_START:
			return { ...state, changeEmail: null, loading: true, error: null }

		case REQUEST_PASSWORD_RESET_START:
			return { ...state, resetPassword: null, loading: true, error: null }

		case UPDATE_PASSWORD_START:
			return { ...state, updatePassword: null, loading: true, error: null }

		case REQUEST_DATA_START:
		case EXPORT_DATA_START:
		case CLOSE_ACCOUNT_START:
			return { ...state, loading: true, error: null }

		case FETCH_ACCOUNTS_END:
		case FETCH_USER_DETAILS_END:
		case ADD_ACCOUNT_END:
		case UPDATE_ACCOUNT_END:
		case DELETE_ACCOUNT_END:
		case REQUEST_CONFIRM_EMAIL_END:
		case REQUEST_CHANGE_EMAIL_END:
		case UPDATE_PASSWORD_END:
		case REQUEST_PASSWORD_RESET_END:
		case REQUEST_DATA_END:
		case EXPORT_DATA_END:
		case CLOSE_ACCOUNT_END:
			return { ...state, loading: false, action: null, error: payload }

		default:
			return state
	}
}
