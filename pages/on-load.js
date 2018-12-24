import React, { Component } from 'react'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { validateToken, reportFraud } from '../store/actions'

const actions = {
	requestdata: 'request-data',
	exportdata: 'export-data',
	changeemail: 'change-email',
	'change-email': 'change-email',
	confirmemail: 'confirm-email',
	'confirm-email': 'confirm-email'
}

class OnLoad extends Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.tokenExpired = this.tokenExpired.bind(this)
		this.tokenValidated = this.tokenValidated.bind(this)
	}

	componentDidMount() {
		const { action, token, method } = this.props.router.query
		console.log(action, token, method)
		if (method === 'validate') {
			this.props
				.validateToken({
					action: actions[action.toLowerCase()],
					token
				})
				.then(res => this.tokenValidated(action))
				.catch(error => this.tokenExpired(action))
		} else if (method === 'report-fraud') {
			this.props.reportFraud({ token }).then(res => {
				console.log(res)
				this.tokenValidated(action)
			})
			// .catch(error => this.tokenExpired(action))
		}
	}

	tokenExpired(action) {
		Router.push(`/token-expired/${action}`, `/token-expired?action=${action}`)
	}

	tokenValidated(action) {
		if (method === 'validate') {
			if (action === 'confirmemail' || action === 'confirm-email') {
				Router.push('/account-settings')
			} else if (action === 'changeemail') {
				Router.push('/login')
			} else
				Router.push(`/request-sent/${action}`, `/request-sent?action=${action}`)
		} else {
			Router.push('no-access', '/account-locked')
		}
	}

	render() {
		return (
			<div
				className="d-flex justify-content-center"
				style={{ marginTop: '45vh' }}>
				<i className="fas fa-spinner-third fa-lg fa-spin mr-3 text-primary" />
				<style jsx global>{`
					html body {
						background: none;
						box-shadow: none;
					}
				`}</style>
			</div>
		)
	}
}

export default connect(
	({ accounts }) => ({ accounts }),
	{ validateToken, reportFraud }
)(withRouter(OnLoad))
