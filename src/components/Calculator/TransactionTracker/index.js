import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import cn from 'classnames'
import { createOrder, clearOrder, abandonOrder, getStatus } from '../../../Redux/actions'

class TransactionTracker extends Component {
  constructor() {
    super()
    this.state = {
      timerId: null,
      timer: 0,
      refreshTime: 10,
      clear: false,
      pollTime: 30,
    }
    this.tick = this.tick.bind(this)
  }

  tick() {
    console.log(this.props.order)
    if (this.props.order.create && this.state.timer % this.state.pollTime === 0)
      this.props.getStatus(this.props.order.create.CtTransactionId)
  
    this.setState({ timer: this.state.timer + 1 })
  }

  componentWillMount() {
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
    .then(response => {
      // console.log(response, this.props.order)
      if (response && response.status === 200) {
        this.props.clearOrder(this.props.order.create.CtTransactionId)
        let timerId = setInterval(this.tick, 1000)
        this.setState({ clear: true, timerId })
      }
    })
  }

  componentWillUnmount() {
      clearInterval(this.state.timerId)
  }

  render() {
    const { loading, create, status, error } = this.props.order

    return (
      <div className="main-calc-wrapper">
        {status && status.Status.SETTELED ?
        <div className={cn('d-flex justify-content-between transaction-row px-4 py-3', this.state.Status.SENT ? 'sent' : '')}>
          <div>
            {!status.Status.SENT
            ? <i className="fas fa-spinner-third fa-lg fa-spin mr-3"></i>
            : <i className="far fa-check fa-lg mr-3"></i>}
            Coin Sent
          </div>
          {status.Status.SENT ? <div>
            <Moment format="hh:mm A">{status.Status.SENT}</Moment>
          </div> : ''}
        </div>: ''}
        {status && status.Status.CLEARING ?
        <div className="d-flex justify-content-between transaction-row px-4 py-3">
          <div>
            {!status.Status.SETTELED
            ? <i className="fas fa-spinner-third fa-lg fa-spin mr-3"></i>
            : <i className="far fa-check fa-lg mr-3"></i>}
            Payment received
          </div>
          {status.Status.SETTELED ? <div>
            <Moment format="hh:mm A">{status.Status.SETTELED}</Moment>
          </div>: ''}
        </div>: ''}
        <div className="d-flex justify-content-between transaction-row mt-4 px-3 py-2 px-md-4 py-md-3">
          <div>
            {!create && loading ?
            <i className="fas fa-spinner-third fa-lg fa-spin mr-3"></i> :
            error ? <i className="far fa-times fa-lg text-danger mr-3"></i> :
            <i className="far fa-check fa-lg mr-3"></i>}
            {`${error ? error.response.data.Message : 'You sent payment'}`}
          </div>
          {status && status.Status.CLEARING && !error ? <div className="text-nowrap">
            <Moment format="hh:mm A">{status.Status.CLEARING}</Moment>
          </div>: ''}
        </div>
        {/* <hr />
        <div className="row">
          <div class="complete-ring"></div>
          <div className="col-md-12">
            <p className="info text-center">Your bitcoins are on the way!</p>
            <p className="info text-center"> <a href={`https://live.blockcypher.com/btc-testnet/tx/${this.props.txnID}`}>See it on the Blockchain.</a></p>
          </div>
        </div> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order
  }
}

TransactionTracker.propTypes = {
  // txnID: PropTypes.number,
  sendAmount: PropTypes.number,
  receiveAmount: PropTypes.number,
  sendCurrency: PropTypes.string,
  receiveCurrency: PropTypes.string,
  rate: PropTypes.number,
  wallet: PropTypes.string,
  ctUser: PropTypes.number
}

export default connect(mapStateToProps, { createOrder, clearOrder, abandonOrder, getStatus })(TransactionTracker)
