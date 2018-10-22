import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux'

import Header from '../components/Header'
import ForgotPasswordForm from '../components/ForgotPasswordForm'

import { forgotPassword } from '../store/actions'

class ForgotPassword extends Component {
	constructor() {
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
		this.resetEmailSent = this.resetEmailSent.bind(this)
	}

	handleSubmit(values) {
		this.props
			.forgotPassword(values)
			.then(res => this.resetEmailSent(values.emailAddress))
	}

	resetEmailSent(email) {
		// Router.push('/link-sent/reset', { email })
	}

	render() {
		const { loading } = this.props.auth
		const { token } = this.props.match.params

		const description = !token
			? 'Please enter your email address to begin resetting your password.'
			: 'To receive another password reset link, please enter your email below.'

		return (
			<div className="signin-page">
				<Head>
					<title>Forgot Password | Cointec</title>
				</Head>
				<Header background="gradient">
					<div className="sg-logo text-center position-relative">
						<Link href="/">
							<a>
								<img src="/static/images/logo-white.svg" alt="logo" />
							</a>
						</Link>
					</div>
				</Header>
				<section className="form-wrapper">
					<div className="form-heading-wrapper">
						<h5 className="form-heading">
							<Link href="/login">
								<a>
									<i className="far fa-arrow-left mr-3" />
								</a>
							</Link>
							Forgot password
						</h5>
					</div>
					<hr />

					<ForgotPasswordForm
						loading={loading}
						description={description}
						onSubmit={this.handleSubmit}
					/>
				</section>
			</div>
		)
	}
}

export default connect(
	({ auth }) => ({ auth }),
	{ forgotPassword }
)(ForgotPassword)
