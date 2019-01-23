import React, { Component } from 'react'
import Link from 'next/link'
import Clipboard from 'react-clipboard.js'
// import ReactTooltip from 'react-tooltip'
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
										<a
											href={
												transaction.WalletAddress ||
												transaction.walletAddress || // To be removed
												''
											}
											target="_blank">
											{transaction.dest}
										</a>
										<Clipboard
											data-clipboard-text={transaction.dest}
											onClick={() =>
												this.setState({ showTooltip: true }, () => {
													setTimeout(() => {
														this.setState({
															showTooltip: false
														})
													}, 2000)
												})
											}>
											<i className="far fa-clone" />
											{/* <i
												className="far fa-clone"
												data-tip="Copied!"
												data-event="click focus"
											/> */}
										</Clipboard>
										<Tooltip visible={this.state.showTooltip} data="Copied!" />
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

							<Link
								href={`/transaction-tracker?txnID=${
									transaction.ctTransactionId
								}`}
								as={`/transaction-tracker/${transaction.ctTransactionId}`}>
								<a
									className="blockchain-tracker"
									style={{ display: 'block', textDecoration: 'none' }}>
									{/* <Clipboard data-clipboard-text={transaction.dest}> */}
									{transaction.status === 'COMPLETED'
										? 'Blockchain tracker'
										: 'Transaction tracker'}
									{/* <i className="far fa-clone" /> */}
									<i className="far fa-external-link" />
									{/* </Clipboard> */}
								</a>
							</Link>
						</div>
					</div>
				</div>
				{/* <ReactTooltip globalEventOff="click" /> */}
			</div>
		)
	}
}

const Tooltip = ({ visible, data }) => {
	return visible === true ? (
		<span className="copied-tooltip">{data}</span>
	) : null
}

export default TransactionDetail
