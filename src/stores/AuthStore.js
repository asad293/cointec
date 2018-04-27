import { action, observable } from 'mobx'
import api from '../api'

class AuthStore {
    @observable isAuthenticated = false
    @observable authUser = {}

    @action setAuthenticated(isAuthenticated) {
        this.isAuthenticated = isAuthenticated
    }
}

const authStore = window.authStore = new AuthStore()

export default authStore