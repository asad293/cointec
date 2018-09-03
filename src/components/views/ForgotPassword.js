import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Header from '../core/Header'

@inject('forgotPasswordStore')
@observer
class ForgotPassword extends Component {

	validate = event => this.props.forgotPasswordStore.validate(event.target.name)
	handleInputChange = event => this.props.forgotPasswordStore.setData(event.target.name, event.target.value)
	handleSubmit = event => {
		event.preventDefault()

		this.props.forgotPasswordStore.validate()

		if (this.props.forgotPasswordStore.form.valid) {
			this.props.forgotPasswordStore.forgotPassword()
				.then(this.resetEmailSent)
		}
	}

	resetEmailSent = () => this.props.history.push('/link-sent/reset', {
		email: this.props.forgotPasswordStore.form.data.emailAddress
	})

	render() {
		const { form, inProgress } = this.props.forgotPasswordStore
		const { token } = this.props.match.params

		const labelEmail = form.isValid('emailAddress') ? 'Email' : 'Please enter a valid email'

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
					<form className="als-content" onSubmit={this.handleSubmit.bind(this)} noValidate>
						<h5 className="heading-line">
							{!token ? 
								'Please enter your email address to begin resetting your password.': 
								'To receive another password reset link, please enter your email below.'}
						</h5>

						<div className={'form-group ' + (!form.isValid('emailAddress') ? 'invalid' : '')}>
							<label htmlFor="email">{labelEmail}</label>
							<input
								name="emailAddress"
								type="email"
								className="form-control"
								placeholder="email@cointec.co.uk"
								value={form.data.emailAddress}
								onBlur={this.validate.bind(this)}
								onChange={this.handleInputChange.bind(this)}
							/>
						</div>

						<button type="submit" className="btn btn-primary" disabled={inProgress}>
							{inProgress ? <i className="fas fa-spinner fa-spin"></i>: 'Send reset email'}
						</button>
					</form>
				</section>
			</div>
			// <FormWrapper>
			// 	<div className="container">
			// 		<div className="row">
			// 			<div className="col-12 col-xl-4 form-section">
			// 				<Link to='/'>
			// 					<img src="/img/logo-color.svg" alt="Cointec Logo" className="mb-5" />
			// 				</Link>

			// 				<h1 className="page-title">Reset password</h1>							
			// 			</div>
			// 		</div>
			// 	</div>
			// </FormWrapper>
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

export default ForgotPassword