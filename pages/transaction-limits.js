import React, { Component } from 'react'
import Head from 'next/head'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import {
	toggleVerificationAlert,
	fetchTransactionLimits,
	fetchVerificationTier,
	validateSession
} from '../store/actions'

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
		const session = this.props.validateSession()
		if (session) {
			const ctUser = session['CT-ACCOUNT-ID']
			this.props.fetchTransactionLimits({ ctUser })
			this.props.fetchVerificationTier({ ctUser })
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
		const { currentTier } = this.props.verification
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
									<div style={{ marginBottom: 24 }}>
										<h6 className="heading">Transaction Limits</h6>
										{/* <h6 className="heading">Your saved bank accounts</h6> */}
										{currentTier && (
											<p className="verification-status" style={{ margin: 0 }}>
												<span className="beta-user">
													{currentTier.TierName}
												</span>{' '}
												| <a className="link-setting">upgrade</a>
											</p>
										)}
									</div>
									{limits && (
										<div className="limit-card">
											<div className="d-flex justify-content-between">
												<p className="limit-label">Daily limit</p>
												<p className="limit-value">
													{limits.vDaily}/{limits.lDaily} GBP
												</p>
											</div>
											<div className="limit-bar">
												<div
													className="limit-progress"
													style={{
														width: `${(limits.vDaily * 100) / limits.lDaily}%`
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
}

export default connect(
	({ auth, globals, accounts, verification }) => ({
		auth,
		globals,
		accounts,
		verification
	}),
	{
		toggleVerificationAlert,
		fetchTransactionLimits,
		fetchVerificationTier,
		validateSession
	}
)(withRouter(TransactionLimits))
