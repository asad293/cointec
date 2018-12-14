import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'

import StickyFooter from '../components/StickyFooter'

class NoAccess extends Component {
	constructor() {
		super()
		this.state = {}
	}

	render() {
		const { type } = this.props.router.query

		const heading =
			type === 'locked'
				? 'Account temporarily locked'
				: 'Your account has been closed'
		const message =
			type === 'locked'
				? `It looks like someone has made unauthorized access to your account. We will review this incident and unlock your account within 24 hours.`
				: `Sorry to see you go. You’re account has now been closed and you will no longer be able to use our services. See you again soon.`

		return (
			<div
				className="no-access-page full-height"
				style={{ backgroundColor: '#F7F9FA' }}>
				<Head>
					<title>
						{type === 'locked' ? 'Account Locked' : 'Account Closed'} | Cointec
					</title>
				</Head>

				<div className="content-wrapper">
					<div className="sg-logo text-center position-relative">
						<Link href="/">
							<a>
								<img src="/static/images/footer-logo.svg" alt="logo" />
							</a>
						</Link>
					</div>
					<div className="alert-box">
						<div className="alert-header">
							<h6 className="heading">{heading}</h6>
						</div>
						<div className="alert-body">
							<p className="message-text">{message}</p>
						</div>
					</div>
				</div>

				<StickyFooter className="bg-white" fixed={true} />
			</div>
		)
	}
}

export default withRouter(NoAccess)
