import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import Cookie from 'js-cookie'

import Header from '../components/Header'
import Calculator from '../components/exchange/Calculator'
import OrderSummary from '../components/exchange/OrderSummary'
import BankTransfer from '../components/exchange/BankTransfer'
import AddBankAccount from '../components/exchange/AddBankAccount'

class Exchange extends Component {
	constructor() {
		super()
		this.state = {
			sendAmount: 0,
			initialSendAmount: 0,
			receiveAmount: 0,
			sendCurrency: 'GBP',
			receiveCurrency: 'BTC',
			action: 'sending',
			rate: 1200,
			wallet: null,
			ctUser: null,
			isVerified: true,
			step: 1
		}

		this.next = this.next.bind(this)
		this.back = this.back.bind(this)
		this.onConfirm = this.onConfirm.bind(this)
		this.onRestart = this.onRestart.bind(this)
		this.onRateChange = this.onRateChange.bind(this)
		this.renderAmountFrame = this.renderAmountFrame.bind(this)
		this.renderSummaryFrame = this.renderSummaryFrame.bind(this)
		this.renderPaymentFrame = this.renderPaymentFrame.bind(this)
	}

	componentDidMount() {
		const userData = localStorage.getItem('user')
		const user = userData && JSON.parse(userData)
		const sessionId = Cookie.get('CT-SESSION-ID')
		if (user && user.CtUserId && sessionId) {
			this.setState({
				ctUser: user.CtUserId
				// isVerified: user.isVerified
			})
		} else {
			Router.push(`/login?redirectPath=${this.props.router.pathname}`)
		}
	}

	next(state) {
		this.setState({
			...state,
			step: this.state.step + 1
		})
	}

	back() {
		this.setState({
			step: this.state.step - 1
		})
	}

	onConfirm({ txnID }) {
		Router.push(`/transaction-tracker/${txnID}`)
	}

	onRestart() {
		this.setState({
			step: 1
		})
	}

	onRateChange(state) {
		this.setState({ ...state })
	}

	render() {
		return (
			<div className="full-height" style={{ backgroundColor: '#f4f7fa' }}>
				<Head>
					<title>Exchange | Cointec</title>
				</Head>
				<Header background="solid">
					<Nav
						heading={
							this.state.step === 1
								? 'Buy digital currency'
								: this.state.step === 2
									? 'Order summary'
									: 'Make Bank Transfer'
						}
					/>
				</Header>

				<div className="container">
					<div className="row mt-4">
						<div className="col-12 col-lg-7 col-xl-6 text-center">
							{this.state.step === 1
								? this.renderAmountFrame()
								: this.state.step === 2
									? this.renderSummaryFrame()
									: this.state.step === 3
										? this.renderPaymentFrame()
										: null}
						</div>
						<div className="info-column col-12 col-lg-4">
							{this.state.step === 1 && (
								<div>
									<h6>Transaction limit</h6>
									<div className="limit-amount">0 GBP</div>
								</div>
							)}
							{this.state.step === 2 && (
								<div>
									<button className="btn-back" onClick={() => this.back()}>
										<i className="far fa-angle-left" />{' '}
										<span>Back to currency selection</span>
									</button>
								</div>
							)}
							{this.state.isVerified ? (
								this.state.sendCurrency === 'GBP' && (
									<div>
										<hr />
										<h6>Add a bank account</h6>
										<p>
											You can add the bank account you wish to make a bank
											transfer from. This will speed up GBP transactions.
										</p>
										<a
											href="#"
											className="info-link"
											data-toggle="modal"
											data-target="#add-bank-account-modal">
											Add bank account
										</a>
									</div>
								)
							) : (
								<div>
									<hr />
									<h6>You are not verified</h6>
									<p>
										You must be verified to increase your limit and make GBP
										transactions.
									</p>
									<Link href="/">
										<a className="info-link">Complete verification</a>
									</Link>
								</div>
							)}
							<div>
								<hr />
								<h6 className="mb-4">Need help?</h6>
								<Link href="/">
									<a className="contact-us-link">Contact us</a>
								</Link>
							</div>
						</div>
					</div>
				</div>

				<AddBankAccount />
			</div>
		)
	}

	renderAmountFrame() {
		return (
			<div>
				<Calculator
					ctUser={this.state.ctUser}
					// preSelectedCoin={this.props.match.params.receiveCurrency}
					onConfirm={this.next}
				/>
				<p className="text-left mt-3">
					By continuing you accept our{' '}
					<Link href="/terms">
						<a>Terms of Use</a>
					</Link>
				</p>
			</div>
		)
	}

	renderSummaryFrame() {
		return (
			<div>
				<OrderSummary
					sendAmount={this.state.sendAmount}
					initialSendAmount={this.state.initialSendAmount}
					receiveAmount={this.state.receiveAmount}
					sendCurrency={this.state.sendCurrency}
					receiveCurrency={this.state.receiveCurrency}
					ctUser={this.state.ctUser}
					action={this.state.action}
					wallet={this.state.wallet}
					rate={this.state.rate}
					onRateChange={this.onRateChange}
					onConfirm={this.next}
				/>
			</div>
		)
	}

	renderPaymentFrame() {
		return (
			<div>
				<BankTransfer
					sendAmount={this.state.sendAmount}
					receiveAmount={this.state.receiveAmount}
					sendCurrency={this.state.sendCurrency}
					receiveCurrency={this.state.receiveCurrency}
					wallet={this.state.wallet}
					rate={this.state.rate}
					ctUser={this.state.ctUser}
					onConfirm={this.onConfirm}
					onRestart={this.onRestart}
				/>
			</div>
		)
	}
}

const Nav = ({ heading }) => (
	<div className="container">
		<nav className="navbar navbar-custom navbar-expand-lg navbar-dark px-0 py-3 py-md-3">
			<Link href="/">
				<a className="navbar-brand">
					<img
						src="/static/images/Logo.svg"
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

export default withRouter(Exchange)
