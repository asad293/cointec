import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { fetchOrders, fetchAssetsList } from '../store/actions'
import Cookie from 'js-cookie'

import Nav from '../components/dashboard/Nav'
import AlertMessage from '../components/dashboard/AlertMessage'
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
			email: null
		}
	}

	componentDidMount() {
		const userData = localStorage.getItem('user')
		const user = userData && JSON.parse(userData)
		const sessionId = Cookie.get('CT-SESSION-ID')
		if (user && user.email && sessionId) {
			this.setState({ email: user.email })
		} else {
			Router.push(`/login?redirectPath=${this.props.router.pathname}`)
		}
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
				{this.state.showAlert && (
					<AlertMessage onHide={() => this.setState({ showAlert: false })} />
				)}
				<div className="container dashboard-container">
					<div className="row">
						<div className="col">
							<div className="content-wrapper p-0 h-auto position-relative">
								<TabsGroup />
								<SettingsMenu title="Your account" />
								<div className="settings-list">
									<div className="setting-wrapper">
										<div className="d-flex flex-column flex-md-row">
											<div>
												<h6 className="setting-name">
													Verification status
													<img src="/static/images/check.svg" alt="verified" />
												</h6>
												<p className="d-none d-md-block">
													Get verified to buy digital currency with GBP
												</p>
												<p className="d-block d-md-none mb-4">
													Get verified to buy with GBP
												</p>
											</div>
											<div className="ml-md-auto">
												<Link href="/account-verification">
													<a className="btn-setting">Complete verification</a>
												</Link>
											</div>
										</div>
									</div>
									<div className="setting-wrapper">
										<div className="d-flex flex-column flex-md-row">
											<div>
												<h6 className="setting-name">
													Email address
													<img src="/static/images/check.svg" alt="verified" />
												</h6>
												<p className="mb-4 mb-md-0">
													{this.state.email || 'nuurspace@gmail.com'} |
													<a
														className="link-setting"
														onClick={() =>
															this.setState({ changeEmailModal: true })
														}>
														update
													</a>
												</p>
											</div>
											<div className="ml-md-auto">
												<a
													className="btn-setting"
													onClick={() =>
														this.setState({ confirmEmailModal: true })
													}>
													Confirm email address
												</a>
											</div>
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
				<StickyFooter className="bg-white" />
				{this.state.confirmEmailModal && (
					<ConfirmEmail
						onClose={() => this.setState({ confirmEmailModal: false })}
					/>
				)}
				{this.state.changeEmailModal && (
					<ChangeEmail
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
}

export default connect(
	({ auth }) => ({ auth }),
	{ fetchOrders, fetchAssetsList }
)(withRouter(AccountSettings))
