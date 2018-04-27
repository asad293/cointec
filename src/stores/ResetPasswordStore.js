import { action, observable } from 'mobx'
import Form from '../helpers/Form'
import api from '../api'

const validators = {
    password: {
        minLength: value => value.length < 8,
        containUpper: value => !/(?=.*[A-Z])/.test(value),
        containNumber: value => !/(?=.*\d)/.test(value)
    },
    confirmPassword:  value => value !== resetPasswordStore.form.data.password
}

class ResetPasswordStore {
    @observable inProgress = false
    @observable passwordVisible = false
    @observable confirmPasswordVisible = false
    @observable form = new Form({
        password: '',
        confirmPassword: ''
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

    @action resetPassword() {
        // this.inProgress = true
        
        // return api.resetPassword(this.form.data)
        //     .then(({ data }) => console.log(data))
        //     .catch(action((err) => { throw err }))
        //     .finally(action(() => { this.inProgress = false }))
    }

    @action togglePassword() {
        this.passwordVisible = !this.passwordVisible
    }

    @action toggleConfirmPassword() {
        this.confirmPasswordVisible = !this.confirmPasswordVisible
    }
}

const resetPasswordStore = new ResetPasswordStore()

export default resetPasswordStore