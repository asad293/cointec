import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ReactTitle } from 'react-meta-tags'
import { connect } from 'react-redux'

import Header from '../core/Header'
import ForgotPasswordForm from './ForgotPassword/ForgotPasswordForm'

import { forgotPassword } from '../../Redux/actions'

class ForgotPassword extends Component {
	constructor() {
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
		this.resetEmailSent = this.resetEmailSent.bind(this)
	}

	handleSubmit(values) {
		this.props.forgotPassword(values)
			.then(res => this.resetEmailSent(values.emailAddress))
	}

	resetEmailSent(email) {
		this.props.history.push('/link-sent/reset', { email })
	}

	render() {
		const { loading } = this.props.auth
		const { token } = this.props.match.params

		const description = !token
			? 'Please enter your email address to begin resetting your password.'
			: 'To receive another password reset link, please enter your email below.'

		return (
			<div className="signin-page">
				<ReactTitle title="Forgot Password | Cointec" />
				<Header background="gradient">
					<div className="sg-logo text-center position-relative">
						<Link to='/'>
							<img src="/img/logo-white.svg" alt="logo" />
						</Link>
					</div>
				</Header>
				<section className="form-wrapper">
					<div className="form-heading-wrapper">
						<h5 className="form-heading">
							<Link to='/login'><i className="far fa-arrow-left mr-3"></i></Link>
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

export default connect(({auth}) => ({auth}), { forgotPassword })(ForgotPassword)
