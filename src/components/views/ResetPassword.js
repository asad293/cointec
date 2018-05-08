import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Greetings from '../core/Greetings'
import PasswordToggle from '../core/PasswordToggle'

@inject('resetPasswordStore')
@observer
class ResetPassword extends Component {

    validate = event => this.props.resetPasswordStore.validate(event.target.name)
    handleInputChange = event => this.props.resetPasswordStore.setData(event.target.name, event.target.value)
    togglePassword = () => this.props.resetPasswordStore.togglePassword()
    toggleConfirmPassword = () => this.props.resetPasswordStore.toggleConfirmPassword()
    handleSubmit = event => {
        event.preventDefault()

        this.props.resetPasswordStore.validate()

        if (this.props.resetPasswordStore.form.valid) {
            this.props.resetPasswordStore.resetPassword()
                // .then(this.onComplete)
        }
    }

    onComplete = () => {}

    render() {
        const { form, passwordVisible, confirmPasswordVisible } = this.props.resetPasswordStore

        const labelPassword = form.isValid('password') ? 'New Password' : 'Please enter a valid password'
        const labelConfirmPassword = form.isValid('confirmPassword') ? 'Confirm New Password' : 'Please enter a valid password'

        return (
            <div className="container-full">
                <div className="form-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-6">
                                <Link to='/'>
                                    <img src="/img/logo-color.svg" alt="Cointec Logo" className="mb-5" />
                                </Link>

                                <h1 className="page-title">Reset password</h1>

                                <form className="signin-form" onSubmit={this.handleSubmit.bind(this)} noValidate>
                                    <div className={'form-group ' + (!form.isValid('password') ? 'invalid' : '')}>
                                        <label htmlFor="password">{labelPassword}</label>
                                        <div className="position-relative">
                                            <input type={passwordVisible ? 'text' : 'password'}
                                                name="password"
                                                className="form-control password"
                                                placeholder="••••••••"
                                                value={form.data.password}
                                                onBlur={this.validate.bind(this)}
                                                onChange={this.handleInputChange.bind(this)} />

                                            <div className="validation-box">
                                                <h5 className="validation-heading">Password must contain:</h5>
                                                <ul className="validation-rules">
                                                    <li className={!form.check('password', 'minLength') ? 'passed' : ''}>At least 8 characters</li>
                                                    <li className={!form.check('password', 'containUpper') ? 'passed' : ''}>At least 1 capital letter</li>
                                                    <li className={!form.check('password', 'containNumber') ? 'passed' : ''}>At least 1 number</li>
                                                </ul>
                                            </div>

                                            <PasswordToggle visible={passwordVisible} onToggle={this.togglePassword.bind(this)} />
                                        </div>
                                    </div>

                                    <div className={'form-group ' + (!form.isValid('confirmPassword') ? 'invalid' : '')}>
                                        <label htmlFor="password">{labelConfirmPassword}</label>
                                        <div className="position-relative">
                                            <input type={confirmPasswordVisible ? 'text' : 'password'}
                                                name="confirmPassword"
                                                className="form-control password"
                                                placeholder="••••••••"
                                                value={form.data.confirmPassword}
                                                onBlur={this.validate.bind(this)}
                                                onChange={this.handleInputChange.bind(this)} />

                                            <div className="validation-box">
                                                <ul className="validation-rules">
                                                    <li className={!form.check('confirmPassword') ? 'passed' : ''}>Passwords must match</li>
                                                </ul>
                                            </div>

                                            <PasswordToggle visible={confirmPasswordVisible} onToggle={this.toggleConfirmPassword.bind(this)} />
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Confirm</button>
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

export default ResetPassword