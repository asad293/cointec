import React, { Component } from 'react'
import { formValueSelector, Field, reduxForm } from 'redux-form'
import cn from 'classnames'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MinutesFormat from '../MinutesFormat'
import {
	fetchAccounts,
	fetchConsts,
	getStatus,
	createOrder,
	clearOrder
} from '../../store/actions'

class BankTransfer extends Component {
	constructor() {
		super()
		this.state = {
			timerId: null,
			timer: 0,
			refreshTime: 10,
			sourceAccount: null,
			expired: false
		}

		this.tick = this.tick.bind(this)
		this.initInterval = this.initInterval.bind(this)
		this.fetchCalls = this.fetchCalls.bind(this)
		this.startPayment = this.startPayment.bind(this)
		this.restart = this.restart.bind(this)
		// this.handleChange = this.handleChange.bind(this)
		this.renderButton = this.renderButton.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	initInterval() {
		clearInterval(this.state.timerId)
		const timerId = setInterval(this.tick, 1000)
		this.setState({ timerId })
	}

	tick() {
		if (this.state.timer < this.state.refreshTime) {
			this.setState({ timer: this.state.timer + 1 })
		} else {
			clearInterval(this.state.timerId)
			this.setState({ expired: true })
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.startPayment()
		}, 500)
	}

	componentWillUnmount() {
		clearInterval(this.state.timerId)
	}

	fetchCalls() {
		this.props.fetchConsts()
	}

	startPayment() {
		const createdAt = Math.round(new Date().getTime() / 1000.0)
		this.props.createOrder({
			destAmount: this.props.receiveAmount,
			sourceAmount: this.props.sendAmount,
			destCurrency: this.props.receiveCurrency,
			sourceCurrency: this.props.sendCurrency,
			exchangeRate: this.props.rate,
			dest: this.props.wallet,
			ctUser: this.props.ctUser,
			createdAt
		})
		this.setState({ expired: false })
		this.initInterval()
		this.fetchCalls()
	}

	restart() {
		this.props.onRestart()
	}

	handleChange(account) {
		this.setState({ sourceAccount: account })
	}

	renderButton() {
		if (this.props.sendCurrency === 'GBP')
			return (
				<button
					type="submit"
					className={cn(
						'btn-block btn-lg btn-exchange no-border',
						'btn-primary'
					)}
					disabled={!this.props.sendFromAccount}>
					Proceed to payment
				</button>
			)
		else
			return (
				<button
					type="submit"
					className={cn(
						'btn-block btn-lg btn-exchange no-border',
						'btn-primary'
					)}
					disabled={!this.props.depositAddress}>
					Proceed to payment
				</button>
			)
	}

	onSubmit(event) {
		event.preventDefault()
		const {
			sendFromAccount,
			order,
			ctUser,
			sendCurrency,
			depositAddress
		} = this.props
		if (sendCurrency === 'GBP') {
			this.props.clearOrder({
				orderId: order.create.CtTransactionId,
				accountId: sendFromAccount.id,
				ctUser
			})
			this.props.onConfirm({
				txnID: order.create.CtTransactionId
			})
		} else {
			this.props.clearOrder({
				orderId: order.create.CtTransactionId,
				accountId: null,
				ctUser
			})
		}
	}

	renderScreen() {
		const { sendAmount, accounts, sendFromAccount } = this.props
		const { AccountOwner, SortCode, AccountReference, AccountNumber } =
			sendFromAccount || {}

		return (
			<div>
				<div className="main-calc-wrapper make-payment-wrapper">
					<form onSubmit={this.onSubmit}>
						<div className="row">
							<div className="col-6 text-left text-nowrap">
								<label className="field-label">Beneficiary</label>
								<p className="field-value">{AccountOwner || <br />}</p>
							</div>
							<div className="col-6 text-left text-nowrap">
								<label className="field-label">Payment type</label>
								<p className="field-value">Bank Transfer</p>
							</div>
						</div>
						<div className="row">
							<div className="col-6 text-left text-nowrap">
								<label className="field-label">Account number</label>
								<p className="field-value">{AccountNumber || 'XXXXXXXX'}</p>
							</div>
							<div className="col-6 text-left text-nowrap">
								<label className="field-label">Sort code</label>
								<p className="field-value">{SortCode || 'XX-XX-XX'}</p>
							</div>
						</div>
						<div className="row">
							<div className="col-6 text-left text-nowrap">
								<label className="field-label">Reference</label>
								<p className="field-value m-0">
									{AccountReference || 'XXXXXXXX'}
								</p>
							</div>
							<div className="col-6 text-left text-nowrap">
								<label className="field-label">Amount</label>
								<p className="field-value m-0">{sendAmount.toFixed(8)} GBP</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<hr />
							</div>
						</div>
						<div className="row">
							<div className="col-12 text-left">
								<label className="field-label">Send from</label>
								{/* <Field
									name="sendFrom"
									component="select"
									className="custom-select accounts-select"
									onChange={this.handleChange}>
									{accounts.list &&
										accounts.list.map(account => (
											<option value={account.id} key={account.id}>
												{account.BankName} - {account.SortCode}
											</option>
										))}
									<option value="addBank">Add a new bank</option>
								</Field> */}
								<div className="dropdown accounts-dropdown">
									<a
										className="dropdown-toggle"
										id="dropdownMenuButton"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false">
										<span className="account-source">
											{this.state.sourceAccount
												? `${this.state.sourceAccount.BankName} (${
														this.state.sourceAccount.SortCode
												  })`
												: 'Send From'}
										</span>
										{/* <span>Primary account</span> */}
										<i className="far fa-angle-down" />
									</a>
									<div
										className="dropdown-menu"
										aria-labelledby="dropdownMenuButton">
										<div className="accounts-list">
											{accounts.list &&
												accounts.list.map(account => (
													<a
														className="dropdown-item d-flex justify-content-between"
														key={account.id}
														onClick={this.handleChange.bind(this, account)}>
														<div className="bank-account-name">
															{account.BankName}
														</div>
														<div className="bank-account-sortcode">
															{account.SortCode}
														</div>
													</a>
												))}
										</div>
										<div
											className="add-bank-account"
											onClick={this.props.onAddAccount}>
											Add bank account
											<img
												className="add-account-icon"
												src="/static/images/add-plus.svg"
												alt="add account"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row mt-4">
							<div className="col-md-12">{this.renderButton()}</div>
						</div>
					</form>
				</div>
				{!this.state.expired &&
				(this.props.order.create && this.props.accounts.list) ? (
					<p className="text-left mt-3">
						Transaction will expire in{' '}
						<MinutesFormat
							seconds={this.state.refreshTime - this.state.timer}
						/>
					</p>
				) : (
					<p className="text-left" style={{ marginTop: 11 }}>
						Transaction expired -{' '}
						<a className="restart-link" onClick={this.restart}>
							Click to restart
						</a>
					</p>
				)}
			</div>
		)
	}

	render() {
		// if (!this.state.expired) {
		if (this.props.sendCurrency === 'GBP') {
			if (this.props.order.create && this.props.accounts.list) {
				return this.renderScreen()
			} else if (this.props.order.loading || this.props.accounts.loading) {
				return (
					<div className="main-calc-wrapper d-flex">
						<div className="h-100 m-auto" style={{ color: '#045CC7' }}>
							<i className="fas fa-spinner-third fa-lg fa-spin mr-3" />
						</div>
					</div>
				)
			} else {
				return this.renderScreen()
				// return (
				// 	<div className="main-calc-wrapper">
				// 		<div className="row">
				// 			<div className="col-12">
				// 				<h2 className="mt-5">Oops something went wrong</h2>
				// 				<img
				// 					className="mt-4"
				// 					src="/static/images/error.svg"
				// 					alt="error"
				// 				/>
				// 				<p className="mt-4">
				// 					We are working on getting the error fixed. Please try to
				// 					refresh the page or restart the process in a few minutes.
				// 				</p>
				// 			</div>
				// 		</div>
				// 	</div>
				// )
			}
		} else {
			// if (this.props.order.create) {
			// 	return (
			// 		<div className="main-calc-wrapper mt-5">
			// 			<form onSubmit={this.onSubmit}>
			// 				<div className="row">
			// 					<div className="col-12 text-left">
			// 						<label className="field-label m-0">Amount</label>
			// 						<p className="field-value">
			// 							{this.props.sendAmount.toFixed(8) || <br />}
			// 						</p>
			// 					</div>
			// 				</div>
			// 				<div className="row">
			// 					<div className="col-12">
			// 						<hr className="mt-0" />
			// 					</div>
			// 				</div>
			// 				<div className="row">
			// 					<div className="col-12 text-left">
			// 						<Field
			// 							name="depositAddress"
			// 							label="BTC deposit address"
			// 							component={this.renderWalletField}
			// 							placeholder="Deposit Address"
			// 						/>
			// 					</div>
			// 				</div>
			// 				<div className="row mt-4">
			// 					<div className="col-md-12">{this.renderButton()}</div>
			// 				</div>
			// 			</form>
			// 		</div>
			// 	)
			// } else if (this.props.order.loading) {
			// 	return (
			// 		<div className="main-calc-wrapper d-flex">
			// 			<div className="h-100 m-auto" style={{ color: '#045CC7' }}>
			// 				<i className="fas fa-spinner-third fa-lg fa-spin mr-3" />
			// 			</div>
			// 		</div>
			// 	)
			// } else {
			// 	return (
			// 		<div className="main-calc-wrapper">
			// 			<div className="row">
			// 				<div className="col-12">
			// 					<h2 className="mt-5">Oops something went wrong</h2>
			// 					<img
			// 						className="mt-4"
			// 						src="/static/images/error.svg"
			// 						alt="error"
			// 					/>
			// 					<p className="mt-4">
			// 						We are working on getting the error fixed. Please try to
			// 						refresh the page or restart the process in a few minutes.
			// 					</p>
			// 				</div>
			// 			</div>
			// 		</div>
			// 	)
			// }
		}
		// } else {
		// return (
		// 	<div className="main-calc-wrapper">
		// 		<div className="row">
		// 			<div className="col-12">
		// 				<h2 className="mt-5">Payement timeout</h2>
		// 				<img
		// 					className="mt-4"
		// 					src="/static/images/error.svg"
		// 					alt="error"
		// 				/>
		// 				<p className="mt-4">
		// 					Oops, looks like you ran out of time. Click the link below to
		// 					restart the transaction.
		// 				</p>
		// 				<button className="btn-back" onClick={() => this.restart()}>
		// 					<span>Restart</span>
		// 				</button>
		// 			</div>
		// 		</div>
		// 	</div>
		// )
		// }
	}

	renderWalletField(field) {
		const {
			placeholder,
			meta: { touched, valid, error, asyncValidating },
			label
		} = field

		return (
			<div
				className={cn(
					'calc-input-wrapper',
					'text-left',
					touched && !valid ? 'invalid' : null
				)}>
				<label className="field-label m-0">
					{!touched ? label : valid ? label : error}
				</label>
				<div className="calc-field mt-2">
					<div className="col-12">
						<input
							id="input-wallet-addr"
							autoComplete="off"
							spellCheck={false}
							placeholder={placeholder}
							className="form-control no-border p-0"
							{...field.input}
						/>
						{asyncValidating && (
							<i className="fas fa-spinner-third fa-lg fa-spin mr-3" />
						)}
					</div>
				</div>
			</div>
		)
	}

	componentWillReceiveProps(props) {
		const { accounts, order, constants, ctUser, sendCurrency } = props

		if (sendCurrency === 'GBP') {
			if (!order.create || !accounts.list) {
				clearInterval(this.state.timerId)
			} else {
				if (constants) {
					const refreshTime = constants.PaymentWindow * 60
					if (this.state.refreshTime >= this.state.timer) {
						this.initInterval()
						this.setState({ refreshTime, timer: 0 })
					}
				}
			}

			if (!accounts.list && !accounts.loading) this.props.fetchAccounts(ctUser)

			// if (accounts.list && !accounts.loading && !accounts.list.length)
			// 	$('#add-bank-account-modal').modal('toggle')

			// if (!this.props.sendFromAccount) {
			// 	const sendFromAccount =
			// 		accounts.list && accounts.list.length && accounts.list[0]
			// 	if (sendFromAccount) {
			// 		const sendFrom = sendFromAccount.id
			// 		props.change('sendFrom', sendFrom)
			// 		props.change('sendFromAccount', sendFromAccount)
			// 	}
			// }
			if (!this.state.sourceAccount) {
				const sourceAccount =
					accounts.list && accounts.list.length && accounts.list[0]
				if (sourceAccount) {
					this.setState({ sourceAccount })
				}
			}
		} else {
			if (!order.create) {
				clearInterval(this.state.timerId)
			} else {
				const refreshTime = order.create.PaymentWindow * 60
				if (this.state.refreshTime >= this.state.timer) {
					this.initInterval()
					this.setState({ refreshTime, timer: 0 })
				}
				this.props.change(
					'depositAddress',
					order.create.BrokerAccount.DepositAddress
				)
			}
		}
	}
}

const mapStateToProps = state => {
	const selector = formValueSelector('BankTransfer')
	// const sendFrom = selector(state, 'sendFrom')
	// const sendFromAccount =
	// 	state.accounts.list &&
	// 	state.accounts.list.find(account => account.id == sendFrom)
	const depositAddress = selector(state, 'depositAddress')
	// console.log(state.accounts)
	return {
		order: state.order,
		constants: state.constants,
		accounts: state.accounts,
		// sendFrom,
		// sendFromAccount,
		depositAddress
	}
}

export default reduxForm({ form: 'ExchangeForm' })(
	connect(
		mapStateToProps,
		{
			fetchAccounts,
			fetchConsts,
			getStatus,
			createOrder,
			clearOrder
		}
	)(BankTransfer)
)

BankTransfer.propTypes = {
	sendAmount: PropTypes.number,
	receiveAmount: PropTypes.number,
	sendCurrency: PropTypes.string,
	receiveCurrency: PropTypes.string,
	rate: PropTypes.number,
	wallet: PropTypes.string,
	ctUser: PropTypes.number,
	onConfirm: PropTypes.func,
	onRestart: PropTypes.func,
	onAddAccount: PropTypes.func
}