import React, { Component } from 'react'
import Link from 'next/link'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import _ from 'lodash'

class EmailConfirmation extends Component {
	constructor(props) {
		super(props)
		this.state = {
			progress: 0
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				progress: 100
			})
			setTimeout(() => {
				this.props.onConfirm()
			}, 1500)
		}, 1000)
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
					<LoadingCircle progress={this.state.progress} />
				</div>
			</div>
		)
	}
}

const LoadingCircle = ({ progress = 0 }) => (
	<svg height="24" width="24">
		<circle
			stroke="#C0C7CC"
			strokeWidth="3"
			fill="transparent"
			r="10"
			cx="12"
			cy="12"
		/>
		<circle
			stroke="#0459C4"
			strokeDasharray="64"
			strokeWidth="3"
			fill="transparent"
			r="10"
			cx="12"
			cy="12"
			style={{
				strokeDashoffset: (64 * progress) / 100 - 64,
				transform: 'rotateY(180deg)',
				transformOrigin: 'center',
				transition: 'stroke-dashoffset 1s'
			}}
		/>
	</svg>
)

export default reduxForm({
	form: 'VerificationForm'
})(EmailConfirmation)
