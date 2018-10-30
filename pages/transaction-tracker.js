import React, { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import Moment from 'react-moment'
import Cookie from 'js-cookie'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { abandonOrder, getStatus, fetchConsts } from '../store/actions'
import Header from '../components/Header'
import AbandonOrder from '../components/transaction-tracker/AbandonOrder'

class TransactionTracker extends Component {
	constructor() {
		super()
		this.state = {
			timerId: null,
			refreshTime: 10,
			abandonOrderModal: false,
			ctUser: null
		}
		this.initInterval = this.initInterval.bind(this)
		this.fetchStatus = this.fetchStatus.bind(this)
	}

	componentDidMount() {
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
		const userData = localStorage.getItem('user')
		const user = userData && JSON.parse(userData)
		const sessionId = Cookie.get('CT-SESSION-ID')
		if (user && user.CtUserId && sessionId) {
			this.setState({ ctUser: user.CtUserId })
			this.props.getStatus({
				orderId: this.props.router.query.txnID,
				ctUser: user.CtUserId
			})
		} else {
			const redirectPath =
				this.props.router.pathname + '/' + this.props.router.query.txnID
			Router.push(`/login?redirectPath=${redirectPath}`)
		}
	}

	render() {
		const { loading, status } = this.props.order
		return (
			<div className="full-height" style={{ backgroundColor: '#f4f7fa' }}>
				<Head>
					<title>Transaction Tracker | Cointec</title>
				</Head>
				<Header background="solid">
					<Nav heading="Track your transaction" />
				</Header>

				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12 col-md-8 col-lg-6 col-xl-5 px-lg-4 text-center">
							<div className="form-title-wrapper d-none d-md-flex">
								<img src="/static/images/science.svg" alt="form-icon" />
								<h4 className="form-title">Transaction tracker</h4>
							</div>
							<div className="transaction-tracker-wrapper">
								{status && (
									<TransactionStatus
										Status={status.Status}
										ExchangeTransactions={status.ExchangeTransactions}
										cancelOrder={() =>
											this.setState({ abandonOrderModal: true })
										}
										loading={loading}
									/>
								)}
							</div>
						</div>
					</div>
				</div>

				{this.state.abandonOrderModal && (
					<AbandonOrder
						txnID={this.props.router.query.txnID}
						ctUser={this.state.ctUser}
						onClose={() => this.setState({ abandonOrderModal: false })}
					/>
				)}
			</div>
		)
	}
}

const TransactionStatus = ({
	Status: {
		CLEARING,
		EXPIRED,
		SETTLED,
		REVIEW,
		TERMINATED,
		SENT,
		FAILED,
		ABANDONED
	},
	ExchangeTransactions,
	cancelOrder
}) => {
	const Exchange =
		ExchangeTransactions &&
		Object.keys(ExchangeTransactions).length &&
		ExchangeTransactions[Object.keys(ExchangeTransactions).reverse()[0]]
	const cancelled = ABANDONED || EXPIRED
	return (
		<div>
			{cancelled && (
				<TransactionCancelled ABANDONED={ABANDONED} EXPIRED={EXPIRED} />
			)}
			{!cancelled && <PaymentSent CLEARING={CLEARING} />}
			{!cancelled && (
				<PaymentReceived
					CLEARING={CLEARING}
					REVIEW={REVIEW}
					TERMINATED={TERMINATED}
					SETTLED={SETTLED}
				/>
			)}
			{!cancelled && (
				<CoinSent
					Exchange={Exchange}
					SETTLED={SETTLED}
					FAILED={FAILED}
					TERMINATED={TERMINATED}
					SENT={SENT}
				/>
			)}
			{!(
				SETTLED ||
				REVIEW ||
				TERMINATED ||
				SENT ||
				FAILED ||
				ABANDONED ||
				EXPIRED
			) ? (
				<div className="cancel-transaction-link mt-3 text-left">
					Changed your mind?{' '}
					<a href="javascript:void(0)" onClick={cancelOrder}>
						Cancel the transaction
					</a>
				</div>
			) : (
				''
			)}
		</div>
	)
}

const TransactionCancelled = ({ ABANDONED, EXPIRED }) => (
	<div className="coin-sent-wrapper error mt-3">
		<div className="d-flex justify-content-between card-tracking">
			<div>
				<i className="far fa-times fa-lg mr-3" />
				{ABANDONED ? 'Transaction cancelled' : 'Transaction expired'}
			</div>
			<span className="transaction-time">
				{ABANDONED ? (
					<Moment format="hh:mm A">{ABANDONED * 1000}</Moment>
				) : (
					<Moment format="hh:mm A">{EXPIRED * 1000}</Moment>
				)}
			</span>
		</div>
		{ABANDONED && (
			<div className="description">
				We have recieved your refund request. We will be in touch within 24
				hours to arrange payment.
			</div>
		)}
		<Link href="/">
			<a className="btn-follow-blockchain">
				<i className="fas fa-paper-plane" />
				Return to dashboard
			</a>
		</Link>
	</div>
)

const PaymentSent = ({ CLEARING }) => {
	const iconClass = cn(
		'far',
		'fa-lg mr-3',
		CLEARING ? 'fa-check' : 'fa-spinner-third fa-spin'
	)
	return (
		<div className="d-flex justify-content-between card-tracking">
			<div>
				<i className={iconClass} />
				You sent payment
			</div>
			<span className="transaction-time">
				{CLEARING && <Moment format="hh:mm A">{CLEARING * 1000}</Moment>}
			</span>
		</div>
	)
}

const PaymentReceived = ({ CLEARING, REVIEW, TERMINATED, SETTLED }) => {
	return CLEARING ? (
		<div
			className={cn(
				'd-flex justify-content-between card-tracking mt-3',
				(REVIEW || TERMINATED) && !SETTLED
					? 'error'
					: !SETTLED
						? 'in-progress'
						: ''
			)}>
			<div>
				{(REVIEW || TERMINATED) && !SETTLED ? (
					<i className="far fa-times fa-lg mr-3" />
				) : !SETTLED ? (
					<i className="fas fa-spinner-third fa-lg fa-spin mr-3" />
				) : (
					<i className="far fa-check fa-lg mr-3" />
				)}
				{(REVIEW || TERMINATED) && !SETTLED
					? 'Payment error'
					: 'We received payment'}
			</div>
			<span className="transaction-time">
				{SETTLED ? (
					<Moment format="hh:mm A">{SETTLED * 1000}</Moment>
				) : TERMINATED ? (
					<Moment format="hh:mm A">{TERMINATED * 1000}</Moment>
				) : REVIEW ? (
					<Moment format="hh:mm A">{REVIEW * 1000}</Moment>
				) : (
					''
				)}
			</span>
		</div>
	) : (
		<div className="d-flex justify-content-between card-tracking disabled mt-3">
			<div>
				<i className="far fa-minus fa-lg mr-3" />
				We received payment
			</div>
		</div>
	)
}

const CoinSent = ({ Exchange, SETTLED, FAILED, TERMINATED, SENT }) => {
	return SETTLED ? (
		<div
			className={cn(
				'coin-sent-wrapper mt-3',
				FAILED || TERMINATED
					? 'error'
					: !SENT
						? 'in-progress'
						: SENT
							? 'sent'
							: ''
			)}>
			<div className="d-flex justify-content-between card-tracking">
				<div>
					{!(FAILED || TERMINATED) && !SETTLED ? (
						<i className="far fa-minus fa-lg mr-3" />
					) : FAILED || TERMINATED ? (
						<i className="far fa-times fa-lg mr-3" />
					) : !SENT ? (
						<i className="fas fa-spinner-third fa-lg fa-spin mr-3" />
					) : (
						<i className="far fa-check fa-lg mr-3" />
					)}
					{FAILED || TERMINATED ? 'Transaction error' : 'Coin Sent'}
				</div>
				<span className="transaction-time">
					{TERMINATED ? (
						<Moment format="hh:mm A">{TERMINATED * 1000}</Moment>
					) : FAILED ? (
						<Moment format="hh:mm A">{FAILED * 1000}</Moment>
					) : (
						SENT && <Moment format="hh:mm A">{SENT * 1000}</Moment>
					)}
				</span>
			</div>
			{FAILED || TERMINATED ? (
				<div className="description">
					Sorry, we were unable to fulfill your order. Any payments received
					from your account will be refunded within 2 business days.
				</div>
			) : SENT ? (
				<div className="description">
					<b>0.53453456 BTC</b> was sent to your external wallet. Your coins are
					on the blockahin on the way to your wallet.
				</div>
			) : (
				''
			)}
			{Exchange ? (
				<a
					href={Exchange.TransactionHash}
					className="btn-follow-blockchain"
					target="_blank">
					<i className="fas fa-paper-plane" />
					Follow on the blockchain
				</a>
			) : (
				''
			)}
			{FAILED || TERMINATED ? (
				<Link href="/">
					<a className="btn-follow-blockchain">
						<i className="fas fa-paper-plane" />
						Return to dashboard
					</a>
				</Link>
			) : (
				''
			)}
		</div>
	) : (
		<div className="d-flex justify-content-between card-tracking disabled mt-3">
			<div>
				<i className="far fa-minus fa-lg mr-3" />
				Coin Sent
			</div>
		</div>
	)
}

const ActionsCol = ({
	Status: { SETTLED, EXPIRED, REVIEW, TERMINATED, SENT, FAILED, ABANDONED },
	cancelOrder
}) => (
	<div className="info-column col-12 col-lg-4">
		{!(
			SETTLED ||
			REVIEW ||
			TERMINATED ||
			SENT ||
			FAILED ||
			ABANDONED ||
			EXPIRED
		) && (
			<div>
				<div>
					<h6 className="mb-4">Tracking information</h6>
					<p>
						Go to go? No worries, you can view the transaction status from your{' '}
						<Link href="\">
							<a>dashboard</a>
						</Link>{' '}
						at any time.
					</p>
				</div>
				<hr />
			</div>
		)}

		{!(
			SETTLED ||
			REVIEW ||
			TERMINATED ||
			SENT ||
			FAILED ||
			ABANDONED ||
			EXPIRED
		) && (
			<div>
				<h6 className="mb-4">Cancelling transaction</h6>
				<p>
					Dummy text about cancelling transaction to be completed at a later
					stage.
				</p>
				<a
					style={{ color: '#D80027' }}
					href="javascript:void(0)"
					onClick={cancelOrder}>
					Cancel transaction
				</a>
			</div>
		)}
	</div>
)

const Nav = ({ heading }) => (
	<div className="container">
		<nav className="navbar navbar-custom navbar-expand-lg navbar-dark px-0 py-3 py-md-3">
			<Link href="/">
				<a className="navbar-brand">
					<img
						src="/static/images/footer-logo.svg"
						className="img-fluid mx-auto d-block"
						alt="Logo"
					/>
				</a>
			</Link>
			<div className="w-100 text-center d-none d-lg-block">
				<h5 className="text-white">{heading}</h5>
			</div>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav w-100 justify-content-end align-items-lg-center">
					<li className="nav-item">
						<Link href="/">
							<a className="nav-link">
								<i className="far fa-times" />
							</a>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	</div>
)

const mapStateToProps = state => {
	return {
		order: state.order
	}
}

export default connect(
	mapStateToProps,
	{ abandonOrder, getStatus, fetchConsts }
)(withRouter(TransactionTracker))

TransactionTracker.propTypes = {
	heading: PropTypes.string
}
