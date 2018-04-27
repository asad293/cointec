import axios from 'axios'

export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS'
export const FETCH_ACCOUNTS_START = 'FETCH_ACCOUNTS_START'
export const FETCH_ACCOUNTS_END = 'FETCH_ACCOUNTS_END'

export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const ADD_ACCOUNT_START = 'ADD_ACCOUNT_START'
export const ADD_ACCOUNT_END = 'ADD_ACCOUNT_END'

const ROOT_URL = 'https://api.staging.cointec.co.uk'

export function fetchAccounts(userID) {
    return (dispatch) => {
        dispatch({
            type: FETCH_ACCOUNTS_START,
            payload: null
        });
        axios.get(`${ROOT_URL}/accounts/${userID}/bank-accounts`)
        .then((response) => {
            dispatch({
                type: FETCH_ACCOUNTS,
                payload: response
            })
        })
        .catch((error) => {
            dispatch({
                type: FETCH_ACCOUNTS_END,
                payload: error
            })
        });
    }
}

export function addAccount(userID, values) {

    const post = {
        AccountOwner: 'Farogh Kohistani',
        SortCode: values.sortCode,
        AccountNumber: values.accountNo,
        AccountReference: values.accountName
    }
    return (dispatch) => {
        dispatch({
            type: ADD_ACCOUNT_START,
            payload: null
        });
        axios.post(`${ROOT_URL}/accounts/${userID}/bank-accounts/add`,post)
        .then((response) => {
            dispatch({
                type: ADD_ACCOUNT,
                payload: response
            })
            // fetch newly added accounts
            dispatch(fetchAccounts(userID))
        })
        .catch((error) => {
            dispatch({
                type: ADD_ACCOUNT_END,
                payload: error
            })
        });
    }
}