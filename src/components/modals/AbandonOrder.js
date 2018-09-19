import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import WrongPayment from '../views/TransactionTracker/WrongPayment'
import WrongPayee from '../views/TransactionTracker/WrongPayee'
import NoPayment from '../views/TransactionTracker/NoPayment'

class AbandonOrder extends Component {
	constructor() {
		super()
		this.state = {
			reason: null
		}
		this.reasonSelected = this.reasonSelected.bind(this)
		this.back = this.back.bind(this)
		this.onClose = this.onClose.bind(this)
	}

	reasonSelected(reason) {
		this.setState({ reason })
	}

	back() {
		this.setState({
			reason: null
		})
	}

	onClose() {
		this.props.onClose()
	}

	render() {
		return (
			<div
				className="modal fade show"
				id="abandon-order-modal"
				role="dialog"
				data-backdrop="false"
				style={{ display: 'block' }}>
				<div className="modal-dialog modal-abandon" role="document">
					<div className="modal-content">
						<div className="modal-body">
							<button type="button" className="close" onClick={this.onClose}>
								<span aria-hidden="true">&times;</span>
							</button>

							<h5 className="modal-heading text-left">
								{this.state.reason && (
									<a className="back" onClick={this.back}>
										<i className="far fa-arrow-left" />
									</a>
								)}
								{this.state.reason
									? this.state.reason === 'WRONGAMOUNT'
										? 'I sent the wrong amount of GBP'
										: this.state.reason === 'WRONGPAYEE'
											? 'I sent to the wrong payee'
											: this.state.reason === 'NOPAYMENT'
												? 'I did not make payment'
												: ''
									: 'Select what went wrong'}
							</h5>
							<hr />

							{!this.state.reason && (
								<SelectReason reasonSelected={this.reasonSelected} />
							)}
							{this.state.reason === 'WRONGAMOUNT' && (
								<WrongPayment
									txnID={this.props.txnID}
									ctUser={this.props.ctUser}
                  onSubmit={this.onClose}
								/>
							)}
							{this.state.reason === 'WRONGPAYEE' && (
								<WrongPayee
									txnID={this.props.txnID}
                  ctUser={this.props.ctUser}
                  onSubmit={this.onClose}
								/>
							)}
							{this.state.reason === 'NOPAYMENT' && (
								<NoPayment
									txnID={this.props.txnID}
									ctUser={this.props.ctUser}
                  onSubmit={this.onClose}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const SelectReason = ({ reasonSelected }) => (
	<div>
		<div>
			<button
				className="btn btn-option"
				onClick={() => reasonSelected('WRONGAMOUNT')}>
				I sent the wrong amount of GBP
			</button>
			<button
				className="btn btn-option"
				onClick={() => reasonSelected('WRONGPAYEE')}>
				I sent to the wrong payee
			</button>
			<button
				className="btn btn-option"
				onClick={() => reasonSelected('NOPAYMENT')}>
				I did not make payment
			</button>
		</div>

		<p className="my-3">
			Can’t find what you’re looking for? <Link to="/">Contact us</Link>
		</p>
	</div>
)

export default AbandonOrder

AbandonOrder.propTypes = {
	onClose: PropTypes.func
}
