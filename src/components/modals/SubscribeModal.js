import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class SubscribeModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailSent: false,
      staticEmail: '',
      errorMessage: '',
      accepted: false,
      acceptedError: false,
      inProgress: false
    }
  }

  clearMessage = () => { this.setState({ errorMessage: '' }) }
  handleInputChange = ({ target }) => this.setState({ staticEmail: target.value })
  accept = ({ target }) => {
    if (this.state.acceptedError) {
      this.setState({
        accepted: target.checked,
        acceptedError: !target.checked
      })
    } else {
      this.setState({ accepted: target.checked })
    }
  }

  validateEmail = () => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regex.test(this.state.staticEmail)) {
      this.setState({ errorMessage: 'Invalid email address' })
      return false
    }
    this.clearMessage()
    return true
  }

  handleSubmit = event => {
    event.preventDefault()

    this.setState({ acceptedError: !this.state.accepted })

    if (this.validateEmail() && this.state.accepted) {
      this.setState({ inProgress: true })
      const data = { email: this.state.staticEmail }
      const headers = { 'Content-Type': 'application/json' }
      axios.post('https://ct-emails-production.azurewebsites.net/subscribe', data, { headers })
        .then(response => {
          this.setState({ emailSent: true, inProgress: false })
        })
        .catch(error => {
          this.setState({ errorMessage: 'You have already subscribed', inProgress: false })
        })
    }
  }

  render() {
    return (
      <div className="modal fade" id="subscribe-modal" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-subscribe" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>

              <h5 className="modal-heading">
                {!this.state.emailSent ? 'Be the first to use our platform!' : 'Early access email sent!'}
              </h5>
              <div className="text-center">
                <img src={!this.state.emailSent ? '/img/eth.svg' : '/img/eth-green.svg'} alt="logo" />
              </div>

              {!this.state.emailSent ?
              <form onSubmit={this.handleSubmit.bind(this)} noValidate autoComplete="off">
                <div className="form-group mb-3">
                  <label className={'subscribe-email-label ' + (this.state.errorMessage ? 'invalid' : '')} htmlFor="staticEmail">
                    { this.state.errorMessage ? this.state.errorMessage : 'Email address' }
                  </label>
                  <input
                    type="email"
                    name="staticEmail"
                    className="form-control py-2"
                    placeholder="Enter your email address"
                    value={this.state.staticEmail}
                    onChange={this.handleInputChange.bind(this)} />
                </div>

                <div className={this.state.acceptedError ? 'invalid' : ''}>
                  <input type="checkbox" value={this.state.accepted} onChange={this.accept.bind(this)} name="checkbox" />
                  <label htmlFor="checkbox">I have read and accept the <Link to='/privacy'>privacy policy</Link></label>
                </div>
                
                <div className="form-group mb-2">
                  <button type="submit" className="btn btn-primary btn-block py-2 px-4" disabled={this.state.inProgress}>
                    {this.state.inProgress ? <div><i className="fas fa-spinner fa-spin"></i></div> : <span>Subscribe for early access</span>}
                  </button>
                </div>
              </form> :
              <div className="success-message">
                <p>Check your inbox to verify your email address and confirm your early access!</p>
                <p>If you don't see the message in a few minutes check your spam folder.</p>
                <button type="submit" className="btn btn-link btn-block py-2 px-4 mt-3">Resend email</button>
              </div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SubscribeModal