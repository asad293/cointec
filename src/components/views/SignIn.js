import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Header from '../core/Header'
import PasswordToggle from '../core/PasswordToggle'

@inject('signInStore')
@observer
class SignIn extends Component {
	handleInputChange = event =>
		this.props.signInStore.setData(event.target.name, event.target.value)
	togglePassword = () => this.props.signInStore.togglePassword()
	handleSubmit = event => {
		event.preventDefault()

		this.props.signInStore.validate()

		if (this.props.signInStore.form.valid) {
			this.props.signInStore.signIn().then(this.authComplete)
		}
	}

	authComplete = response => {
		const { history } = this.props
		if (history.location.state && history.location.state.redirectPath)
			history.push(history.location.state.redirectPath)
		else
			history.push('')
	}

	render() {
		const {
			form,
			passwordVisible,
			inProgress,
			responseError
		} = this.props.signInStore

		const labelEmail = form.isValid('email')
			? 'Email'
			: 'Please enter a valid email'
		const labelPassword = form.isValid('password')
			? 'Password'
			: 'Please enter a valid password'

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
						<h5 className="form-heading">Log in</h5>
					</div>
					<hr />
					<form className="signin-form"
						onSubmit={this.handleSubmit.bind(this)}
						noValidate>
						<div className={`form-group ${!form.isValid('email') ? 'invalid' : ''}`}>
							<label htmlFor="email">{labelEmail}</label>
							<input
								name="email"
								type="email"
								className="form-control"
								placeholder="email@cointec.co.uk"
								value={form.data.email}
								onChange={this.handleInputChange.bind(this)}
							/>
						</div>

						<div className={`form-group ${!form.isValid('password') ? 'invalid' : ''}`}>
							<label htmlFor="password">{labelPassword}</label>
							<div className="position-relative">
								<input
									name="password"
									type={passwordVisible ? 'text' : 'password'}
									className="form-control password"
									placeholder="••••••••"
									value={form.data.password}
									onChange={this.handleInputChange.bind(this)}
									autoComplete="off"
								/>

								<PasswordToggle
									visible={passwordVisible}
									onToggle={this.togglePassword.bind(this)}
								/>
							</div>
						</div>

						<Link to="/forgot-password" className="d-block link-forgot-password">
							Forgot password?
						</Link>

						<button
							type="submit"
							className="btn btn-primary"
							disabled={inProgress}>
							{inProgress ? <div><i className="fas fa-spinner fa-spin" /></div>
								: <span>Sign in</span>}
						</button>

					</form>
				</section>
				<p className="have-account">
					Don’t have an account? <Link to="/signup">Sign up</Link>
				</p>
			</div>
			// <div className="container-fluid position-absolute">
			// 	<div className="row full-height">
			// 		<div className="col-12 col-xl-4 form-section">
			// 			<h1 className="page-title">Sign In</h1>
			// 			<div
			// 				className="form-error"
			// 				style={{ visibility: responseError ? 'visible' : 'hidden' }}>
			// 				Sorry, that email or password didn't work.
			// 			</div>

			// 		</div>
			// 	</div>
			// </div>
		)
	}
}

export default SignIn
