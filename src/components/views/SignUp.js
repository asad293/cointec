import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import FormWrapper from '../core/FormWrapper'
import Greetings from '../core/Greetings'
import PasswordToggle from '../core/PasswordToggle'

@inject('signUpStore')
@observer
class SignUp extends Component {

    validate = event => this.props.signUpStore.validate(event.target.name)
    handleInputChange = event => this.props.signUpStore.setData(event.target.name, event.target.value)
    togglePassword = () => this.props.signUpStore.togglePassword()
    handleSubmit = event => {
        event.preventDefault()

        this.props.signUpStore.validate()

        if (this.props.signUpStore.form.valid) {
            this.props.signUpStore.signUp()
                .then(this.authComplete)
        }
    }

    authComplete = () => this.props.history.push('/link-sent/activation')

    render() {
        const { form, passwordVisible, inProgress, responseError } = this.props.signUpStore

        const labelEmail = form.isValid('emailAddress') ? 'Email' : 'Please enter a valid email'
        const labelPassword = form.isValid('password') ? 'Password' : 'Please enter a valid password'

        return (
            <FormWrapper>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-xl-4 form-section">
                            <Link to='/'>
                                <img src="/img/logo-color.svg" alt="Cointec Logo" className="mb-5" />
                            </Link>

                            <h1 className="page-title">Sign Up</h1>
                            <div className="form-error" style={{'visibility': responseError ? 'visible' : 'hidden'}}>Email already exists. Please login</div>

                            <form className="signup-form" onSubmit={this.handleSubmit.bind(this)} noValidate>
                                <div className={'form-group ' + (!form.isValid('emailAddress') ? 'invalid' : '')}>
                                    <label htmlFor="emailAddress">{labelEmail}</label>
                                    <input
                                        name="emailAddress"
                                        type="email"
                                        className="form-control"
                                        placeholder="email@cointec.co.uk"
                                        value={form.data.emailAddress}
                                        onBlur={this.validate.bind(this)}
                                        onChange={this.handleInputChange.bind(this)}
                                        autoComplete="email" />
                                </div>

                                <div className={'form-group ' + (!form.isValid('password') ? 'invalid' : '') + ' ' + ((!!form.data['password'] && !form.check('password')) ? 'valid' : '')}>
                                    <label htmlFor="password">{labelPassword}</label>
                                    <div className="password-validation position-relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={passwordVisible ? 'text' : 'password'}
                                            className="form-control password"
                                            placeholder="••••••••"
                                            value={form.data.password}
                                            onBlur={this.validate.bind(this)}
                                            onChange={this.handleInputChange.bind(this)}
                                            autoComplete="off" />

                                        <PasswordToggle visible={passwordVisible} onToggle={this.togglePassword.bind(this)} />

                                        <div className="typing-validator">8 or more character</div>
                                    </div>
                                </div>

                                <div className="agree-statment">
                                    <input type="checkbox" value="" name="checkbox" />
                                    <label htmlFor="checkbox">I agree with the <Link to='/terms'>terms and conditions</Link></label>
                                </div>

                                <button type="submit" className="btn btn-primary" disabled={inProgress}>
                                    {inProgress ? <div><i className="fas fa-spinner fa-spin"></i></div>: <span>Create an account</span>}
                                </button>

                                <p className="have-account">Already have an account? <Link to='/login'>Sign in</Link></p>
                            </form>
                        </div>

                        <Greetings
                            heading="Welcome back!"
                            messageText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu lobortis est. Nullam quis augue eu." />
                    </div>
                </div>
            </FormWrapper>
        )
    }
}

export default SignUp