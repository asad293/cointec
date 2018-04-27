import axios from 'axios'

const API_URL = 'https://api.staging.cointec.co.uk'

const url = {
    SIGN_IN: `${API_URL}/auth/login`,
    SIGN_UP: `${API_URL}/accounts/sign-up`,
    FORGOT_PASSWORD: `${API_URL}/accounts/forgot-password`
}

const api = {
    signIn: (data) => {
        const headers = {
            Authorization: 'Basic ' + btoa(data.email + ':' + data.password)
        }

        return axios.get(url.SIGN_IN, { headers })
    },

    signUp: (data) => {
        const headers = {
            'Content-Type': 'application/json'
        }

        return axios.post(url.SIGN_UP, data, { headers });
    },

    forgotPassword: (data) => {
        const headers = {
            'Content-Type': 'application/json'
        }

        return axios.post(url.FORGOT_PASSWORD, data, { headers })
    }
}

export default api