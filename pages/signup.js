import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import Header from '../components/Header'
import NotificationAlert from '../components/dashboard/NotificationAlert'
import SignUpForm from '../components/SignUpForm'
import StickyFooter from '../components/StickyFooter'

import { signUp } from '../store/actions'

class SignUp extends Component {
	constructor() {
		super()
		this.state = {
			maskPassword: false,
			notificationAlert: false,
			notificationContent: null
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
				// this.authComplete(values.emailAddress)
				this.onSent(values.emailAddress)
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

	onSent(email) {
		const notificationContent = (
			<p>
				Confirmation email sent to <b>{email}</b>
			</p>
		)
		this.setState({
			notificationAlert: true,
			notificationContent
		})
		setTimeout(() => {
			this.setState({
				notificationAlert: false
			})
		}, 5000)
	}

	render() {
		const { loading } = this.props.auth

		return (
			<div className="signin-page">
				<Head>
					<title>Sign Up | Cointec</title>
				</Head>

				{this.state.notificationAlert && (
					<NotificationAlert
						onHide={() => this.setState({ notificationAlert: false })}>
						{this.state.notificationContent}
					</NotificationAlert>
				)}

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

				<StickyFooter className="d-none d-lg-block" />
			</div>
		)
	}
}

const withRedux = connect(
	({ auth }) => ({ auth }),
	{ signUp }
)

export default withRedux(SignUp)
