import { action, observable } from 'mobx'
import Form from '../helpers/Form'
import api from '../api'
import authStore from './AuthStore'

const validators = {
    email: value => {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return !regex.test(value)
    },
    password: value => value.length < 8
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
                throw err
            }))
            .finally(action(() => { this.inProgress = false }))
    }

    @action signInSuccess(data) {
        this.responseError = false
        this.form.reset()
        authStore.setAuthenticated(data.Success)
    }

    @action togglePassword() {
        this.passwordVisible = !this.passwordVisible
    }
}

export default new SignInStore()