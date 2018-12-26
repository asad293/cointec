import React, { Component } from 'react'
import Head from 'next/head'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import {
	toggleVerificationAlert,
	fetchTransactionLimits
} from '../store/actions'
import Cookie from 'js-cookie'

import Nav from '../components/dashboard/Nav'
import AlertMessage from '../components/dashboard/AlertMessage'
import TabsGroup from '../components/account-settings/TabsGroup'
import SettingsMenu from '../components/account-settings/SettingsMenu'
import StickyFooter from '../components/StickyFooter'

class TransactionLimits extends Component {
	constructor(props) {
		super(props)
		this.state = {
			scrolling: false
		}
	}

	componentDidMount() {
		const userData = localStorage.getItem('user')
		const user = userData && JSON.parse(userData)
		const sessionId = Cookie.get('CT-SESSION-ID')
		if (user && user.CtUserId && sessionId) {
			this.props.fetchTransactionLimits({ ctUser: user.CtUserId })
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
					: false,
			docWidth: documentElement.clientWidth
		})
	}

	render() {
		const { limits } = this.props.accounts
		return (
			<div
				className="settings-page dashboard-page full-height"
				style={{ background: '#F7F9FA', overflowY: 'auto' }}>
				<Head>
					<title>Transaction Limits | Cointec</title>
				</Head>
				<header>
					<Nav />
					<hr className="hr-header" />
					<div className="container">
						<h2 className="dashboard-heading">Account settings</h2>
					</div>
				</header>
				{this.props.globals.verificationAlert && (
					<AlertMessage
						onHide={() => {
							this.props.toggleVerificationAlert(false)
							this.onResize()
						}}
					/>
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
								<SettingsMenu title="Transaction limits" />
								<div className="transaction-limits">
									<h6 className="heading d-none d-md-flex">
										Your saved bank accounts
									</h6>
									<h6 className="heading d-flex d-md-none">Bank transfer</h6>
									{limits && (
										<div className="limit-card">
											<div className="d-flex justify-content-between">
												<p className="limit-label">Daily limit</p>
												<p className="limit-value">
													{limits.vDaily}/{limits.lDaily + limits.vDaily} GBP
												</p>
											</div>
											<div className="limit-bar">
												<div
													className="limit-progress"
													style={{
														width: `${(limits.vDaily * 100) /
															(limits.lDaily + limits.vDaily)}%`
													}}
												/>
											</div>
										</div>
									)}
									<p className="coming-soon">Increased limits coming soon</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<StickyFooter className="bg-white" fixed={!this.state.scrolling} />
				<style jsx global>{`
					#intercom-container {
						display: ${this.state.docWidth > 768 ? 'block' : 'none'};
					}
				`}</style>
			</div>
		)
	}

	componentWillReceiveProps(props) {
		console.log(props.accounts.limits)
	}
}

export default connect(
	({ globals, accounts }) => ({ globals, accounts }),
	{ toggleVerificationAlert, fetchTransactionLimits }
)(withRouter(TransactionLimits))
