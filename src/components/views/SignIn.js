import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import Header from '../core/Header'
import SignInForm from './SignIn/SignInForm'

import { signIn } from '../../Redux/actions'

class SignIn extends Component {
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
		return this.props.signIn(values)
			.then(res => {
				this.authComplete()
			})
			.catch(error => {
				// throw new SubmissionError({ email: error.response ? error.response.data.Message : 'Sorry, that email or password didn\'t work.' })
				throw new SubmissionError({ email: 'Sorry, that email or password didn\'t work.', password: 'Password' })
			})
	}

	authComplete() {
		const { history } = this.props
		if (history.location.state && history.location.state.redirectPath)
			history.push(history.location.state.redirectPath)
		else
			history.push('')
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
						<h5 className="form-heading">Log in</h5>
					</div>
					<hr />

					<SignInForm
						loading={loading}
						maskPassword={this.state.maskPassword}
						toggleMask={this.toggleMask}
						onSubmit={this.handleSubmit}
					/>
				</section>
				<p className="have-account">
					Don’t have an account? <Link to="/signup">Sign up</Link>
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

export default connect(({auth}) => ({auth}), { signIn })(SignIn)
