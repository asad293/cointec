import React, { Component } from 'react'
import axios from 'axios'

class StartBuying extends Component {
    constructor(props) {
        super(props)
        this.state = {
            staticEmail: '',
            statusMessage: ''
        }
    }

    handleInputChange = ({ target }) => this.setState({staticEmail: target.value})
    validateEmail = () => {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regex.test(this.state.staticEmail)) {
            this.setState({
                statusMessage: 'Invalid email address - try again'
            })
            return false
        }
        this.setState({
            statusMessage: ''
        })
        return true
    }

    handleSubmit = event => {
        event.preventDefault()

        if (this.validateEmail()) {
            const data = { email: this.state.staticEmail }
            const headers = { 'Content-Type': 'application/json' }
            axios.post('https://ct-emails-production.azurewebsites.net/subscribe', data, { headers })
                .then(response => {
                    console.log(response);
                    this.setState({
                        staticEmail: '',
                        statusMessage: 'You’re early access pass is on its way!'
                    })
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ statusMessage: 'You’ve already subscribed!' })
                })
        }
    }

    render() {
        return (
            <div className="bg-gradient bg-primary-gradient-up py-2 py-md-5">

                <div className="start-buying-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-8 col-lg-6 mx-auto text-center">
                                <h2 className="start-buying-title mb-5 text-white">
                                    Start buying <strong>Bitcoins</strong> today
                                </h2>

                                <div className="start-buying-email-wrapper">
                                    <form className="d-flex justify-content-center" onSubmit={this.handleSubmit.bind(this)} noValidate autoComplete="off">
                                        <div className="form-group mb-2 d-none d-md-block col-md-8">
                                            <label htmlFor="staticEmail" className="sr-only">Email</label>
                                            <input
                                                type="email"
                                                name="staticEmail"
                                                className="form-control py-2"
                                                placeholder="Enter your email"
                                                value={this.state.staticEmail}
                                                onChange={this.handleInputChange.bind(this)} />
                                        </div>
                                        
                                        <div className="form-group mb-2">
                                            <button type="submit" className="btn btn-success py-2 px-4">Get Started</button>
                                        </div>
                                    </form>
                                    <div className="text-white">{this.state.statusMessage ? this.state.statusMessage : <br />}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default StartBuying