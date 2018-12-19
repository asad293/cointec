import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { requestData, exportData } from '../store/actions'
import cn from 'classnames'

import Header from '../components/Header'
import StickyFooter from '../components/StickyFooter'

const headings = {
	exportdata: 'Export data request',
	requestdata: 'Access to your data',
	closeaccount: 'Account closure'
}

const messages = {
	exportdata:
		'We will prepare your data and send it to you in the next 1-2 days.',
	requestdata:
		'We will prepare your data and send it to you in the next 1-2 days.',
	closeaccount:
		'Sorry to see you go. We will process your account and let you know when your account has been fully closed.'
}

class TokenExpired extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount() {}

	render() {
		const { action } = this.props.router.query

		const heading = headings[action]
		const message = messages[action]

		return (
			<div
				className="no-access-page full-height"
				style={{ backgroundColor: '#F7F9FA' }}>
				<Head>
					<title>Cointec</title>
				</Head>

				<Header>
					<Nav />
				</Header>

				<div className="content-wrapper">
					<div className="alert-box">
						<div className="alert-header">
							<h6 className="heading text-left">{heading}</h6>
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

const Nav = () => (
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
		</nav>
	</div>
)

export default connect(
	({ accounts }) => ({ accounts }),
	{ requestData, exportData }
)(
	reduxForm({
		form: 'TokenExpiredForm'
	})(withRouter(TokenExpired))
)
