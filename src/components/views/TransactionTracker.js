import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import jwt from 'jwt-simple'
import Cookie from 'js-cookie'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { abandonOrder, getStatus, fetchConsts } from '../../Redux/actions'
import Header from '../core/Header'
import Nav from '../core/Nav'

class TransactionTracker extends Component {
  constructor() {
    super()
    this.state = {
      timerId: null,
      timer: 0,
      refreshTime: 10
    }
    this.tick = this.tick.bind(this)
    this.initInterval = this.initInterval.bind(this)
    this.fetchStatus = this.fetchStatus.bind(this)
  }

  componentWillMount() {
    this.fetchStatus()
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId)
  }

  initInterval() {
		clearInterval(this.state.timerId)
    const timerId = setInterval(this.tick, 1000)
		this.setState({ timerId })
	}

  tick() {
    console.log(this.state.timer, this.state.refreshTime)
    if (this.state.timer < this.state.refreshTime) {
      this.setState({ timer: this.state.timer + 1 })
    } else {
      clearInterval(this.state.timerId)
      this.fetchStatus()
    }
  }

  fetchStatus() {
    let userData = null
		let user = null
		const token = localStorage.getItem('user')
		const sessionId = Cookie.get('CT-SESSION-ID')
		try {
			userData = jwt.decode(token, process.env.APP_SECRET_KEY)
			user = userData && JSON.parse(userData)
		} catch (e) {
		} finally {
			if (user && user.CtUserId && sessionId) {
        console.log(this.props.match.params.txnID)
        this.props.getStatus({
          orderId: this.props.match.params.txnID,
          ctUser: user.CtUserId
        })
        this.props.fetchConsts()
			} else {
				this.props.history.push('/login', {
					redirectPath: this.props.history.location.pathname
				})
			}
    }
  }

  componentWillReceiveProps(props) {
    const { limit, status } = props
    if (limit.const && status) {
      this.initInterval()
      const refreshTime = 10
      this.setState({ refreshTime, timer: 0 })
    }
  }

  render() {
    const { loading, status } = this.props.order
    return (
      <div className="full-height" style={{ backgroundColor: '#f4f7fa' }}>
				<Header background="solid">
					<Nav heading="Track your transaction" />
				</Header>

        <div className="container">
          <div className="row mt-4">
            <div className="col-12 col-lg-7 col-xl-6 text-center">
              <div className="main-calc-wrapper mt-5">
                {status && status.Status.SETTLED ?
                <div className={cn(
                  'd-flex justify-content-between transaction-row px-4 py-3',
                  (status.Status.FAILED || status.Status.TERMINATED) ? 'error' : status.Status.SENT ? 'sent' : '')}>
                  <div>
                    {(status.Status.FAILED || status.Status.TERMINATED) ? <i className="far fa-exclamation-circle fa-lg text-white mr-3"></i> :
                    !status.Status.SENT ? <i className="fas fa-spinner-third fa-lg fa-spin mr-3"></i>
                    : <i className="far fa-check fa-lg mr-3"></i>}
                    {status.Status.TERMINATED ? 'Transaction error' : 'Coin Sent'}
                  </div>
                  {status.Status.TERMINATED ? <div>
                    <Moment format="hh:mm A">{status.Status.TERMINATED}</Moment>
                  </div> : status.Status.FAILED ? <div>
                    <Moment format="hh:mm A">{status.Status.FAILED}</Moment>
                  </div> : status.Status.SENT ? <div>
                    <Moment format="hh:mm A">{status.Status.SENT}</Moment>
                  </div> : ''}
                </div>: ''}
                {status && status.Status.CLEARING ?
                <div className={cn('d-flex justify-content-between transaction-row mt-4 px-4 py-3', status.Status.REVIEW ? 'error' : '')}>
                  <div>
                    {status.Status.REVIEW ? <i className="far fa-exclamation-circle fa-lg text-white mr-3"></i> :
                    !status.Status.SETTLED ? <i className="fas fa-spinner-third fa-lg fa-spin mr-3"></i>
                    : <i className="far fa-check fa-lg mr-3"></i>}
                    {status.Status.REVIEW ? 'Payment error' : 'Payment received'}
                  </div>
                  {status.Status.REVIEW ? <div>
                    <Moment format="hh:mm A">{status.Status.REVIEW}</Moment>
                  </div> : status.Status.SETTLED ? <div>
                    <Moment format="hh:mm A">{status.Status.SETTLED}</Moment>
                  </div>: ''}
                </div>: ''}
                <div className="d-flex justify-content-between transaction-row mt-4 px-3 py-2 px-md-4 py-md-3">
                  <div>
                    {status && status.Status.SETTLED && loading ?
                    <i className="fas fa-spinner-third fa-lg fa-spin mr-3"></i> :
                    <i className="far fa-check fa-lg mr-3"></i>}
                    You sent payment
                  </div>
                  {status && status.Status.CLEARING ? <div className="text-nowrap">
                    <Moment format="hh:mm A">{status.Status.CLEARING}</Moment>
                  </div>: ''}
                </div>
              </div>
            </div>
						<div className="info-column col-12 col-lg-4"></div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.order)
  return {
    order: state.order,
    limit: state.limit
  }
}

export default connect(mapStateToProps, { abandonOrder, getStatus, fetchConsts })(TransactionTracker)

TransactionTracker.propTypes = {
  heading: PropTypes.string
}