import React, { Component } from 'react'
import axios from 'axios'

class Subscribe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            staticEmail: '',
            statusMessage: ''
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.clearMessage)
        document.addEventListener('scroll', this.clearMessage)
    }

    clearMessage = () => { this.setState({ statusMessage: '' }) }
    handleInputChange = ({ target }) => this.setState({staticEmail: target.value})
    validateEmail = () => {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regex.test(this.state.staticEmail)) {
            this.setState({
                statusMessage: 'Invalid email address - try again'
            })
            return false
        }
        this.clearMessage()
        return true
    }

    handleSubmit = event => {
        event.preventDefault()

        if (this.validateEmail()) {
            const data = { email: this.state.staticEmail }
            const headers = { 'Content-Type': 'application/json' }
            axios.post('https://ct-emails-production.azurewebsites.net/subscribe', data, { headers })
                .then(response => {
                    this.setState({
                        staticEmail: '',
                        statusMessage: 'You’re early access pass is on its way!'
                    })
                })
                .catch(error => {
                    this.setState({ statusMessage: 'You’ve already subscribed!' })
                })
        }
    }

    render() {
        return (
            <div className="bg-gradient bg-primary-gradient-up py-2 py-md-2">

                <div className="start-buying-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-8 col-lg-6 mx-auto text-center">
                                <h2 className="start-buying-title mb-5 text-white">
                                    Subscribe for <strong>early access.</strong>
                                </h2>

                                {/* <form className="d-flex justify-content-center" onSubmit={this.handleSubmit.bind(this)} noValidate autoComplete="off"> */}
                                    {/* <div className="start-buying-email-wrapper form-group mb-2 col-md-8">
                                        <label htmlFor="staticEmail" className="sr-only">Email</label>
                                        <input
                                            type="email"
                                            name="staticEmail"
                                            className="form-control py-2"
                                            placeholder="Enter your email"
                                            value={this.state.staticEmail}
                                            onChange={this.handleInputChange.bind(this)} />
                                    </div> */}
                                    
                                    <div className="form-group mb-2">
                                        <button type="submit" className="btn btn-success py-2 px-4 col-sm-4" data-toggle="modal" data-target="#subscribe-modal">Subscribe</button>
                                    </div>
                                {/* </form> */}
                                {/* <div className="text-white status-message">{this.state.statusMessage}</div> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Subscribe