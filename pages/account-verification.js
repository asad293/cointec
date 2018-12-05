import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import Cookie from 'js-cookie'
import cn from 'classnames'

import Header from '../components/Header'
import EmailConfirmation from '../components/account-verification/EmailConfirmation'
import BasicDetails from '../components/account-verification/BasicDetails'
import ProofOfID from '../components/account-verification/ProofOfID'
import ProofOfAddress from '../components/account-verification/ProofOfAddress'
import StickyFooter from '../components/StickyFooter'

class AccountVerification extends Component {
	constructor() {
		super()
		this.state = {
			ctUser: null,
			completed: false,
			step: 1,
			scrolling: false
		}

		this.next = this.next.bind(this)
		this.back = this.back.bind(this)
		this.complete = this.complete.bind(this)
		this.onConfirm = this.onConfirm.bind(this)
		this.onRestart = this.onRestart.bind(this)
		this.renderCompletedFrame = this.renderCompletedFrame.bind(this)
		this.renderEmailFrame = this.renderEmailFrame.bind(this)
		this.renderBasicDetailsFrame = this.renderBasicDetailsFrame.bind(this)
		this.renderProofIDFrame = this.renderProofIDFrame.bind(this)
	}

	componentDidMount() {
		const userData = localStorage.getItem('user')
		const user = userData && JSON.parse(userData)
		const sessionId = Cookie.get('CT-SESSION-ID')
		if (user && user.CtUserId && sessionId) {
			this.setState({ ctUser: user.CtUserId, email: user.email })
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
		const element = document.querySelector('.account-verification-page')
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

	complete() {
		this.setState(
			{
				completed: true
			},
			() => this.onResize()
		)
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
			<div
				className="account-verification-page exchange-page full-height"
				style={{ backgroundColor: '#F7F9FA' }}>
				<Head>
					<title>Account verification | Cointec</title>
				</Head>
				{this.state.completed && <SubmittedAlert />}
				<Header background="solid">
					<Nav
						step={this.state.step}
						completed={this.state.completed}
						setStep={step => this.setState({ step }, () => this.onResize())}
					/>
				</Header>

				<div
					className="container account-verification-container"
					style={{
						marginBottom: !this.state.scrolling ? 100 : ''
					}}>
					<div className="row justify-content-center">
						<div
							className="main-wrapper text-center"
							style={{
								width: this.state.completed
									? 456
									: this.state.step === 1
									? 444
									: this.state.step === 2
									? 568
									: 434
							}}>
							<InnerNav
								step={this.state.step}
								setStep={step => this.setState({ step }, () => this.onResize())}
							/>
							{this.state.completed && this.renderCompletedFrame()}
							{!this.state.completed &&
								this.state.step === 1 &&
								this.renderEmailFrame()}
							{!this.state.completed &&
								this.state.step === 2 &&
								this.renderBasicDetailsFrame()}
							{!this.state.completed &&
								this.state.step === 3 &&
								this.renderProofIDFrame()}
							{!this.state.completed &&
								this.state.step === 4 &&
								this.renderProofAddressFrame()}
						</div>
					</div>
				</div>

				<StickyFooter className="bg-white" fixed={!this.state.scrolling} />
			</div>
		)
	}

	renderEmailFrame() {
		return (
			<div className="email-frame">
				<div className="form-title-wrapper d-none d-md-flex">
					<img src="/static/images/science.svg" alt="form-icon" />
					<h4 className="form-title">Confirm your email address</h4>
				</div>
				<EmailConfirmation onConfirm={this.next} />
			</div>
		)
	}

	renderBasicDetailsFrame() {
		return (
			<div className="basic-details-frame">
				<div className="form-title-wrapper d-none d-md-flex">
					<img src="/static/images/science.svg" alt="form-icon" />
					<h4 className="form-title">Your basic details</h4>
				</div>
				<BasicDetails
					ctUser={this.state.ctUser}
					emailAddress={this.state.email}
					onConfirm={this.next}
				/>
			</div>
		)
	}

	renderProofIDFrame() {
		return (
			<div className="proof-of-id-frame">
				<div className="form-title-wrapper d-none d-md-flex">
					<img src="/static/images/science.svg" alt="form-icon" />
					<h4 className="form-title">Upload proof of ID</h4>
				</div>
				<ProofOfID ctUser={this.state.ctUser} onConfirm={this.next} />
			</div>
		)
	}

	renderProofAddressFrame() {
		return (
			<div className="proof-of-address-frame">
				<div className="form-title-wrapper d-none d-md-flex">
					<img src="/static/images/science.svg" alt="form-icon" />
					<h4 className="form-title">Upload proof of address</h4>
				</div>
				<ProofOfAddress onConfirm={this.complete} />
			</div>
		)
	}

	renderCompletedFrame() {
		return (
			<div className="documents-submitted-frame">
				<div className="form-title-wrapper d-none d-md-flex">
					<img src="/static/images/science.svg" alt="form-icon" />
					<h4 className="form-title">Documents submitted</h4>
				</div>
				<p className="confirmation-message">
					Great! We have received all your documents will review them within 2
					business days. Don’t forget that you can still buy up to 30 digital
					currencies with BTC without verification. 😊
				</p>
				<Link href="/">
					<a className="confirmation-link">Buy with BTC</a>
				</Link>
			</div>
		)
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
					'col-6 verification-nav d-none d-md-block',
					props.step <= 4 ? `step-${props.step}` : ''
				)}>
				<ul>
					<li
						className={cn(
							props.completed
								? 'passed'
								: props.step === 1
								? 'active'
								: props.step > 1
								? 'passed'
								: ''
						)}
						style={{ marginRight: 22 }}
						onClick={props.step >= 2 ? () => props.setStep(1) : null}>
						Email
					</li>
					<li
						className={cn(
							props.completed
								? 'passed'
								: props.step === 2
								? 'active'
								: props.step > 2
								? 'passed'
								: ''
						)}
						style={{ marginRight: 8 }}
						onClick={props.step >= 3 ? () => props.setStep(2) : null}>
						Basic details
					</li>
					<li
						className={cn(
							props.completed
								? 'passed'
								: props.step === 3
								? 'active'
								: props.step > 3
								? 'passed'
								: ''
						)}
						onClick={props.step === 4 ? () => props.setStep(3) : null}>
						Proof of ID
					</li>
					<li
						className={cn(
							props.completed ? 'passed' : props.step === 4 ? 'active' : ''
						)}>
						Proof of address
					</li>
				</ul>
			</div>

			<div className="col-6 d-block d-md-none p-0">
				<h5 className="exchange-heading">
					{props.step === 1 && 'Confirm your email'}
					{props.step === 2 && 'Your basic details'}
					{props.step === 3 && 'Proof of ID'}
					{props.step === 4 && 'Proof of address'}
				</h5>
			</div>

			<ul className="col-6 col-md-3 navbar-nav justify-content-end align-items-lg-center text-right">
				<li className="nav-item">
					<Link href="/">
						<a className="nav-link">
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
			'verification-nav inner d-block d-md-none',
			props.step <= 4 ? `step-${props.step}` : ''
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
			<li
				className={cn(
					props.step === 3 ? 'active' : props.step > 3 ? 'passed' : ''
				)}
				onClick={props.step === 4 ? () => props.setStep(3) : null}
			/>
			<li className={cn(props.step === 4 ? 'active' : '')} />
		</ul>
	</div>
)

const SubmittedAlert = () => (
	<div className="alert-submitted">
		<p className="alert-message">All documents submitted and under review</p>
	</div>
)

export default withRouter(AccountVerification)
