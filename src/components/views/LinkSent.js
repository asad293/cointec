import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Header from '../core/Header'

class SignIn extends Component {
	constructor() {
		super()
	}

	render() {
		const { type } = this.props.match.params
		const email = this.props.location ? this.props.location.state.email : ''
		const heading = type == 'activation' ? 'Activation link sent' :
				type == 'reset' ? 'Reset link sent' : ''
		const message = type == 'activation' ? 'We sent you an activation link to: ' :
				type == 'reset' ? 'We sent you a link to reset your password to: ' : ''

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
							{heading}
						</h5>
					</div>
					<hr />
					<div className="als-content">
						<p className="heading">{message}</p>
						<p className="email">{email}</p>
						<p className="desc">If you don't see the message in a few minutes, check your spam folder.</p>
						<button className="btn btn-primary">Resend Email</button>
					</div>
				</section>
			</div>
			// <FormWrapper>
			// 	<div className="container">
			// 		<div className="row">
			// 			<div className="col-12 col-xl-4 form-section">
			// 				<h1 className="page-title">Check your inbox!</h1>
			// 			</div>
			// 		</div>
			// 	</div>
			// </FormWrapper>
		)
	}
	// render() {
	// 	const { type } = this.props.match.params
	// 	const heading =
	// 		type == 'activation' ? 'We sent you an activation link. ' :
	// 			type == 'reset' ? 'We sent you a link to reset your password. ' : ''

	// 	return (
	// 		<FormWrapper>
	// 			<div className="container">
	// 				<div className="row">
	// 					<div className="col-12 col-xl-4 form-section">
	// 						<Link to='/'>
	// 							<img src="/img/logo-color.svg" alt="Cointec Logo" className="mb-5" />
	// 						</Link>

	// 						<h1 className="page-title">Check your inbox!</h1>

	// 						<div className="als-content">
	// 							<h1 className="heading">{heading}</h1>
	// 							<p className="desc">If you don't see the message in a few minutes, check your spam folder.</p>
	// 							<button className="btn btn-primary">Resend Email</button>
	// 						</div>
	// 					</div>

	// 				</div>
	// 			</div>
	// 		</FormWrapper>
	// 	)
	// }
}

export default SignIn