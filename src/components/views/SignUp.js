import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import Header from '../core/Header'
import SignUpForm from './SignUp/SignUpForm'

import { signUp } from '../../Redux/actions'

class SignUp extends Component {
	constructor() {
		super()
		this.state = {
			maskPassword: false
		}
		this.authComplete = this.authComplete.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.toggleMask = this.toggleMask.bind(this)
	}
	
	handleSubmit(values) {
		return this.props.signUp(values)
			.then(res => {
				console.log(res)
				this.authComplete(values.emailAddress)
			})
			.catch(error => {
				throw new SubmissionError({
					emailAddress: 'Email already exists, please sign in'
				})
			})
	}

	authComplete(email) {
		this.props.history.push('/link-sent/activation', { email })
	}

	toggleMask() {
		this.setState({
			maskPassword: !this.state.maskPassword
		})
	}

	render() {
		const { loading } = this.props.auth

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
						<h5 className="form-heading">Create an account</h5>
					</div>
					<hr />

					<SignUpForm
						loading={loading}
						maskPassword={this.state.maskPassword}
						toggleMask={this.toggleMask}
						onSubmit={this.handleSubmit}
					/>
				</section>

				<p className="have-account">
					Already have an account? <Link to="/login">Sign in</Link>
				</p>

				<div className="bottom-bar d-none d-lg-block">
					<div className="container">
						<div className="row">
							<div className="col-6">@cointec ltd 2018</div>
							<div className="col-6 text-nowrap">
								<ul>
									<li>
										<Link to="/privacy">Privacy Policy</Link>
									</li>
									<li>
										<Link to="/terms">Terms and conditions</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(({auth}) => ({auth}), { signUp })(SignUp)
