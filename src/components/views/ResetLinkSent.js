import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Form from '../../helpers/Form'

class SignIn extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="container-full">
                <div className="form-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-6">
                                <Link to='/'>
                                    <img src="/img/logo-color.svg" alt="Cointec Logo" className="mb-5" />
                                </Link>

                                <h1 className="page-title">Check your inbox!</h1>

                                <div className="als-content">
                                    <h1 className="heading">We sent you a link to reset your password. </h1>
                                    <p className="desc">If you don't see the message in a few minutes, check your spam folder.</p>
                                    <button className="btn btn-primary">Resend Email</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="greetings">
                    <div className="content-wrapper">
                        <h1 className="heading">Check your inbox!</h1>
                        <p className="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu lobortis est. Nullam quis augue eu.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn