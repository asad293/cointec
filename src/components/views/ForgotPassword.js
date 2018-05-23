import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import FormWrapper from '../core/FormWrapper'
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

    resetEmailSent = () => this.props.history.push('/link-sent/reset')

    render() {
        const { form, inProgress } = this.props.forgotPasswordStore
        const { token } = this.props.match.params

        const labelEmail = form.isValid('emailAddress') ? 'Email' : 'Please enter a valid email'

        return (
            <FormWrapper>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-xl-4 form-section">
                            <Link to='/'>
                                <img src="/img/logo-color.svg" alt="Cointec Logo" className="mb-5" />
                            </Link>

                            <h1 className="page-title">Reset password</h1>

                            <form className="als-content" onSubmit={this.handleSubmit.bind(this)} noValidate>
                                <h5 className="heading-line">
                                    {!token ? 
                                        'Please enter your email address to begin resetting your password.': 
                                        'To receive another password reset link, please enter your email below.'}
                                </h5>

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

                        <Greetings
                            heading={!token ? 'Reset password.' : 'Reset link expired'}
                            messageText={!token ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu lobortis est. Nullam quis augue eu.' : 'Your reset link expired after 24 hours or has already been used.'} />
                    </div>
                </div>
            </FormWrapper>
        )
    }
}

export default ForgotPassword