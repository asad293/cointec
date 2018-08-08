import React, { Component } from 'react'
import { formValueSelector, reduxForm } from 'redux-form'
import cn from 'classnames'
import { fetchQuote } from '../../../Redux/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Recaptcha from 'react-grecaptcha'
import Clipboard from 'react-clipboard.js'

// const sitekey = '6Ld5nFUUAAAAANRvB37_utUYF0-keXqw_i105cGm'
const sitekey = '6LcopGcUAAAAALwksZY5mpplDNxtR8trVNiyMyRY'

class ReviewForm extends Component {
  constructor() {
    super()
    this.state = {
      timerId: null,
      timer: 0,
      buttonIsDisabled: true,
      refreshTime: null,
      showCaptcha: false
    }

    this.renderButton = this.renderButton.bind(this)
    this.rateExpired = this.rateExpired.bind(this)
    this.tick = this.tick.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  tick() {
    this.setState({ timer: this.state.timer + 1 })
  }

  componentWillMount() {
    let timerId = setInterval(this.tick, 1000)
    this.setState({ timerId, refreshTime: this.props.refreshTime })
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId)
  }

  rateExpired() {
    // reset timer
    this.props.fetchQuote({ SendAmount: this.props.sendAmount })
    this.setState({ timer: 0 })
  }

  onVerify = (response) => {
    console.log(response)
    this.setState({
      buttonIsDisabled: false
    })
    // this.props.callback('third')
  }

  onExpired = () => {
    console.log(`Recaptcha expired`)
  }

  renderButton() {
    return (
      <button
        type="submit"
        className="btn-block btn-lg btn-exchange no-border btn-primary"
        disabled={this.state.buttonIsDisabled}>
        Continue to payment
      </button>
    )
    // const expired = this.state.timer > this.state.refreshTime
    // return (
    //   <button
    //     type="submit"
    //     onClick={expired ? this.rateExpired : this.handleContinue}
    //     className={cn('btn-block btn-lg btn-exchange no-border', expired ? 'btn-danger' : 'btn-primary')}
    //     disabled={this.state.buttonIsDisabled}>
    //     {expired ? 'Rate expired - click to refresh' : 'Continue to payment'}
    //   </button>
    // )
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.onConfirm()
  }

  render() {
    const { sendAmount, receiveAmount, sendCurrency, receiveCurrency, rate, wallet } = this.props

    return (
      <div className="main-calc-wrapper">
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-5 text-left text-nowrap">
              <label className="field-label m-0">You send</label>
              <p className="field-value">{`${sendAmount.toFixed(8)} ${sendCurrency}`}</p>
            </div>
            <div className="col-2 text-center"><br /><i className="fas fa-arrow-right"></i></div>
            <div className="col-5 text-left text-nowrap">
              <label className="field-label m-0">You receive</label>
              <p className="field-value">{`${receiveAmount.toFixed(8)} ${receiveCurrency}`}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <hr className="mt-0" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-left">
              <label className="field-label m-0">Exchange rate</label>
              <p className="field-value">
                {`${sendCurrency === 'GBP' ? rate.toFixed(2) : rate.toFixed(8)} ${sendCurrency}/${receiveCurrency}`}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-left">
              <label className="field-label m-0 d-flex">External wallet address</label>
              <Clipboard className="field-value wallet-field text-nowrap" data-clipboard-text={wallet}>
                <p>{wallet} <i className="ml-2 far fa-copy"></i></p>
              </Clipboard>
            </div>
          </div>
          <div className="row">
            <div className="mt-2 col-md-12">
              <Recaptcha
                sitekey={sitekey}
                callback={this.onVerify}
                expiredCallback={this.onExpired}
                locale="en"
                size="compact"
                data-theme="light" />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              {this.renderButton()}
            </div>
          </div>
        </form>
      </div>
    )
  }

  componentWillReceiveProps(props) {
  }

}

const mapStateToProps = (state) => {
  const selector = formValueSelector('ReviewForm')
  return { bank: state.bank }
}

export default reduxForm({ form: 'ReviewForm' })(
  connect(mapStateToProps, { fetchQuote })(ReviewForm)
)

ReviewForm.propTypes = {
  sendAmount: PropTypes.number,
  receiveAmount: PropTypes.number,
  sendCurrency: PropTypes.string,
  receiveCurrency: PropTypes.string,
  rate: PropTypes.number,
  refreshTime: PropTypes.number,
  wallet: PropTypes.string,
  onConfirm: PropTypes.func
}