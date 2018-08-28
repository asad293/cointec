import React, { Component } from 'react'
import { fetchQuote, fetchConsts } from '../../../Redux/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Recaptcha from 'react-grecaptcha'
import Clipboard from 'react-clipboard.js'
import MinutesFormat from '../MinutesFormat'


// const sitekey = '6Ld5nFUUAAAAANRvB37_utUYF0-keXqw_i105cGm'
const sitekey = '6LcopGcUAAAAALwksZY5mpplDNxtR8trVNiyMyRY'

class ReviewForm extends Component {
  constructor() {
    super()
    this.state = {
      timerId: null,
      timer: 0,
      buttonIsDisabled: true,
      refreshTime: 60,
      showCaptcha: false,
      exchangeRate: null
    }

    this.tick = this.tick.bind(this)
    this.initInterval = this.initInterval.bind(this)
    this.fetchCalls = this.fetchCalls.bind(this)
    this.updateLimit = this.updateLimit.bind(this)
    this.updateRate = this.updateRate.bind(this)
    this.renderButton = this.renderButton.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  tick() {
    if (this.state.timer < this.state.refreshTime) {
      this.setState({ timer: this.state.timer + 1 })
    } else {
      clearInterval(this.state.timerId)
      this.fetchCalls()
    }
  }

  initInterval() {
		clearInterval(this.state.timerId)
    const timerId = setInterval(this.tick, 1000)
		this.setState({ timerId })
	}

  componentWillMount() {
    this.initInterval()
    this.fetchCalls()
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId)
  }

  fetchCalls() {
    this.props.fetchQuote({
      SendCurrency: this.props.sendCurrency,
      ReceiveCurrency: this.props.receiveCurrency,
      SendAmount: this.props.sendAmount
    })
		this.props.fetchConsts()
  }

  onVerify = (response) => {
    console.log(response)
    this.setState({ buttonIsDisabled: false })
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
  }

  onSubmit(event) {
    event.preventDefault()
    // const createdAt = new Date().getTime() / 1000.0
    // this.props.createOrder({
    //   destAmount: this.props.receiveAmount, 
    //   sourceAmount: this.props.sendAmount,
    //   destCurrency: this.props.receiveCurrency, 
    //   sourceCurrency: this.props.sendCurrency,
    //   exchangeRate: this.props.rate,
    //   dest: this.props.wallet,
    //   ctUser: this.props.ctUser,
    //   createdAt
    // })
    this.props.onConfirm({
      rate: this.state.exchangeRate
    })
  }

  render() {
    const { sendAmount, receiveAmount, sendCurrency, receiveCurrency, rate, wallet } = this.props

    return (
      <div>
        <div className="main-calc-wrapper mt-5">
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
                  expiredCallback={this.onExpired.bind(this)}
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
        <p className="text-left mt-3">
          Exchange rate will update in: <MinutesFormat seconds={this.state.refreshTime - this.state.timer} />
        </p>
      </div>
    )
  }

  componentWillReceiveProps(props) {
    this.updateLimit(props)
    this.updateRate(props)
  }

  updateLimit({ limit }) {
		if (limit.const) {
			const refreshTime = limit.const.Frame2Refresh
      this.initInterval()
      this.setState({ refreshTime, timer: 0 })
		}
  }
  
  updateRate(props) {
		this.setState({ exchangeRate: Number.parseFloat(props.quote.ExchangeRate) })
	}

}

const mapStateToProps = (state) => {
  return {
    bank: state.bank,
    limit: state.limit,
    quote: state.quote
  }
}

export default connect(mapStateToProps, {
  fetchQuote,
  fetchConsts
})(ReviewForm)

ReviewForm.propTypes = {
  sendAmount: PropTypes.number,
  receiveAmount: PropTypes.number,
  sendCurrency: PropTypes.string,
  receiveCurrency: PropTypes.string,
  rate: PropTypes.number,
  wallet: PropTypes.string,
  ctUser: PropTypes.number,
  onConfirm: PropTypes.func
}