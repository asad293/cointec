import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import Cookie from 'js-cookie'
import cn from 'classnames'
import { connect } from 'react-redux'

import Header from '../components/Header'
import Calculator from '../components/exchange/Calculator'
import OrderSummary from '../components/exchange/OrderSummary'
import BankTransfer from '../components/exchange/BankTransfer'
import AddBankAccount from '../components/exchange/AddBankAccount'
import StickyFooter from '../components/StickyFooter'

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
			step: 1,
			addBankAccountModal: false,
			scrolling: false
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

		// console.log(sessionId)
		if (user && user.CtUserId && sessionId) {
			this.setState({ ctUser: user.CtUserId })
		} else {
			Router.push(`/login?redirectPath=${this.props.router.pathname}`)
		}

		addEventListener('resize', this.onResize)
		this.onResize()
	}

	componentWillUnmount() {
		removeEventListener('resize', this.onResize)
	}

	onResize = () => {
		const element = document.querySelector('.exchange-page')
		const documentElement = document.documentElement

		this.setState({
			scrolling:
				element && documentElement
					? documentElement.clientHeight < element.scrollHeight
					: false
		})
	}

	next(state) {
		this.setState(
			{
				...state,
				step: this.state.step + 1
			},
			() => this.onResize()
		)
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
		this.setState(
			{
				step: 1
			},
			() => this.onResize()
		)
	}

	onRateChange(state) {
		this.setState({ ...state })
	}

	render() {
		return (
			<div
				className="exchange-page full-height"
				style={{ backgroundColor: '#F7F9FA', position: 'absolute' }}>
				<Head>
					<title>Exchange | Cointec</title>
				</Head>
				<Header background="solid">
					<Nav
						step={this.state.step}
						setStep={step => this.setState({ step }, () => this.onResize())}
					/>
				</Header>

				<div className="container">
					<div className="row justify-content-center mb-5">
						<div className="main-wrapper">
							<InnerNav
								step={this.state.step}
								setStep={step => this.setState({ step }, () => this.onResize())}
							/>
							{this.state.step === 1 && this.renderAmountFrame()}
							{this.state.step === 2 && this.renderSummaryFrame()}
							{this.state.step === 3 && this.renderPaymentFrame()}
						</div>
					</div>
				</div>

				<StickyFooter className="bg-white" fixed={!this.state.scrolling} />
				{this.state.addBankAccountModal && (
					<AddBankAccount
						onClose={() => this.setState({ addBankAccountModal: false })}
					/>
				)}
				<style jsx global>{`
					html {
						background: #f7f9fa;
					}
				`}</style>
			</div>
		)
	}

	renderAmountFrame() {
		return (
			<div>
				<div className="form-title-wrapper d-none d-md-flex">
					<img src="/static/images/science.svg" alt="form-icon" />
					<h4 className="form-title">Instant exchange</h4>
				</div>
				<Calculator ctUser={this.state.ctUser} onConfirm={this.next} />
				<p className="terms-statment text-left">
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
				<div className="form-title-wrapper d-none d-md-flex">
					<img src="/static/images/science.svg" alt="form-icon" />
					<h4 className="form-title">Order summary</h4>
				</div>
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
				<div className="form-title-wrapper d-none d-md-flex">
					<img src="/static/images/science.svg" alt="form-icon" />
					<h4 className="form-title">Make payment</h4>
				</div>
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
					onAddAccount={() => this.setState({ addBankAccountModal: true })}
				/>
			</div>
		)
	}

	componentWillReceiveProps(props) {
		this.onResize()
	}
}

const Nav = props => (
	<div className="container">
		<nav className="navbar navbar-custom navbar-expand-lg navbar-exchange">
			<div className="col-3 d-none d-md-flex">
				<Link href="/">
					<a className="navbar-brand">
						<img
							src="/static/images/footer-logo.svg"
							className="img-fluid mx-auto d-block"
							alt="Logo"
						/>
					</a>
				</Link>
			</div>
			<div
				className={cn(
					'col-6 exchange-nav d-none d-md-block',
					props.step === 2 ? 'step-2' : props.step === 3 ? 'step-3' : ''
				)}>
				<ul>
					<li
						className={cn(
							props.step === 1 ? 'active' : props.step > 1 ? 'passed' : ''
						)}
						onClick={props.step >= 2 ? () => props.setStep(1) : null}>
						Amount
					</li>
					<li
						className={cn(
							props.step === 2 ? 'active' : props.step > 2 ? 'passed' : ''
						)}
						onClick={props.step === 3 ? () => props.setStep(2) : null}>
						Summary
					</li>
					<li className={cn(props.step === 3 ? 'active' : '')}>Payment</li>
				</ul>
			</div>

			<div className="col-6 d-block d-md-none p-0">
				<h5 className="exchange-heading">
					{props.step === 1 && 'Enter amount'}
					{props.step === 2 && 'Order summary'}
					{props.step === 3 && 'Make payment'}
				</h5>
			</div>

			<ul className="col-6 col-md-3 navbar-nav justify-content-end align-items-lg-center text-right">
				<li className="nav-item">
					<Link href="/">
						<a className="nav-link px-0">
							<i className="far fa-times" />
						</a>
					</Link>
				</li>
			</ul>
		</nav>
	</div>
)

const InnerNav = props => (
	<div
		className={cn(
			'exchange-nav inner d-block d-md-none',
			props.step === 2 ? 'step-2' : props.step === 3 ? 'step-3' : ''
		)}>
		<ul>
			<li
				className={cn(
					props.step === 1 ? 'active' : props.step > 1 ? 'passed' : ''
				)}
				onClick={props.step >= 2 ? () => props.setStep(1) : null}
			/>
			<li
				className={cn(
					props.step === 2 ? 'active' : props.step > 2 ? 'passed' : ''
				)}
				onClick={props.step === 3 ? () => props.setStep(2) : null}
			/>
			<li className={cn(props.step === 3 ? 'active' : '')} />
		</ul>
	</div>
)

export default connect(
	({ order }) => ({ order }),
	null
)(withRouter(Exchange))