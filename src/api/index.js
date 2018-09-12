import axios from 'axios'

const API_URL = 'https://api.staging.cointec.co.uk'

const url = {
    FORGOT_PASSWORD: `${API_URL}/accounts/forgot-password`
}

const api = {
    forgotPassword: (data) => {
        const headers = {
            'Content-Type': 'application/json'
        }

        return axios.post(url.FORGOT_PASSWORD, data, { headers })
    }
}

export default api