import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
	// render() {
	// 	const { form, inProgress } = this.props.forgotPasswordStore
	// 	const { token } = this.props.match.params

	// 	const labelEmail = form.isValid('emailAddress') ? 'Email' : 'Please enter a valid email'

	// 	return (
	// 		<FormWrapper>
	// 			<div className="container">
	// 				<div className="row">
	// 					<div className="col-12 col-xl-4 form-section">
	// 						<Link to='/'>
	// 							<img src="/img/logo-color.svg" alt="Cointec Logo" className="mb-5" />
	// 						</Link>

	// 						<h1 className="page-title">Reset password</h1>

	// 						<form className="als-content" onSubmit={this.handleSubmit.bind(this)} noValidate>
	// 							<h5 className="heading-line">
	// 								{!token ? 
	// 									'Please enter your email address to begin resetting your password.': 
	// 									'To receive another password reset link, please enter your email below.'}
	// 							</h5>

	// 							<div className={'form-group ' + (!form.isValid('emailAddress') ? 'invalid' : '')}>
	// 								<label htmlFor="email">{labelEmail}</label>
	// 								<input
	// 									name="emailAddress"
	// 									type="email"
	// 									className="form-control"
	// 									placeholder="email@cointec.co.uk"
	// 									value={form.data.emailAddress}
	// 									onBlur={this.validate.bind(this)}
	// 									onChange={this.handleInputChange.bind(this)}
	// 								/>
	// 							</div>

	// 							<button type="submit" className="btn btn-primary" disabled={inProgress}>
	// 								{inProgress ? <i className="fas fa-spinner fa-spin"></i>: 'Send reset email'}
	// 							</button>
	// 						</form>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</FormWrapper>
	// 	)
	// }
}

export default connect(({auth}) => ({auth}), { forgotPassword })(ForgotPassword)
