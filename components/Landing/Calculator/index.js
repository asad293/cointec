import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formValueSelector, Field, reduxForm } from 'redux-form'
import { fetchAssetsList, fetchQuote } from '../../../store/actions'
import cn from 'classnames'

class Calculator extends Component {
	constructor(props) {
		super(props)
		this.state = {
			placeholderSendAmount: 100,
			placeholderReceiveAmount: 0,
			rate: 1200,
			action: 'sending',
			intervalId: null,
			interval: 10,
			quoteLoading: false,
			coins: props.assets.Receive,
			currencies: props.assets.Send,
			coinSearch: '',
			coinSelected: false,
			currencySelected: props.assets.Send[0],
			toggleCurrency: false,
			toggleCoin: false,
			search: false,
			active: false
		}

		this.normalizeSendAmount = this.normalizeSendAmount.bind(this)
		this.normalizeReceiveAmount = this.normalizeReceiveAmount.bind(this)
		this.toReceiveAmount = this.toReceiveAmount.bind(this)
		this.renderButton = this.renderButton.bind(this)
	}

	render() {
		const { sendAmount, receiveAmount, quote } = this.props
		const { Message } = quote

		return (
			<div>
				<form>
					<div className="calc-input-wrapper">
						<label
							className={cn(
								'field-label m-0',
								(sendAmount || receiveAmount) && Message ? 'invalid' : null
							)}>
							{(sendAmount || receiveAmount) && Message ? Message : 'You send'}
						</label>
						<div className="calc-field">
							<div className="col-6 bg-input">
								<Field
									name="sendAmount"
									component={this.renderField}
									normalize={this.normalizeSendAmount}
									placeholder={this.state.placeholderSendAmount.toFixed(
										this.state.currencySelected
											? this.state.currencySelected.Dp
											: 2
									)}
								/>
							</div>
							<div className="col-6 px-0 d-flex align-items-center">
								<div className="dropdown dropdown-currency-select">
									<a
										className="btn dropdown-toggle"
										// href={
										// 	// document && document.documentElement.clientWidth > 992
										// 	// ?
										// 	'#'
										// 	// : '#main-calc'
										// }
										role="button"
										id="dropdownMenuLink"
										onClick={() => this.toggleDropDown('currency')}>
										{this.state.currencySelected && (
											<div className="text-label currency-label">
												<div className="currency-symbol-wrapper">
													<img
														className="currency-symbol"
														src={this.state.currencySelected.Image}
														alt={this.state.currencySelected.Name}
													/>
												</div>
												<span
													className="text-left"
													style={{ minWidth: '64px' }}>
													{this.state.currencySelected.Name}
												</span>
												<img
													className="dropdown-arrow"
													src="/static/images/arrow-down.svg"
													alt="Dropdown"
												/>
											</div>
										)}
									</a>
									{this.state.toggleCurrency && (
										<div
											className="dropdown-menu show"
											aria-labelledby="dropdownMenuLink">
											<div className="dropdown-items-wrapper">
												{currencies.map(currency => (
													<ExchangeableItem
														key={currency.Name}
														exchangeable={currency}
														onItemSelected={this.onCurrencySelected}
													/>
												))}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
						<label className="field-label m-0 mt-4">You receive</label>
						<div className="calc-field">
							<div className="col-6 bg-input">
								<Field
									name="receiveAmount"
									component={this.renderField}
									normalize={this.normalizeReceiveAmount}
									placeholder={this.toReceiveAmount(
										this.state.placeholderSendAmount
									).toFixed(8)}
								/>
							</div>
							<div className="col-6 px-0 d-flex align-items-center">
								<div className="dropdown dropdown-currency-select">
									<a
										className="btn dropdown-toggle"
										// href={
										// 	document.documentElement.clientWidth > 992
										// 		? '#'
										// 		: '#main-calc'
										// }
										role="button"
										id="dropdownMenuLink"
										onClick={() => this.toggleDropDown('coin')}>
										{this.state.coinSelected != null && (
											<div className="text-label currency-label">
												<div className="currency-symbol-wrapper">
													<img
														className="currency-symbol"
														src={this.state.coinSelected.Image}
														alt={this.state.coinSelected.Name}
													/>
												</div>
												<span
													className="text-left"
													style={{ minWidth: '64px' }}>
													{this.state.coinSelected.Name}
												</span>
												<img
													className="dropdown-arrow"
													src="/static/images/arrow-down.svg"
													alt="Dropdown"
												/>
											</div>
										)}
									</a>
									{this.state.toggleCoin && (
										<div
											className="dropdown-menu show"
											aria-labelledby="dropdownMenuLink">
											<div className="search-item">
												<img
													className="search-symbol"
													src="/static/images/dropdown-search.svg"
													alt="Search"
												/>
												<input
													className="search-input"
													placeholder="Search"
													type="search"
													value={this.state.coinSearch}
													onClick={this.toggleSearch}
													onChange={this.searchCoin.bind(this)}
												/>
											</div>
											<div className="dropdown-items-wrapper">
												{coins.length ? (
													coins.map(coin => (
														<ExchangeableItem
															key={coin.Name}
															exchangeable={coin}
															onItemSelected={this.onCoinSelected}
														/>
													))
												) : (
													<div className="px-3">No results</div>
												)}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
						<h6 className="exchange-rate-label mt-4">
							Exchange Rate:{' '}
							<b>
								{!this.state.rate
									? '-/-'
									: this.state.rate.toFixed(
											this.state.currencySelected
												? this.state.currencySelected.Dp
												: 2
									  ) +
									  ' ' +
									  (this.state.currencySelected
											? this.state.currencySelected.Name
											: 'GBP') +
									  '/' +
									  (this.state.coinSelected
											? this.state.coinSelected.Name
											: 'BTC') +
									  ' '}
							</b>
						</h6>
						<div className="am row">
							<div className="mt-2 col-md-12">{this.renderButton()}</div>
						</div>
					</div>
				</form>
			</div>
		)
	}

	initInterval(interval) {
		clearInterval(this.state.intervalId)
		const intervalId = setInterval(this.fetchCalls, interval * 1000)
		this.setState({ intervalId })
	}

	componentDidMount() {
		// this.props.fetchAssetsList()
	}

	componentWillReceiveProps(props) {
		console.log(props)
	}

	renderField({ input, placeholder }) {
		return (
			<div>
				<input
					autoComplete="off"
					spellCheck={false}
					placeholder={placeholder}
					className="form-control p-0"
					{...input}
				/>
			</div>
		)
	}

	toReceiveAmount(amount) {
		return !amount || !this.state.rate ? 0 : amount / this.state.rate
	}

	normalizeSendAmount(value, previousValue) {
		const {
			currencySelected,
			coinSelected,
			placeholderSendAmount,
			coins
		} = this.state

		const decimalPoint = _.defaultTo(currencySelected && currencySelected.Dp, 2)

		let sendAmount = value.replace(/[^\d.]/g, '')
		let pos = sendAmount.indexOf('.')

		this.setState({ action: 'sending' })

		if (pos >= 0) {
			// prevent an extra decimal point
			if (sendAmount.indexOf('.', pos + 1) > 0)
				sendAmount = sendAmount.substring(0, pos + 1)

			// allow up to 2 dp
			if (sendAmount.length - pos > 2)
				sendAmount = sendAmount.substring(0, pos + 1 + decimalPoint)
		}

		if (value !== previousValue) {
			const currencyName = currencySelected.Name
			const coinName = _.defaultTo(
				coinSelected && coinSelected.Name,
				coins[0].Name
			)

			if (sendAmount.length > 0)
				debouceSend(this.props, sendAmount, currencyName, coinName)
			else {
				debouceSend(this.props, placeholderSendAmount, currencyName, coinName)
				this.props.change('receiveAmount', null)
			}
		}

		if (sendAmount.length > 0) return '' + sendAmount
		else return sendAmount
	}

	normalizeReceiveAmount(value, previousValue) {
		const {
			currencySelected,
			coinSelected,
			placeholderSendAmount,
			coins
		} = this.state

		let decimalPoint = 8
		let receiveAmount = value.replace(/[^\d.]/g, '')
		// receiveAmount = Number(receiveAmount) < limits.Min.ReceiveCurrency ? String(limits.Min.ReceiveCurrency) : receiveAmount
		let pos = receiveAmount.indexOf('.')

		if (pos >= 0) {
			// prevent an extra decimal point
			if (receiveAmount.indexOf('.', pos + 1) > 0)
				receiveAmount = receiveAmount.substring(0, pos + 1)
			// allow up to 2 dp
			if (receiveAmount.length - pos > 2)
				receiveAmount = receiveAmount.substring(0, pos + 1 + decimalPoint)
		}

		if (value !== previousValue) {
			const currencyName = currencySelected.Name
			const coinName = _.defaultTo(
				coinSelected && coinSelected.Name,
				coins[0].Name
			)

			if (receiveAmount.length > 0) {
				this.setState({ action: 'receiving' })
				debouceReceive(this.props, receiveAmount, currencyName, coinName)
			} else {
				// fetch quote to reset default rate
				debouceSend(this.props, placeholderSendAmount, currencyName, coinName)
				this.props.change('sendAmount', null)
				this.setState({ action: 'sending' })
			}
		}

		return receiveAmount
	}

	toggleDropDown(type) {
		// if (type === 'currency') {
		// 	if (!this.state.toggleCurrency) this.props.fetchAssets()
		// 	this.setState({
		// 		toggleCurrency: !this.state.toggleCurrency,
		// 		toggleCoin: false,
		// 		coinSearch: ''
		// 	})
		// } else if (type === 'coin') {
		// 	if (!this.state.toggleCoin) this.props.fetchAssets()
		// 	this.setState({ toggleCoin: !this.state.toggleCoin, coinSearch: '' })
		// }
	}

	renderButton() {
		const { coinSelected } = this.state
		const available = coinSelected && coinSelected.Status === 'AVAILABLE'
		return (
			<button
				type="submit"
				className={cn(
					'btn-success btn-block btn-lg btn-exchange',
					!available ? 'unavailable' : null
				)}
				onClick={e => {
					e.preventDefault()
					if (available) this.props.history.push('/login')
				}}>
				{available ? 'Instant Exchange' : 'Currently unavailable'}
			</button>
		)
	}
}

const ExchangeableItem = ({ exchangeable, onItemSelected, unavailable }) => (
	<div>
		{
			<a
				className={cn('dropdown-item', unavailable ? 'unavailable' : null)}
				onClick={() => onItemSelected(exchangeable)}>
				<div className="text-label currency-label">
					<div className="currency-symbol-wrapper fluid px-2">
						<div className="col-8 text-left text-truncate currency-fullname p-0">
							<img
								className="currency-symbol"
								src={exchangeable.Image}
								alt={exchangeable.Name}
							/>
							<span>{exchangeable.FullName}</span>
						</div>
						<div className="col-4 text-right p-0">
							<b>{exchangeable.Name}</b>
						</div>
					</div>
				</div>
			</a>
		}
	</div>
)

const mapStateToProps = state => {
	// const selector = formValueSelector('SimpleCalcForm')
	// const sendAmount = Number.parseFloat(selector(state, 'sendAmount'))
	// const receiveAmount = Number.parseFloat(selector(state, 'receiveAmount'))

	return {
		assets: state.assets,
		quote: state.quote
		// limit: state.limit,
		// sendAmount,
		// receiveAmount
	}
}

const mapDispatchToProps = { fetchAssetsList, fetchQuote }

export default reduxForm({ form: 'CalculatorForm' })(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Calculator)
)
