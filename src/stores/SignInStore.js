import { action, observable } from 'mobx'
import Form from '../helpers/Form'
import api from '../api'
import authStore from './AuthStore'
import jwt from 'jwt-simple'

const validators = {
    email: value => {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return !regex.test(value)
    },
    // password: value => value.length < 8
}

class SignInStore {
    @observable inProgress = false
    @observable passwordVisible = false
    @observable responseError = false
    @observable form = new Form({
        email: '',
        password: '',
    }, validators)
    
    @action validate(name) {
        let form = Object.assign(new Form(), this.form)
        name ? form.validate(name) : form.validateAll()

        this.form = form
    }

    @action setData(name, value) {
        let form = Object.assign(new Form(), this.form)
        form.setData(name, value)
        
        this.form = form
    }

    @action signIn() {
        this.inProgress = true

        return api.signIn(this.form.data)
            .then(({ data }) => this.signInSuccess(data))
            .catch(action((err) => {
                this.responseError = true
                this.inProgress = false
                throw err
            }))
    }

    @action signInSuccess(data) {
        if (data) {
            const userData = JSON.stringify(data)
            const token = jwt.encode(userData, process.env.APP_SECRET_KEY)
            localStorage.setItem('user', token)
        }
        
        this.responseError = false
        this.inProgress = false
        this.form.reset()
        authStore.setAuthenticated(true)
        return data
    }

    @action togglePassword() {
        this.passwordVisible = !this.passwordVisible
    }
}

export default new SignInStore()