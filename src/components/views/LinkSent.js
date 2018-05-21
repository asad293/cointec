import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import FormWrapper from '../core/FormWrapper'
import Greetings from '../core/Greetings'

class SignIn extends Component {
    constructor() {
        super()
    }

    render() {
        const { type } = this.props.match.params
        const heading = 
            type == 'activation' ? 'We sent you an activation link. ' :
            type == 'reset' ? 'We sent you a link to reset your password. ' : ''

        return (
            <FormWrapper>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-xl-4 form-section">
                            <Link to='/'>
                                <img src="/img/logo-color.svg" alt="Cointec Logo" className="mb-5" />
                            </Link>

                            <h1 className="page-title">Check your inbox!</h1>

                            <div className="als-content">
                                <h1 className="heading">{heading}</h1>
                                <p className="desc">If you don't see the message in a few minutes, check your spam folder.</p>
                                <button className="btn btn-primary">Resend Email</button>
                            </div>
                        </div>

                        <Greetings
                            heading="Check your inbox!"
                            messageText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu lobortis est. Nullam quis augue eu." />
                    </div>
                </div>
            </FormWrapper>
        )
    }
}

export default SignIn