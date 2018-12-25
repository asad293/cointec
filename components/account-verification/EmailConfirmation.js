import React, { Component } from 'react'
import Link from 'next/link'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { fetchVerificationOverview } from '../../store/actions'
import _ from 'lodash'

import LoadingCircle from '../LoadingCircle'

class EmailConfirmation extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// progress: 0
			timeout: null
		}
	}

	componentDidMount() {
		// setTimeout(() => {
		// 	this.setState({
		// 		progress: 100
		// 	})
		// 	setTimeout(() => {
		// 		this.props.onConfirm()
		// 	}, 1500)
		// }, 1000)
		this.initInterval()
	}

	componentWillUnmount() {
		if (this.state.timeout) clearTimeout(this.state.timeout)
	}

	initInterval() {
		if (this.state.timeout) clearTimeout(this.state.timeout)
		const timeout = setTimeout(() => {
			this.props.fetchVerificationOverview({ ctUser: this.props.ctUser })
		}, 5000)
		this.setState({ timeout })
		console.log(timeout)
	}

	render() {
		return (
			<div>
				<p className="confirmation-message">
					We’ve sent a confirmation email to{' '}
					<span className="email-address">
						{this.props.emailAddress || 'youremail@gmail.com'}
					</span>
					. If you can’t find the email please check your junk folder.
				</p>
				<Link href="/account-verification">
					<a className="confirmation-link">Resend confirmation email</a>
				</Link>
				<div className="loading-circle">
					<LoadingCircle />
					{/* <LoadingCircle infinite={false} progress={this.state.progress} /> */}
				</div>
			</div>
		)
	}

	componentWillReceiveProps(props) {
		const { overview } = props.verification
		if (overview) {
			const { FrontendProgress } = overview
			if (FrontendProgress === 'CONFIRMEMAIL') {
				this.initInterval()
			}
		}
	}
}

export default reduxForm({
	form: 'VerificationForm'
})(
	connect(
		({ verification }) => ({ verification }),
		{ fetchVerificationOverview }
	)(EmailConfirmation)
)
