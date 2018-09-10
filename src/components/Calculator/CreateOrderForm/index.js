import React, { Component } from 'react'
import { formValueSelector, Field, reduxForm } from 'redux-form'
import cn from 'classnames'
import { fetchAccounts, fetchConsts, getStatus, createOrder, clearOrder } from '../../../Redux/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MinutesFormat from '../MinutesFormat'

class CreateOrderForm extends Component {
  constructor() {
    super()
    this.state = {
      timerId: null,
      timer: 0,
      refreshTime: 10,
      expired: false
      // buttonIsDisabled: true,
    }

    this.tick = this.tick.bind(this)
    this.initInterval = this.initInterval.bind(this)
    this.fetchCalls = this.fetchCalls.bind(this)
    this.startPayment = this.startPayment.bind(this)
    this.restart = this.restart.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderButton = this.renderButton.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  initInterval() {
		clearInterval(this.state.timerId)
    const timerId = setInterval(this.tick, 1000)
		this.setState({ timerId })
	}

  tick() {
    if (this.state.timer < this.state.refreshTime) {
      this.setState({ timer: this.state.timer + 1 })
    } else {
      clearInterval(this.state.timerId)
      this.setState({ expired: true })
    }
  }

  componentWillMount() {
    this.startPayment()
  }
  
  componentWillUnmount() {
    clearInterval(this.state.timerId)
  }

  fetchCalls() {
    this.props.fetchConsts()
  }

  startPayment() {
    const createdAt = new Date().getTime() / 1000.0
    this.props.createOrder({
      destAmount: this.props.receiveAmount, 
      sourceAmount: this.props.sendAmount,
      destCurrency: this.props.receiveCurrency, 
      sourceCurrency: this.props.sendCurrency,
      exchangeRate: this.props.rate,
      dest: this.props.wallet,
      ctUser: this.props.ctUser,
      createdAt
    })
    this.setState({ expired: false })
    this.initInterval()
    this.fetchCalls()
  }

  restart() {
    this.props.onRestart()
  }

  handleChange(event) {
    if (event.target.value === 'addBank')
      $('#add-bank-account-modal').modal('toggle')
  }
  
  renderButton() {
    //if(this.state.timer > this.state.refreshTime)
    //    return <button onClick={this.rateExpired} className={cn('btn-block btn-lg', 'btn-danger')}>Rate expired - click to refresh</button>
    //else
    return <button
      type="submit"
      className={cn('btn-block btn-lg btn-exchange no-border', 'btn-primary')}
      disabled={!this.props.sendFromAccount}>
        I have made payment
    </button>
  }

  onSubmit(event) {
    event.preventDefault()
    const { sendFromAccount, order, ctUser } = this.props
    this.props.clearOrder({
      orderId: order.create.CtTransactionId,
      accountId: sendFromAccount.id,
      ctUser
    })
    this.props.onConfirm({
      txnID: order.create.CtTransactionId
    })
  }

  renderScreen() {
    const { sendAmount, bank: { accounts }, sendFromAccount } = this.props
    const { AccountOwner, SortCode, AccountReference, AccountNumber } = sendFromAccount || {}

    return (
      <div>
        <div className="main-calc-wrapper mt-5">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-12 text-left">
                <label className="field-label m-0">Beneficiary</label>
                <p className="field-value">{AccountOwner || <br />}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <hr className="mt-0" />
              </div>
            </div>
            <div className="row">
              <div className="col-6 text-left text-nowrap">
                <label className="field-label m-0">Account number</label>
                <p className="field-value">{AccountNumber || 'XXXXXXXX'}</p>
              </div>
              <div className="col-6 text-left text-nowrap">
                <label className="field-label m-0">Sort code</label>
                <p className="field-value">{SortCode || 'XX-XX-XX'}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6 text-left text-nowrap">
                <label className="field-label m-0">Reference</label>
                <p className="field-value">{AccountReference || 'XXXXXXXX'}</p>
              </div>
              <div className="col-6 text-left text-nowrap">
                <label className="field-label m-0">Amount</label>
                <p className="field-value">£{sendAmount}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-left">
                <label className="field-label m-0">Send from</label>
                <Field
                  name="sendFrom"
                  component="select"
                  className="custom-select accounts-select"
                  onChange={this.handleChange}>
                  {accounts && accounts.map(account =>
                    <option value={account.id} key={account.id}>
                      {account.BankName} - {account.SortCode}
                    </option>
                  )}
                  <option value="addBank">Add a new bank</option>
                </Field>
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
          Make payement in: <MinutesFormat seconds={this.state.refreshTime - this.state.timer} />
        </p>
      </div>
    )
  }

  render() {
    if (!this.state.expired) {
      if (this.props.sendCurrency === 'GBP') {
        if (this.props.order.create && this.props.bank.accounts) {
          return this.renderScreen()
        } else if (this.props.order.loading || this.props.bank.loading) {
          return (
            <div className="main-calc-wrapper mt-5 d-flex">
              <div className="h-100 m-auto" style={{color: '#045CC7'}}>
                  <i className="fas fa-spinner-third fa-lg fa-spin mr-3"></i>
              </div>
            </div>
          )
        } else {
          return (
            <div className="main-calc-wrapper mt-5">
              <div className="row">
                <div className="col-12">
                  <h2 className="mt-5">Oops something went wrong</h2>
                  <img className="mt-4" src="/img/error.svg" alt="error" />
                  <p className="mt-4">We are working on getting the error fixed.  Please try to refresh the page or restart the process in a few minutes.</p>
                </div>
              </div>
            </div>
          )
        }
      } else
        return (
          <div className="main-calc-wrapper">
            <form>
              <div className="row">
                <div className="col-12">
                </div>
              </div>
            </form>
          </div>
        )
    } else {
      return (
        <div className="main-calc-wrapper mt-5">
          <div className="row">
            <div className="col-12">
              <h2 className="mt-5">Payement timeout</h2>
              <img className="mt-4" src="/img/error.svg" alt="error" />
              <p className="mt-4">Oops, looks like you ran out of time. Click the link below to restart the transaction.</p>
              <button className="btn-back" onClick={() => this.restart()}><span>Restart</span></button>
            </div>
          </div>
        </div>
      )
    }
  }

  componentWillReceiveProps(props) {
    const { bank: { accounts, loading }, order, limit, ctUser } = props

    if (!order.create || !accounts) {
      clearInterval(this.state.timerId)
    } else {
      if (limit.const) {
        const refreshTime = limit.const.PaymentWindow * 60
        if (this.state.refreshTime >= this.state.timer) {
          this.initInterval()
          this.setState({ refreshTime, timer: 0 })
        }
      }
    }

    if (!accounts && !loading)
      this.props.fetchAccounts(ctUser)
    
    if (accounts && !loading && !accounts.length)
      $('#add-bank-account-modal').modal('toggle')

    if (!this.props.sendFromAccount) {
      const sendFromAccount = accounts && accounts.length && accounts[0]
      if (sendFromAccount) {
        const sendFrom = sendFromAccount.id
        props.change('sendFrom', sendFrom)
        props.change('sendFromAccount', sendFromAccount)
      }
    }
  }

}

const mapStateToProps = (state) => {
  const selector = formValueSelector('CreateOrderForm')
  const sendFrom = selector(state, 'sendFrom')
  const sendFromAccount = state.bank.accounts && state.bank.accounts.find(account => account.id == sendFrom)
  // console.log(state.bank)
  return {
    order: state.order,
    limit: state.limit,
    bank: state.bank,
    sendFrom,
    sendFromAccount
  }
}

export default reduxForm({ form: 'CreateOrderForm' })(
  connect(mapStateToProps, {
    fetchAccounts,
    fetchConsts,
    getStatus,
    createOrder,
    clearOrder
  })(CreateOrderForm)
)

CreateOrderForm.propTypes = {
  sendAmount: PropTypes.number,
  receiveAmount: PropTypes.number,
  sendCurrency: PropTypes.string,
  receiveCurrency: PropTypes.string,
  rate: PropTypes.number,
  wallet: PropTypes.string,
  ctUser: PropTypes.number,
  onConfirm: PropTypes.func,
  onRestart: PropTypes.func,
}