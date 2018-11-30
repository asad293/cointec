import { ROOT_URL } from '..'
import axios from 'axios'
import Cookie from 'js-cookie'

export const FETCH_VERIFICATION_STATUS = 'FETCH_VERIFICATION_STATUS'
export const FETCH_VERIFICATION_STATUS_START = 'FETCH_VERIFICATION_STATUS_START'
export const FETCH_VERIFICATION_STATUS_END = 'FETCH_VERIFICATION_STATUS_END'

export const fetchVerificationStatus = ({ ctUser }) => dispatch => {
	dispatch({ type: FETCH_VERIFICATION_STATUS_START })

	const headers = {
		'Content-Type': 'application/json',
		'CT-SESSION-ID': Cookie.get('CT-SESSION-ID'),
		'CT-ACCOUNT-ID': ctUser
	}

	return axios
		.get(`${ROOT_URL}/verification/${ctUser}/basic/`, { headers })
		.then(response => {
			dispatch({
				type: FETCH_VERIFICATION_STATUS,
				payload: response.data
			})
			return response
		})
		.catch(error => {
			dispatch({
				type: FETCH_VERIFICATION_STATUS_END,
				payload: error
			})
		})
}
