import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import {
	fetchOrders,
	fetchAssetsList,
	fetchVerificationStatus,
	fetchUserDetails
} from '../store/actions'
import Cookie from 'js-cookie'

import Nav from '../components/dashboard/Nav'
import AlertMessage from '../components/dashboard/AlertMessage'
import NotificationAlert from '../components/dashboard/NotificationAlert'
import TabsGroup from '../components/account-settings/TabsGroup'
import SettingsMenu from '../components/account-settings/SettingsMenu'
import ConfirmEmail from '../components/account-settings/ConfirmEmail'
import ChangeEmail from '../components/account-settings/ChangeEmail'
import UpdatePassword from '../components/account-settings/UpdatePassword'
import CloseAccount from '../components/account-settings/CloseAccount'
import StickyFooter from '../components/StickyFooter'

class AccountSettings extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showAlert: true,
			confirmEmailModal: false,
			changeEmailModal: false,
			updatePasswordModal: false,
			closeAccountModal: false,
			email: null,
			scrolling: false,
			notificationAlert: false,
			notificationContent: null
		}
		this.onConfirmationEmailSent = this.onConfirmationEmailSent.bind(this)
	}

	componentDidMount() {
		const userData = localStorage.getItem('user')
		const user = userData && JSON.parse(userData)
		const sessionId = Cookie.get('CT-SESSION-ID')
		if (user && user.email && sessionId) {
			this.setState({ ctUser: user.CtUserId, email: user.email })
			this.props.fetchVerificationStatus({ ctUser: user.CtUserId })
			this.props.fetchUserDetails(user.CtUserId)
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
		const element = document.querySelector('.settings-page')
		const documentElement = document.documentElement

		this.setState({
			scrolling:
				element && documentElement
					? documentElement.clientHeight < element.scrollHeight
					: false
		})
	}

	onConfirmationEmailSent() {
		const notificationContent = (
			<p>
				Confirmation email sent to{' '}
				<b>
					{(this.props.accounts.userDetails &&
						this.props.accounts.userDetails.EmailAddress) ||
						this.state.email ||
						''}
				</b>
			</p>
		)
		this.setState({
			confirmEmailModal: false,
			notificationAlert: true,
			notificationContent
		})
		setTimeout(() => {
			this.setState({
				notificationAlert: false
			})
		}, 5000)
	}

	render() {
		return (
			<div
				className="settings-page dashboard-page full-height"
				style={{ background: '#F7F9FA', overflowY: 'auto' }}>
				<Head>
					<title>Account settings | Cointec</title>
				</Head>
				<header>
					<Nav />
					<hr className="hr-header" />
					<div className="container">
						<h2 className="dashboard-heading">Account settings</h2>
					</div>
				</header>
				{this.state.showAlert &&
					!this.state.notificationAlert &&
					!this.props.verification.VerificationComplete && (
						<AlertMessage
							onHide={() =>
								this.setState({ showAlert: false }, () => this.onResize())
							}
						/>
					)}
				{this.state.notificationAlert && (
					<NotificationAlert
						onHide={() => this.setState({ notificationAlert: false })}>
						{this.state.notificationContent}
					</NotificationAlert>
				)}
				<div
					className="container dashboard-container"
					style={{
						marginBottom: !this.state.scrolling ? 86 : ''
					}}>
					<div className="row">
						<div className="col">
							<div className="content-wrapper p-0 h-auto position-relative">
								<TabsGroup />
								<SettingsMenu title="Your account" />
								<div className="settings-list">
									<div
										className="setting-wrapper"
										style={{
											padding: this.props.verification.VerificationComplete
												? '36px 32px'
												: ''
										}}>
										<div className="d-flex flex-column flex-md-row">
											<div>
												<h6
													className="setting-name"
													style={{
														marginBottom: !this.props.verification
															.VerificationComplete
															? '16px'
															: '12px'
													}}>
													Verification status
													<img
														src={
															!this.props.verification.VerificationComplete
																? '/static/images/check.svg'
																: '/static/images/check-success.svg'
														}
														alt="verified"
													/>
												</h6>
												{!this.props.verification.VerificationComplete ? (
													<div>
														<p className="d-none d-md-block">
															Get verified to buy digital currency with GBP
														</p>
														<p className="d-block d-md-none mb-4">
															Get verified to buy with GBP
														</p>
													</div>
												) : (
													<p className="verification-status">
														<span className="beta-user">Beta user</span> |{' '}
														<a className="link-setting">upgrade</a>
													</p>
												)}
											</div>
											{!this.props.verification.VerificationComplete && (
												<div className="ml-md-auto">
													<Link href="/account-verification">
														<a className="btn-setting">Complete verification</a>
													</Link>
												</div>
											)}
										</div>
									</div>
									<div className="setting-wrapper">
										<div className="d-flex flex-column flex-md-row">
											<div>
												<h6 className="setting-name">
													Email address
													<img
														src={
															!this.props.verification.EmailConfirmed
																? '/static/images/check.svg'
																: '/static/images/check-success.svg'
														}
														alt="verified"
													/>
												</h6>
												<p className="mb-4 mb-md-0">
													{(this.props.accounts.userDetails &&
														this.props.accounts.userDetails.EmailAddress) ||
														this.state.email ||
														'email@cointec.co.uk'}
													{' |'}
													<a
														className="link-setting"
														onClick={() =>
															this.setState({ changeEmailModal: true })
														}>
														update
													</a>
												</p>
											</div>
											{!this.props.verification.EmailConfirmed && (
												<div className="ml-md-auto">
													<a
														className="btn-setting"
														onClick={() =>
															this.setState({ confirmEmailModal: true })
														}>
														Confirm email address
													</a>
												</div>
											)}
										</div>
									</div>
									<div className="setting-wrapper">
										<div className="d-flex">
											<div>
												<h6 className="setting-name">Password</h6>
												<p>
													************ |
													<a
														className="link-setting"
														onClick={() =>
															this.setState({ updatePasswordModal: true })
														}>
														update
													</a>
												</p>
											</div>
										</div>
									</div>
									<div className="setting-wrapper">
										<div className="d-flex flex-column flex-md-row">
											<div>
												<h6 className="setting-name">Close account</h6>
												<p className="d-none d-lg-block">
													You will loose access to all cointec services if you
													close your account.
												</p>
												<p className="d-block d-lg-none mb-4 mb-md-0">
													You will loose access to all cointec services
												</p>
											</div>
											<div className="ml-md-auto">
												<a
													className="btn-setting text-danger"
													onClick={() =>
														this.setState({ closeAccountModal: true })
													}>
													Close your account
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<StickyFooter className="bg-white" fixed={!this.state.scrolling} />
				{this.state.confirmEmailModal && (
					<ConfirmEmail
						emailAddress={
							(this.props.accounts.userDetails &&
								this.props.accounts.userDetails.EmailAddress) ||
							this.state.email ||
							'email@cointec.co.uk'
						}
						ctUser={this.state.ctUser}
						onClose={() => this.setState({ confirmEmailModal: false })}
						onEmailSent={this.onConfirmationEmailSent}
					/>
				)}
				{this.state.changeEmailModal && (
					<ChangeEmail
						emailAddress={
							(this.props.accounts.userDetails &&
								this.props.accounts.userDetails.EmailAddress) ||
							this.state.email ||
							'email@cointec.co.uk'
						}
						ctUser={this.state.ctUser}
						onClose={() => this.setState({ changeEmailModal: false })}
					/>
				)}
				{this.state.updatePasswordModal && (
					<UpdatePassword
						onClose={() => this.setState({ updatePasswordModal: false })}
					/>
				)}
				{this.state.closeAccountModal && (
					<CloseAccount
						onClose={() => this.setState({ closeAccountModal: false })}
					/>
				)}
			</div>
		)
	}

	componentWillReceiveProps(props) {
		console.log(props.verification)
	}
}

export default connect(
	({ auth, verification, accounts }) => ({ auth, verification, accounts }),
	{ fetchOrders, fetchAssetsList, fetchVerificationStatus, fetchUserDetails }
)(withRouter(AccountSettings))
