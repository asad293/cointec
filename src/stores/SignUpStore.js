import { action, observable } from 'mobx'
import Form from '../helpers/Form'
import api from '../api'

const validators = {
    firstName: value => value.length < 3,
    lastName: value => value.length < 2,
    emailAddress: value => {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return !regex.test(value)
    },
    password: {
        minLength: value => value.length < 8,
        containUpper: value => !/(?=.*[A-Z])/.test(value),
        containNumber: value => !/(?=.*\d)/.test(value)
    }
}

class SignUpStore {
    @observable inProgress = false
    @observable passwordVisible = false
    @observable form = new Form({
        firstName: '',
        lastName: '',
        emailAddress: '',
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

    @action signUp() {
        this.inProgress = true
        
        return api.signUp(this.form.data)
            .then(({ data }) => console.log(data))
            .catch(action((err) => { throw err }))
            .finally(action(() => { this.inProgress = false }))
    }

    @action togglePassword() {
        this.passwordVisible = !this.passwordVisible
    }
}

export default new SignUpStore()