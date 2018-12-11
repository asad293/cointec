import React, { Component } from 'react'
import Clipboard from 'react-clipboard.js'
import cn from 'classnames'

class TransactionDetail extends Component {
	constructor() {
		super()
		this.state = {
			closed: false
		}
		this.onClose = this.onClose.bind(this)
		this.onClickOutside = this.onClickOutside.bind(this)
	}

	onClose() {
		this.setState(
			{
				closed: true
			},
			() => {
				setTimeout(() => {
					this.props.onClose()
				}, 300)
			}
		)
	}

	componentDidMount() {
		setTimeout(() => {
			addEventListener('click', this.onClickOutside)
		}, 500)
	}

	componentWillUnmount() {
		removeEventListener('click', this.onClickOutside)
	}

	onClickOutside = event => {
		const select = event.path.find(
			node => node.className === 'modal-dialog modal-transaction-detail'
		)
		if (!select) {
			this.onClose()
		}
	}

	render() {
		const { transaction } = this.props
		return (
			<div
				className="modal fade show"
				id="abandon-order-modal"
				role="dialog"
				data-backdrop="false"
				style={{ display: 'block' }}>
				<div
					className="modal-dialog modal-transaction-detail"
					role="document"
					style={{ transform: this.state.closed ? 'translateY(-120%)' : '' }}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-heading text-left">Transaction detail</h5>
							<button type="button" className="close" onClick={this.onClose}>
								<i className="far fa-times fa-sm" />
							</button>
						</div>
						<div className="modal-body">
							<div className="transaction-details">
								<div className="transaction-field">
									<h6 className="field-label">Transaction status</h6>
									<p
										className={cn(
											'field-value status',
											transaction.status === 'COMPLETED'
												? 'completed'
												: transaction.status === 'FAILED' ||
												  transaction.status === 'CANCELLED'
												? 'failed'
												: ''
										)}>
										{transaction.status}
									</p>
								</div>
								<div className="transaction-field">
									<h6 className="field-label">Send amount</h6>
									<p className="field-value">
										{transaction.sourceAmount} {transaction.sourceCurrency}
									</p>
								</div>
								<div className="transaction-field">
									<h6 className="field-label">Receive amount</h6>
									<p className="field-value">
										{transaction.destAmount} {transaction.destCurrency}
									</p>
								</div>
								<div className="transaction-field position-relative">
									<h6 className="field-label">Wallet address</h6>
									<p className="field-value">
										<a href="/" target="_blank">
											{transaction.dest}
										</a>
										<Clipboard data-clipboard-text={transaction.dest}>
											<i className="far fa-clone" />
										</Clipboard>
									</p>
								</div>
								<div className="transaction-field">
									<h6 className="field-label">Exchange rate</h6>
									<p className="field-value">
										{transaction.exchangeRate} {transaction.sourceCurrency}/
										{transaction.destCurrency}
									</p>
								</div>
								<div className="transaction-field">
									<h6 className="field-label">Identifier</h6>
									<p className="field-value">{transaction.orderReference}</p>
								</div>
							</div>

							<div className="blockchain-tracker">
								{/* <Clipboard data-clipboard-text={transaction.dest}> */}
								Blockchain tracker
								{/* <i className="far fa-clone" /> */}
								<i className="far fa-external-link" />
								{/* </Clipboard> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default TransactionDetail
