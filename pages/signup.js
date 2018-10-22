import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import Header from '../components/Header'
import SignUpForm from '../components/SignUpForm'

import { signUp } from '../store/actions'

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
		return this.props
			.signUp(values)
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
		Router.push('/link-sent/activation') //, { email })
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
				<Head>
					<title>Sign Up | Cointec</title>
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
					Already have an account?{' '}
					<Link href="/login">
						<a>Sign in</a>
					</Link>
				</p>

				<div className="bottom-bar d-none d-lg-block">
					<div className="container">
						<div className="row">
							<div className="col-6">@cointec ltd 2018</div>
							<div className="col-6 text-nowrap">
								<ul>
									<li>
										<Link href="/privacy">
											<a>Privacy Policy</a>
										</Link>
									</li>
									<li>
										<Link href="/terms">
											<a>Terms and conditions</a>
										</Link>
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

const withRedux = connect(
	({ auth }) => ({ auth }),
	{ signUp }
)

export default withRedux(SignUp)
