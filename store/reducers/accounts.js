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
			return {
				...state,
				list: [
					{
						AccountId: '1',
						AccountNumber: '33456546',
						AccountOwner: 'Primary account',
						AccountReference: 'TA',
						BankName: 'YORKSHIRE BANK',
						SortCode: '11-22-33',
						id: 1
					},
					{
						AccountId: '2',
						AccountNumber: '33456546',
						AccountOwner: 'Primary account',
						AccountReference: 'TA',
						BankName: 'YORKSHIRE BANK',
						SortCode: '11-22-33',
						id: 2
					},
					{
						AccountId: '3',
						AccountNumber: '33456546',
						AccountOwner: 'Primary account',
						AccountReference: 'TA',
						BankName: 'YORKSHIRE BANK',
						SortCode: '11-22-33',
						id: 3
					}
				],
				loading: false,
				error: payload
			}

		case ADD_ACCOUNT_END:
			return { ...state, loading: false, error: payload }

		default:
			return state
	}
}
