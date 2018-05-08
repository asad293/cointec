import { action, observable } from 'mobx'
import Form from '../helpers/Form'
import api from '../api'

const validators = {
    emailAddress: value => {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return !regex.test(value)
    }
}

class ForgotPasswordStore {
    @observable inProgress = false
    @observable form = new Form({ emailAddress: '' }, validators)
    
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

    @action forgotPassword() {
        this.inProgress = true
        
        return api.forgotPassword(this.form.data)
            .then(({ data }) => { console.log(data); this.inProgress = false })
            .catch(action((err) => { console.log(err); this.inProgress = false; throw err }))
    }
}

export default new ForgotPasswordStore()