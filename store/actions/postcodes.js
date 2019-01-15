import axios from 'axios'

export const LOOKUP_POSTCODE = 'LOOKUP_POSTCODE'
export const LOOKUP_POSTCODE_START = 'LOOKUP_POSTCODE_START'
export const LOOKUP_POSTCODE_END = 'LOOKUP_POSTCODE_END'

const api_key = 'ak_je7po7xacHD4NsrQBBNpk65vBZORp'

export const lookupPostcode = postcode => dispatch => {
	dispatch({ type: LOOKUP_POSTCODE_START })

	return axios
		.get(
			`https://api.ideal-postcodes.co.uk/v1/postcodes/${postcode
				.replace(/\s/g, '')
				.toLowerCase()}?api_key=${api_key}`
		)
		.then(response => {
			dispatch({
				type: LOOKUP_POSTCODE,
				payload: response.data
			})
			return response
		})
		.catch(error => {
			dispatch({
				type: LOOKUP_POSTCODE_END,
				payload: error
			})
		})
}
