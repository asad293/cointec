import axios from 'axios'

export const FETCH_QUOTE = 'FETCH_QUOTE'
export const FETCH_QUOTE_START = 'FETCH_QUOTE_START'
export const FETCH_QUOTE_END = 'FETCH_QUOTE_END'

const ROOT_URL = 'https://api.staging.cointec.co.uk'

export function fetchQuote({ 
    SendCurrency = 'GBP', 
    ReceiveCurrency = 'BTC',
    SendAmount,
    ReceiveAmount
})
{
    let info = { SendCurrency, ReceiveCurrency, SendAmount, ReceiveAmount }
    console.log(info);
    return (dispatch) => {
        dispatch({
            type: FETCH_QUOTE_START,
            payload: null
        });
        axios.post(`${ROOT_URL}/quotes/`, info)
        .then((response) => {
            dispatch({
                type: FETCH_QUOTE,
                payload: response
            })
        })
        .catch((error) => {
            dispatch({
                type: FETCH_QUOTE_END,
                payload: error
            })
        });
    }
}
