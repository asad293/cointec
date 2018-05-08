import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Greetings from '../core/Greetings'
import PasswordToggle from '../core/PasswordToggle'

@inject('signInStore')
@observer
class SignIn extends Component {

    validate = event => this.props.signInStore.validate(event.target.name)
    handleInputChange = event => this.props.signInStore.setData(event.target.name, event.target.value)
    togglePassword = () => this.props.signInStore.togglePassword()
    handleSubmit = event => {
        event.preventDefault()

        this.props.signInStore.validate()

        if (this.props.signInStore.form.valid) {
            this.props.signInStore.signIn()
                .then(this.authComplete)
        }
    }

    authComplete = () => this.props.history.push('/')

    render() {
        const { form, passwordVisible, inProgress, responseError } = this.props.signInStore

        const labelEmail = form.isValid('email') ? 'Email' : 'Please enter a valid email'
        const labelPassword = form.isValid('password') ? 'Password' : 'Please enter a valid password'

        return (
            <div className="container-full">
                <div className="form-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-6">
                                <Link to='/'>
                                    <img src="/img/logo-color.svg" alt="Cointec Logo" className="mb-5" />
                                </Link>

                                <h1 className="page-title">Sign In</h1>
                                <div className="form-error" style={{'visibility': responseError ? 'visible' : 'hidden'}}>Sorry, that email or password didn't work.</div>

                                <form className="signin-form" onSubmit={this.handleSubmit.bind(this)} noValidate>
                                    <div className={'form-group ' + (!form.isValid('email') ? 'invalid' : '')}>
                                        <label htmlFor="email">{labelEmail}</label>
                                        <input
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            placeholder="email@cointec.co.uk"
                                            value={form.data.email}
                                            onBlur={this.validate.bind(this)}
                                            onChange={this.handleInputChange.bind(this)} />
                                    </div>

                                    <div className={'form-group ' + (!form.isValid('password') ? 'invalid' : '')}>
                                        <label htmlFor="password">{labelPassword}</label>
                                        <div className="position-relative">
                                            <input
                                                name="password"
                                                type={passwordVisible ? 'text' : 'password'}
                                                className="form-control password"
                                                placeholder="••••••••"
                                                value={form.data.password}
                                                onBlur={this.validate.bind(this)}
                                                onChange={this.handleInputChange.bind(this)}
                                                autoComplete="off" />
                                                
                                            <PasswordToggle visible={passwordVisible} onToggle={this.togglePassword.bind(this)} />

                                            {/* <div className="typing-validator">8 or more character</div> */}
                                        </div>
                                    </div>

                                    <Link to='/forgot-password' className="d-block link-forgot-password">Forgot password?</Link>

                                    <button type="submit" className="btn btn-primary" disabled={inProgress}>
                                        {inProgress ? <div><i className="fas fa-spinner fa-spin"></i></div>: <span>Sign in</span>}
                                    </button>

                                    <p className="have-account">Don’t have an account? <Link to='/signup'>Sign up</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <Greetings
                    heading="Welcome back!"
                    messageText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu lobortis est. Nullam quis augue eu." />
            </div>
        )
    }
}

export default SignIn