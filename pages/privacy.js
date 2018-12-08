import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { fetchOrders } from '../store/actions'
import Cookie from 'js-cookie'

import Nav from '../components/dashboard/Nav'
import AlertMessage from '../components/dashboard/AlertMessage'
import NotificationAlert from '../components/dashboard/NotificationAlert'
import TabsGroup from '../components/account-settings/TabsGroup'
import SettingsMenu from '../components/account-settings/SettingsMenu'
import RequestData from '../components/account-settings/RequestData'
import StickyFooter from '../components/StickyFooter'

class Privacy extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showAlert: true,
			saved: false,
			requestDataModal: false,
			scrolling: false,
			notificationAlert: false,
			notificationSettings: [
				{
					id: 1,
					name: 'My transfers',
					description: 'notifications about where your coins are.',
					active: false
				},
				{
					id: 2,
					name: 'New coins and features',
					description: 'our latest and greatest work, sent monthly at most.',
					shortDescription: 'latest product information',
					active: true
				},
				{
					id: 3,
					name: 'Giving feedback',
					description: 'surveys, reviews, and testing things we’re working on.',
					active: true
				}
			]
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.onConfirmationEmailSent = this.onConfirmationEmailSent.bind(this)
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
		const element = document.querySelector('.settings-page')
		const documentElement = document.documentElement

		this.setState({
			scrolling:
				element && documentElement
					? documentElement.clientHeight < element.scrollHeight
					: false
		})
	}

	handleInputChange(event) {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name
		const notificationSettings = this.state.notificationSettings
		notificationSettings.find(setting => setting.id == name).active = value
		this.setState({
			notificationSettings,
			saved: true
		})
		setTimeout(() => {
			this.setState({
				saved: false
			})
		}, 1000)
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
					<title>Privacy | Cointec</title>
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
							<div className="content-wrapper p-0 h-auto">
								<TabsGroup />
								<SettingsMenu title="Privacy" />
								<div className="privacy">
									<div className="setting-group">
										<h6 className="heading">Notifications</h6>
										<div>
											{this.state.notificationSettings.map(setting => (
												<label
													className="notification-setting"
													key={setting.id}>
													<span className="setting-name">{setting.name}</span>
													<span
														className={
															setting.shortDescription
																? 'd-none d-lg-inline'
																: 'd-none d-md-inline'
														}>
														{' '}
														- {setting.description}
													</span>
													<span
														className={
															setting.shortDescription
																? 'd-none d-md-inline d-lg-none'
																: 'd-none'
														}>
														{' '}
														- {setting.shortDescription}
													</span>
													<input
														type="checkbox"
														checked={setting.active}
														name={setting.id}
														onChange={this.handleInputChange}
													/>
												</label>
											))}
										</div>
										<div>
											{this.state.saved && (
												<p
													className="saved d-inline d-md-none"
													style={{ marginBottom: 12, marginTop: 8 }}>
													Changes saved
												</p>
											)}
										</div>
										<div className="d-flex justify-content-between">
											<p className="tc-stat">
												There are some things that we’ll always need to tell you
												about like changes to our T&C’s.
											</p>
											{this.state.saved && (
												<span className="saved d-none d-md-inline">Saved</span>
											)}
										</div>
									</div>
									<hr className="m-0" />
									<div className="setting-wrapper">
										<div className="d-flex flex-column flex-md-row">
											<div>
												<h6 className="setting-name">Data request</h6>
												<p className="d-none d-lg-block">
													Request access to all your personal information stored
													on our system.
												</p>
												<p className="mb-4 mb-md-0 d-block d-lg-none">
													Request access to your personal data.
												</p>
											</div>
											<div className="ml-md-auto">
												<a
													className="btn-setting"
													onClick={() =>
														this.setState({ requestDataModal: true })
													}>
													Data access request
												</a>
											</div>
										</div>
									</div>
									<hr className="m-0" />
									<div className="setting-wrapper">
										<div className="d-flex flex-column flex-md-row">
											<div>
												<h6 className="setting-name">Export Data</h6>
												<p className="d-none d-lg-block">
													Export your data in a text foile
												</p>
												<p className="mb-4 mb-md-0 d-block d-lg-none">
													Export your data in a text foile
												</p>
											</div>
											<div className="ml-md-auto">
												<a
													className="btn-setting"
													onClick={() =>
														this.setState({ requestDataModal: true })
													}>
													Export your data
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
				{this.state.requestDataModal && (
					<RequestData
						ctUser={this.state.ctUser}
						emailAddress={this.state.email}
						onClose={() => this.setState({ requestDataModal: false })}
						onRequestSent={this.onConfirmationEmailSent}
					/>
				)}
			</div>
		)
	}
}

export default connect(
	({ accounts, verification }) => ({ accounts, verification }),
	{ fetchOrders }
)(withRouter(Privacy))
