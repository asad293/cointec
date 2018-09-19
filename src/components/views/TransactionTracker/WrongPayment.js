import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import WrongPaymentForm from './WrongPaymentForm'

class WrongPayment extends Component {
	render() {
		return (
			<div>
				<p>
					Not to worry, we will refund your payment within 2 business days.
					Select your preferred refund account below and submit.
				</p>

				{this.props.ctUser && (
					<WrongPaymentForm
						ctUser={this.props.ctUser}
            txnID={this.props.txnID}
            onSubmit={this.props.onSubmit}
					/>
				)}
			</div>
		)
	}
}

export default withRouter(WrongPayment)

WrongPayment.propTypes = {
	onSubmit: PropTypes.func
}
