import axios from 'axios'
import Cookie from 'js-cookie'
export const CREATE_ORDER = 'CREATE_ORDER'
export const CREATE_ORDER_START = 'CREATE_ORDER_START'
export const CREATE_ORDER_END = 'CREATE_ORDER_END'

export const CLEAR_ORDER = 'CLEAR_ORDER'
export const CLEAR_ORDER_START = 'CLEAR_ORDER_START'
export const CLEAR_ORDER_END = 'CLEAR_ORDER_END'

export const ABANDON_ORDER = 'ABANDON_ORDER'
export const ABANDON_ORDER_START = 'ABANDON_ORDER_START'
export const ABANDON_ORDER_END = 'ABANDON_ORDER_END'

export const STATUS_ORDER = 'STATUS_ORDER'
export const STATUS_ORDER_START = 'STATUS_ORDER_START'
export const STATUS_ORDER_END = 'STATUS_ORDER_END'

const ROOT_URL = 'https://api.staging.cointec.co.uk'

export function createOrder({ destAmount, sourceAmount, sourceCurrency, destCurrency, exchangeRate, dest, ctUser, createdAt }) {
    // let createdAt = new Date();
    // createdAt = createdAt.getTime()/1000.0;
    // console.log('date',createdAt)
    let info = {
        ctUser,//: 5,
        orderReference: 58852233,
        status: 'PAYMENT',
        paymentAccountId: '',
        createdAt,
        source: 'Cointec',
        //createdAt: '1519575123',
        //dest: 'muPs8ToG7vqMC1UKw9afoHW1hBWkpAAQSN n3k5Yzb3z1KTbBZRAZrjiByUxquX4E2beu',
        dest,//: 'mohqDQLPpd6iffiQrXr3arBnMvvpZgjwsZ',
        sourceCurrency,//: 'GBP',
        sourceAmount,
        //sourceAmount: '125',
        destCurrency,//: 'BTC',
        destAmount,
        //destAmount: '0.125',
        exchangeRate,
        //exchangeRate: '1.34',
    }
    console.log('createOrder',info);
    const headers = {
        'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
        'CT-ACCOUNT-ID': ctUser
    }
    return (dispatch) => {
        dispatch({
            type: CREATE_ORDER_START,
            payload: null
        });
        return axios.post(`${ROOT_URL}/orders/create/buy`,info, { headers })
        .then((response) => {
            dispatch({
                type: CREATE_ORDER,
                payload: response
            })
            return response
        })
        .catch((error) => {
            dispatch({
                type: CREATE_ORDER_END,
                payload: error
            })
        });
    }
}

export function clearOrder({orderId, accountId, ctUser}) {
    console.log('clearing order: ', orderId, accountId);
    return (dispatch) => {
        dispatch({
            type: CLEAR_ORDER_START,
            payload: null
        });
        const headers = {
            'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
            'CT-ACCOUNT-ID': ctUser
        }
        axios.get(`${ROOT_URL}/orders/clearing/${orderId}/${accountId}`, { headers })
        .then((response) => {
            dispatch({
                type: CLEAR_ORDER,
                payload: response
            })
        })
        .catch((error) => {
            dispatch({
                type: CLEAR_ORDER_END,
                payload: error
            })
        });
    }
}

export function abandonOrder({ orderId, ctUser }) {
    console.log('abandon order: ', orderId);
    return (dispatch) => {
        dispatch({
            type: ABANDON_ORDER_START,
            payload: null
        });

        
        const headers = {
            'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
            'CT-ACCOUNT-ID': ctUser
        }
        axios.get(`${ROOT_URL}/orders/abandon/${orderId}`, { headers })
        .then((response) => {
            dispatch({
                type: ABANDON_ORDER,
                payload: response
            })
        })
        .catch((error) => {
            dispatch({
                type: ABANDON_ORDER_END,
                payload: error
            })
        });
    }
}

export function getStatus({ orderId, ctUser }) {
    console.log('status order: ', orderId);
    return (dispatch) => {
        dispatch({
            type: STATUS_ORDER_START,
            payload: null
        });
        
        const headers = {
            'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
            'CT-ACCOUNT-ID': ctUser
        }
        axios.get(`${ROOT_URL}/orders/status/${orderId}`, { headers })
        .then((response) => {
            dispatch({
                type: STATUS_ORDER,
                payload: response
            })
        })
        .catch((error) => {
            dispatch({
                type: STATUS_ORDER_END,
                payload: error
            })
        });
    }
}