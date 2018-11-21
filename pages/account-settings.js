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
import StickyFooter from '../components/StickyFooter'

class AccountSettings extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showAlert: true
		}
	}

	componentDidMount() {
		// const userData = localStorage.getItem('user')
		// const user = userData && JSON.parse(userData)
		// const sessionId = Cookie.get('CT-SESSION-ID')
		// if (user && user.CtUserId && sessionId) {
		// 	this.props.fetchOrders({ ctUser: user.CtUserId })
		// } else {
		// 	Router.push(`/login?redirectPath=${this.props.router.pathname}`)
		// }
	}

	render() {
		return (
			<div
				className="settings-page dashboard-page full-height"
				style={{ background: '#F7F9FA', overflowY: 'auto' }}>
				<Head>
					<title>Dashboard | Cointec</title>
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
							<div className="content-wrapper p-0 h-auto">
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
													nuurspace@gmail.com |
													<Link href="/account-settings">
														<a className="link-setting">update</a>
													</Link>
												</p>
											</div>
											<div className="ml-md-auto">
												<Link href="/account-settings">
													<a className="btn-setting">Confirm email address</a>
												</Link>
											</div>
										</div>
									</div>
									<div className="setting-wrapper">
										<div className="d-flex">
											<div>
												<h6 className="setting-name">Password</h6>
												<p>
													************ |
													<Link href="/account-settings">
														<a className="link-setting">update</a>
													</Link>
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
												<Link href="/account-settings">
													<a className="btn-setting text-danger">
														Close your account
													</a>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<StickyFooter className="bg-white" />
			</div>
		)
	}

	componentWillReceiveProps(props) {}
}

export default connect(
	({ order, assets }) => ({ order, assets }),
	{ fetchOrders, fetchAssetsList }
)(withRouter(AccountSettings))
