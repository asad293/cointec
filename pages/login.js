import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import Header from '../components/Header'
import SignInForm from '../components/SignInForm'
import NotificationAlert from '../components/dashboard/NotificationAlert'
import StickyFooter from '../components/StickyFooter'

import { signIn } from '../store/actions'

class Login extends Component {
	constructor() {
		super()
		this.state = {
			maskPassword: false,
			notificationAlert: false,
			timeout: null
		}
		this.authComplete = this.authComplete.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.toggleMask = this.toggleMask.bind(this)
	}

	handleSubmit(values) {
		return this.props
			.signIn(values)
			.then(res => {
				this.authComplete()
			})
			.catch(error => {
				if (error.response.status === 403) {
					if (timeout) clearTimeout(timeout)
					const timeout = setTimeout(() => {
						this.setState({ notificationAlert: false })
					}, 5000)
					this.setState({ notificationAlert: true, timeout })
				} else {
					throw new SubmissionError({
						email: "Sorry, that email or password didn't work.",
						password: 'Password'
					})
				}
			})
	}

	authComplete() {
		const { query } = Router.router
		if (query && query.redirectPath) Router.push(query.redirectPath)
		else Router.push('/')
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
					<title>Login | Cointec</title>
				</Head>

				<NotificationAlert
					type="danger"
					visible={this.state.notificationAlert}
					onHide={() => this.setState({ notificationAlert: false })}>
					<p>
						This account is frozen.{' '}
						<b style={{ fontWeight: 600 }}>Contact us for more information</b>
					</p>
				</NotificationAlert>

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
					Don’t have an account?{' '}
					<Link href="/signup">
						<a>Sign up</a>
					</Link>
				</p>

				<StickyFooter className="d-none d-lg-block" />
			</div>
		)
	}
}

export default connect(
	({ auth }) => ({ auth }),
	{ signIn }
)(Login)
