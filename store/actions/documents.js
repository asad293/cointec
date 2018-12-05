import axios from 'axios'

export const UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT'
export const UPLOAD_DOCUMENT_START = 'UPLOAD_DOCUMENT_START'
export const UPLOAD_DOCUMENT_END = 'GET_REHIVE_TOKEN_END'

export const uploadDocument = ({
	AccountId,
	RehiveId,
	Token,
	file,
	category
}) => dispatch => {
	dispatch({ type: UPLOAD_DOCUMENT_START })

	const headers = {
		'Content-Type': 'multipart/form-data',
		Authorization: `Token ${Token}`
	}

	const data = new FormData()
	data.append('file', file)
	data.append('document_category', category)
	data.append('document_type', 'other')
	data.append('status', 'pending')
	data.append('user', RehiveId)

	console.log(data)
	return axios
		.post(`https://api.rehive.com/${AccountId}/admin/users/documents/`, data, {
			headers
		})
		.then(response => {
			console.log(response)
			dispatch({
				type: UPLOAD_DOCUMENT,
				payload: response.data
			})
			return response
		})
		.catch(error => {
			dispatch({
				type: UPLOAD_DOCUMENT_END,
				payload: error
			})
		})
}
