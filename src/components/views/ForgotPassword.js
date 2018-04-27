import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Greetings from '../core/Greetings'

@inject('forgotPasswordStore')
@observer
class ForgotPassword extends Component {

    validate = event => this.props.forgotPasswordStore.validate(event.target.name)
    handleInputChange = event => this.props.forgotPasswordStore.setData(event.target.name, event.target.value)
    handleSubmit = event => {
        event.preventDefault()

        this.props.forgotPasswordStore.validate()

        if (this.props.forgotPasswordStore.form.valid) {
            this.props.forgotPasswordStore.forgotPassword()
                .then(this.resetEmailSent)
        }
    }

    resetEmailSent = () => this.props.history.push('/reset-link-sent')

    render() {
        const { form, inProgress } = this.props.forgotPasswordStore

        const labelEmail = form.isValid('emailAddress') ? 'Email' : 'Please enter a valid email'

        return (
            <div className="container-full">
                <div className="form-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-6">
                                <Link to='/'>
                                    <img src="./img/logo-color.svg" alt="Cointec Logo" className="mb-5" />
                                </Link>

                                <h1 className="page-title">Reset password</h1>

                                <form className="signin-form" onSubmit={this.handleSubmit.bind(this)} noValidate>
                                    <h5 className="heading-line">Please enter your email address to begin resetting your password.</h5>

                                    <div className={'form-group ' + (!form.isValid('emailAddress') ? 'invalid' : '')}>
                                        <label htmlFor="email">{labelEmail}</label>
                                        <input
                                            name="emailAddress"
                                            type="email"
                                            className="form-control"
                                            placeholder="email@cointec.co.uk"
                                            value={form.data.emailAddress}
                                            onBlur={this.validate.bind(this)}
                                            onChange={this.handleInputChange.bind(this)} />
                                    </div>

                                    <button type="submit" className="btn btn-primary" disabled={inProgress}>
                                        {inProgress ? <i className="fas fa-spinner fa-spin"></i>: 'Send reset email'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <Greetings
                    heading="Reset password."
                    messageText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu lobortis est. Nullam quis augue eu." />
            </div>
        )
    }
}

export default ForgotPassword