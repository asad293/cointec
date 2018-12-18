import React, { Component } from 'react'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { validateToken } from '../store/actions'

const actions = {
	requestdata: 'request-data'
}

class OnLoad extends Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.tokenExpired = this.tokenExpired.bind(this)
		this.tokenValidated = this.tokenValidated.bind(this)
	}

	componentDidMount() {
		const { action, token } = this.props.router.query
		this.props
			.validateToken({
				action: actions[action],
				token
			})
			.then(res => this.tokenValidated(action))
			.catch(error => this.tokenExpired(action))
	}

	tokenExpired(action) {
		Router.push(
			`/token-expired/${action}`,
			`/token-expired?parameter=${action}`
		)
	}

	tokenValidated(action) {
		Router.push(`/request-sent/${action}`, `/request-sent?parameter=${action}`)
	}

	render() {
		return (
			<div
				className="d-flex justify-content-center"
				style={{ marginTop: '45vh' }}>
				<i className="fas fa-spinner-third fa-lg fa-spin mr-3 text-primary" />
			</div>
		)
	}
}

export default connect(
	({ accounts }) => ({ accounts }),
	{ validateToken }
)(withRouter(OnLoad))
