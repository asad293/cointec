import React, { Component } from 'react'
import { formValueSelector, Field, reduxForm } from 'redux-form'
import cn from 'classnames'
import { fetchAccounts } from '../../../Redux/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class CreateOrderForm extends Component {
  constructor() {
    super()
    this.state = {
      timerId: null,
      timer: 0,
      refreshTime: 10,
      // buttonIsDisabled: true,
    }

    this.tick = this.tick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderButton = this.renderButton.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  tick() {
    this.setState({ timer: this.state.timer + 1 })
  }

  handleChange(event) {
    if (event.target.value === 'addBank')
      $('#add-bank-account-modal').modal('toggle')
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId)
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
    this.props.onConfirm()
  }

  renderScreen() {
    const { sendAmount, bank: { accounts }, sendFromAccount } = this.props
    const { AccountOwner, SortCode, AccountReference, AccountNumber } = sendFromAccount || {}

    return (
      <div className="main-calc-wrapper">
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
    )
  }

  render() {
    if (this.props.sendCurrency === 'GBP')
      return this.renderScreen()
    else
      return (
        <div className="main-calc-wrapper">
          <form>
            <div className="row">
              <div className="col-12">
                <h5>Wallet transfer coming soon</h5>
              </div>
            </div>
          </form>
        </div>
      )
  }

  componentWillReceiveProps(props) {
    const { bank: { accounts, loading }, ctUser } = props

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
  return { bank: state.bank, sendFrom, sendFromAccount }
}

export default reduxForm({ form: 'CreateOrderForm' })(
  connect(mapStateToProps, { fetchAccounts })(CreateOrderForm)
)

CreateOrderForm.propTypes = {
  sendAmount: PropTypes.number,
  receiveAmount: PropTypes.number,
  sendCurrency: PropTypes.string,
  receiveCurrency: PropTypes.string,
  rate: PropTypes.number,
  wallet: PropTypes.string,
  ctUser: PropTypes.number,
  onConfirm: PropTypes.func
}