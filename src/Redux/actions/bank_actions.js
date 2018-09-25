import axios from 'axios'
import Cookie from 'js-cookie'

export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS'
export const FETCH_ACCOUNTS_START = 'FETCH_ACCOUNTS_START'
export const FETCH_ACCOUNTS_END = 'FETCH_ACCOUNTS_END'

export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const ADD_ACCOUNT_START = 'ADD_ACCOUNT_START'
export const ADD_ACCOUNT_END = 'ADD_ACCOUNT_END'

const ROOT_URL = 'https://api.staging.cointec.co.uk'

export function fetchAccounts(ctUser) {
    return (dispatch) => {
        dispatch({
            type: FETCH_ACCOUNTS_START,
            payload: null
        });
        const headers = {
            'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
            'CT-ACCOUNT-ID': ctUser
        }
        axios.get(`${ROOT_URL}/accounts/${ctUser}/bank-accounts`, { headers })
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

export function addAccount(ctUser, values) {

    const post = {
        AccountOwner: '',
        SortCode: values.sortCode,
        AccountNumber: values.accountNo,
        AccountReference: ''
    }
    return (dispatch) => {
        dispatch({
            type: ADD_ACCOUNT_START,
            payload: null
        })
        const headers = {
            'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
            'CT-ACCOUNT-ID': ctUser
        }
        axios.post(`${ROOT_URL}/accounts/${ctUser}/bank-accounts/add`, post, { headers })
        .then((response) => {
            dispatch({
                type: ADD_ACCOUNT,
                payload: response
            })
            // fetch newly added accounts
            dispatch(fetchAccounts(ctUser))
        })
        .catch((error) => {
            dispatch({
                type: ADD_ACCOUNT_END,
                payload: error
            })
        });
    }
}
