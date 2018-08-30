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
      refreshTime: 10
    }
    this.initInterval = this.initInterval.bind(this)
    this.fetchStatus = this.fetchStatus.bind(this)
  }

  componentWillMount() {
    this.fetchStatus()
    this.initInterval()
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId)
  }

  initInterval() {
		clearInterval(this.state.timerId)
    const timerId = setInterval(this.fetchStatus, this.state.refreshTime * 1000)
		this.setState({ timerId })
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
        this.props.getStatus({
          orderId: this.props.match.params.txnID,
          ctUser: user.CtUserId
        })
        // this.props.fetchConsts()
			} else {
				this.props.history.push('/login', {
					redirectPath: this.props.history.location.pathname
				})
			}
    }
  }

  componentWillReceiveProps(props) {
    const { status } = props
    console.log('status', status)
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
                {status ? <TransactionStatus Status={status.Status} loading={loading} />: ''}
              </div>
            </div>
						<div className="info-column col-12 col-lg-4"></div>
          </div>
        </div>
      </div>
    )
  }
}

const TransactionStatus = ({
  Status: {
    CLEARING,
    SETTLED,
    REVIEW,
    TERMINATED,
    SENT,
    FAILED,
    ABANDONED
  },
  loading
}) => (
  <div>
    {!ABANDONED && SETTLED ?
    <div className={cn(
      'd-flex justify-content-between transaction-row px-4 py-3',
      (FAILED || TERMINATED) ? 'error' : SENT ? 'sent' : '')}>
      <div>
        {(FAILED || TERMINATED) ? <i className="far fa-exclamation-circle fa-lg text-white mr-3"></i>
          : !SENT ? <i className="fas fa-spinner-third fa-lg fa-spin mr-3"></i>
          : <i className="far fa-check fa-lg mr-3"></i>}
        {(FAILED || TERMINATED) ? 'Transaction error' : 'Coin Sent'}
      </div>
      {TERMINATED ? <Moment format="hh:mm A">{TERMINATED * 1000}</Moment>
        : FAILED ? <Moment format="hh:mm A">{FAILED * 1000}</Moment>
        : SENT ? <Moment format="hh:mm A">{SENT * 1000}</Moment>
        : ''}
    </div> : ''}
    {CLEARING ?
    <div className={cn('d-flex justify-content-between transaction-row mt-4 px-4 py-3', (REVIEW || ABANDONED || (!SETTLED && TERMINATED)) ? 'error' : '')}>
      <div>
        {(REVIEW || ABANDONED || (!SETTLED && TERMINATED)) ? <i className="far fa-exclamation-circle fa-lg text-white mr-3"></i>
          : !SETTLED ? <i className="fas fa-spinner-third fa-lg fa-spin mr-3"></i>
          : <i className="far fa-check fa-lg mr-3"></i>}
        {(REVIEW || (!SETTLED && TERMINATED)) ? 'Payment error' : ABANDONED ? 'You cancelled the transaction' : 'Payment received'}
      </div>
      {(!SETTLED && TERMINATED) ? <Moment format="hh:mm A">{TERMINATED * 1000}</Moment>
        : ABANDONED ? <Moment format="hh:mm A">{ABANDONED * 1000}</Moment>
        : REVIEW ? <Moment format="hh:mm A">{REVIEW * 1000}</Moment>
        : SETTLED ? <Moment format="hh:mm A">{SETTLED * 1000}</Moment>
        : ''}
    </div> : ''}
    <div className="d-flex justify-content-between transaction-row mt-4 px-3 py-2 px-md-4 py-md-3">
      <div>
        {SETTLED && loading ? <i className="fas fa-spinner-third fa-lg fa-spin mr-3"></i>
          : <i className="far fa-check fa-lg mr-3"></i>}
        You sent payment
      </div>
      {CLEARING ? <Moment format="hh:mm A">{CLEARING * 1000}</Moment>: ''}
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    order: state.order
  }
}

export default connect(mapStateToProps, { abandonOrder, getStatus, fetchConsts })(TransactionTracker)

TransactionTracker.propTypes = {
  heading: PropTypes.string
}