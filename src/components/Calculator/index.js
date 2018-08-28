import React, { Component } from 'react'
import { formValueSelector, Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { coins, currencies } from '../SimpleCalculator/exchangeables'
import { fetchQuote, fetchConsts, fetchAssets, fetchLimit } from '../../Redux/actions'
import axios from 'axios'
import _ from 'lodash'

class Calculator extends Component {
	constructor(props) {
		super(props)
		this.state = {
			placeholderSendAmount: 250,
			placeholderReceiveAmount: 0,
			rate: 0,
			currencySymbol: '£',
			limit: 0,
			buttonIsDisabled: false,
			action: 'sending',
			intervalId: null,
			interval: 10,
			quoteLoading: false,
			coins,
			currencies,
			coinSearch: '',
			coinSelected: false,
			currencySelected: currencies[0],
			toggleCurrency: false,
			toggleCoin: false,
			search: false,
			defaultCoin: 'BTC'
		}

		this.onSubmit = this.onSubmit.bind(this)
		this.updateLimit = this.updateLimit.bind(this)
		this.updateRate = this.updateRate.bind(this)
		this.updateCoins = this.updateCoins.bind(this)
		this.updateButtonState = this.updateButtonState.bind(this)

		this.normalizeSendAmount = this.normalizeSendAmount.bind(this)
		this.normalizeReceiveAmount = this.normalizeReceiveAmount.bind(this)
		this.convertToReceiveAmount = this.convertToReceiveAmount.bind(this)
		this.convertToSendAmount = this.convertToSendAmount.bind(this)

		this.fetchCalls = this.fetchCalls.bind(this)
		this.getQuote = this.getQuote.bind(this)
		this.onCoinSelected = this.onCoinSelected.bind(this)
		this.onCurrencySelected = this.onCurrencySelected.bind(this)
		this.toggleDropDown = this.toggleDropDown.bind(this)
		this.toggleSearch = this.toggleSearch.bind(this)
	}

	normalizeSendAmount(value, previousValue) {
		const { currencySelected, coinSelected, placeholderSendAmount, coins } = this.state

		const decimalPoint = _.defaultTo(currencySelected && currencySelected.dp, 2)

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
			const coinName = _.defaultTo(
				coinSelected && coinSelected.name,
				coins[0].name
			)

			if (sendAmount.length > 0)
				debouceSend(this.props, sendAmount, currencySelected, coinName)
			else {
				debouceSend( this.props, placeholderSendAmount, currencySelected, coinName )
				this.props.change('receiveAmount', null)
			}
		}

		if (sendAmount.length > 0)
			return ((currencySelected ? currencySelected.symbol : '£') + ' ' + sendAmount)
    else
      return sendAmount
	}

	normalizeReceiveAmount(value, previousValue) {
    const { currencySelected, coinSelected, placeholderSendAmount, coins } = this.state

		let decimalPoint = 8
		let receiveAmount = value.replace(/[^\d.]/g, '')
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
			const coinName = _.defaultTo(
				coinSelected && coinSelected.name,
				coins[0].name
			)

			if (receiveAmount.length > 0) {
				this.setState({ action: 'receiving' })
				debouceReceive(this.props, receiveAmount, currencySelected, coinName)
			} else {
				// fetch quote to reset default rate
				debouceSend(this.props, placeholderSendAmount, currencySelected, coinName)
				this.props.change('sendAmount', null)
				this.setState({ action: 'sending' })
			}
		}

		return receiveAmount
	}

	initInterval(interval) {
		clearInterval(this.state.intervalId)
		let intervalId = setInterval(this.fetchCalls, interval * 1000)
		// store intervalId in the state so it can be accessed later to clear it
		this.setState({ intervalId })
	}

	componentDidMount() {
		// set call fetch interval
		this.initInterval(this.state.interval)
		// fetch call the first time component mounts
		this.fetchCalls()

		addEventListener('keyup', event => {
			if (event.keyCode === 27) {
				if (this.state.toggleCoin) {
					this.toggleDropDown('coin')
				}
				if (this.state.toggleCurrency) {
					this.toggleDropDown('currency')
				}
			}
		})

		addEventListener('click', event => {
			const select = event.path.find(
				node => node.className === 'dropdown dropdown-currency-select'
			)
			if (!select) {
				this.setState({
					toggleCoin: false,
					toggleCurrency: false,
					coinSearch: ''
				})
			}
		})
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId)
	}

	getQuote() {
		if (this.state.action === 'sending') {
			this.props.fetchQuote({
				SendCurrency: this.state.currencySelected.name,
				ReceiveCurrency: this.state.coinSelected
					? this.state.coinSelected.name
					: this.state.coins[0].name,
				SendAmount: this.props.sendAmount
					? this.props.sendAmount
					: this.state.placeholderSendAmount
			})
		} else if (this.state.action === 'receiving' && this.props.receiveAmount) {
			this.props.fetchQuote({
				SendCurrency: this.state.currencySelected.name,
				ReceiveCurrency: this.state.coinSelected
					? this.state.coinSelected.name
					: this.state.coins[0].name,
				ReceiveAmount: this.props.receiveAmount
			})
		}
	}

	fetchCalls() {
    this.props.fetchAssets()
    if (this.props.ctUser)
      this.props.fetchLimit(this.props.ctUser)
		this.props.fetchConsts()
		this.getQuote()
	}

	componentWillReceiveProps(props) {
		const {
			quote: { QuoteSendAmount, QuoteReceiveAmount, loading },
			sendAmount,
			receiveAmount
		} = props
		const { action, currencySelected } = this.state
		this.setState({ quoteLoading: loading })

		if (sendAmount && action === 'sending')
			this.props.change(
				'receiveAmount',
				Number.parseFloat(QuoteReceiveAmount).toFixed(
					QuoteReceiveAmount == 0 ? 0 : 8
				)
			)

		if (receiveAmount && action === 'receiving' && currencySelected) {
			const { symbol, dp } = currencySelected
			this.props.change(
				'sendAmount',
				`${symbol} ${Number.parseFloat(QuoteSendAmount).toFixed(
					QuoteSendAmount == 0 ? 0 : dp
				)}`
			)
		}

		this.updateLimit(props)
		this.updateCoins(props)
		this.updateRate(props)
		this.updateButtonState(props)
	}

	searchCoin({ target }) {
		this.setState({
			coinSearch: target.value
		})
	}

	filterCoins(coin) {
		let word = this.state.coinSearch.toLowerCase().trim()
		if (coin.name.toLowerCase().startsWith(word)) {
			return true
		}

		if (coin.keywords.startsWith(word)) {
			return true
		}
		return false
	}

	toggleSearch() {
		this.setState({ search: !this.state.search })
	}

	toggleDropDown(type) {
		if (type === 'currency') {
			if (!this.state.toggleCurrency) this.props.fetchAssets()
			this.setState({
				toggleCurrency: !this.state.toggleCurrency,
				toggleCoin: false,
				coinSearch: ''
			})
		} else if (type === 'coin') {
			if (!this.state.toggleCoin) this.props.fetchAssets()
			this.setState({ toggleCoin: !this.state.toggleCoin, coinSearch: '' })
		}
	}

	convertToReceiveAmount(amount) {
		return amount / this.state.rate
	}

	convertToSendAmount(amount) {
		return amount * this.state.rate
	}

	updateLimit({ limit }) {
		this.setState({
		  limit: limit.limit ? limit.limit : this.state.limit
		})

		if (limit.const) {
			let interval = limit.const.Frame1Refresh
			if (this.state.interval != interval) {
				this.initInterval(interval)
				this.setState({ interval })
			}
		}
	}

	updateRate(props) {
		this.setState({ rate: Number.parseFloat(props.quote.ExchangeRate) })
	}

	updateCoins(props) {
		let updatedCoins = []

		if (props.limit.assets && this.state.currencySelected) {
			Object.keys(props.limit.assets).forEach(assetPair => {
				if (assetPair.startsWith(this.state.currencySelected.name)) {
					const asset = props.limit.assets[assetPair]
					const coin = coins.find(coin => assetPair.indexOf(coin.name) === 3)
					if (coin) {
						coin.DefaultQuoteAmount = asset.Send.DefaultQuoteAmount
						coin.Status = asset.Send.Status
						if (coin.Status !== 'DISABLED') updatedCoins.push(coin)
					}
				}
			})

			const prev = this.state.coinSelected
				? this.state.coinSelected.name
				: false
			const coinSelected = this.state.coinSelected
				? updatedCoins.find(coin => coin.name === this.state.coinSelected.name)
				: updatedCoins.length
					? updatedCoins[0]
					: false

			this.setState(
				{
					coins: updatedCoins,
					coinSelected,
					placeholderSendAmount: coinSelected
						? coinSelected.DefaultQuoteAmount
						: this.state.placeholderSendAmount
				},
				() => {
					this.props.change(
						'receiveCurrency',
						coinSelected ? coinSelected.name : false
					)
					if (coinSelected && prev != coinSelected.name) {
						this.fetchCalls()
					}
				}
			)
		}
	}

	updateButtonState(props) {
		this.setState({
			buttonIsDisabled: props.sendAmount
				? (props.quote.Limits && props.quote.Limits.Max.SendCurrency) <
						props.sendAmount ||
				  (props.quote.Limits && props.quote.Limits.Min.SendCurrency) >
						props.sendAmount ||
				  !props.wallet ||
				  props.asyncValidating ||
				  !props.valid
				: true
		})
	}

	renderField(field) {
		const {
			placeholder,
			meta: { touched, valid, error }
		} = field

		return (
			<div>
				<input
					autoComplete="off"
					spellCheck={false}
					placeholder={placeholder}
					onBlur={field.input.onBlur}
					className="form-control no-border p-0"
					{...field.input}
				/>
			</div>
		)
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
				<div className="calc-field">
					<div className="col-12">
						<input
							id="input-wallet-addr"
							autoComplete="off"
							spellCheck={false}
							placeholder={placeholder}
							className="form-control no-border p-0"
							{...field.input}
						/>
						{asyncValidating ? (
							<i className="fas fa-spinner-third fa-lg fa-spin mr-3" />
						) : (
							''
						)}
					</div>
				</div>
			</div>
		)
	}

	renderButton() {
		return (
			<button
				type="submit"
				className="btn-block btn-lg btn-exchange no-border"
				disabled={this.state.buttonIsDisabled}>
				Instant Exchange
			</button>
		)
	}

	onCoinSelected(coin) {
		this.setState(
			{
				coinSelected: coin,
				toggleCoin: false,
				coinSearch: ''
			},
			() => {
				this.fetchCalls()
				setTimeout(() => {
					// trigger form validation with delay
					const addrInput = document.getElementById('input-wallet-addr')
					addrInput.focus()
					addrInput.blur()
				}, 300)
			}
		)
	}

	onCurrencySelected(currency) {
		this.setState(
			{
				currencySelected: currency,
				toggleCurrency: false
			},
			() => {
				if (this.props.sendAmount)
					this.props.change('sendAmount', currency.symbol + ' ' + Number.parseFloat(this.props.sendAmount).toFixed(currency.dp))
				this.fetchCalls()
			}
		)
	}

	onSubmit(event) {
		event.preventDefault()
		this.props.onConfirm({
			sendAmount: this.props.sendAmount,
			receiveAmount: this.props.receiveAmount,
			sendCurrency: this.state.currencySelected.name,
			receiveCurrency: _.defaultTo(this.state.coinSelected && this.state.coinSelected.name, 'BTC'),
			rate: this.state.rate,
			wallet: this.props.wallet
		})
	}

	render() {
		let coins = this.state.coins
		let currencies = this.state.currencies
		if (this.state.coinSearch)
			coins = this.state.coins.filter(coin => this.filterCoins(coin))

		const {
			sendAmount,
			receiveAmount,
			quote: { Limits, Message, Direction }
		} = this.props

		const ExchangeableItem = ({
			exchangeable,
			onItemSelected,
			status,
			unavailable
		}) => (
			<div>
				{status !== 'DISABLED' ? (
					<a
						className={cn('dropdown-item', unavailable ? 'unavailable' : null)}
						onClick={unavailable ? null : e => onItemSelected(exchangeable)}>
						<div className="text-label currency-label">
							<div className="currency-symbol-wrapper">
								<img
									className="currency-symbol"
									src={exchangeable.image}
									alt={exchangeable.name}
								/>
							</div>
							<span>{exchangeable.name}</span>
						</div>
					</a>
				) : ''}
			</div>
		)

		return (
			<div className="main-calc-wrapper mt-5">
				<form onSubmit={this.onSubmit}>
					<div
						className={cn(
							'calc-input-wrapper text-left',
							(Direction === 'SEND' && Message) ||
							(Limits && Limits.Max.SendCurrency < sendAmount)
								? 'invalid'
								: null
						)}>
						<label className="field-label m-0">
							{Direction === 'SEND' && Message
								? Message
								: Limits && Limits.Max.SendCurrency < sendAmount
									? 'Limit exceeded'
									: 'You send'}
						</label>
						<div className="calc-field">
							<div className="col-6 col-xl-7 pr-0">
								<Field
									name="sendAmount"
									component={this.renderField}
									normalize={this.normalizeSendAmount}
									placeholder={
										(this.state.currencySelected
											? this.state.currencySelected.symbol
											: '£') +
										' ' +
										this.state.placeholderSendAmount.toFixed(
											this.state.currencySelected
												? this.state.currencySelected.dp
												: 2
										)
									}
								/>
							</div>
							<div className="col-6 col-xl-5 pr-0 d-flex align-items-center d-flex align-items-center">
								<div className="dropdown dropdown-currency-select">
									<a
										className="btn dropdown-toggle"
										role="button"
										id="dropdownMenuLink"
										onClick={() => this.toggleDropDown('currency')}>
										<div className="text-label currency-label">
											<div className="currency-symbol-wrapper">
												<img
													className="currency-symbol"
													src={this.state.currencySelected.image}
													alt={this.state.currencySelected.name}
												/>
											</div>
											<span>{this.state.currencySelected.name}</span>
											<img
												className="dropdown-arrow"
												src="/img/arrow-down.svg"
												alt="Dropdown"
											/>
										</div>
									</a>
									{this.state.toggleCurrency && (
										<div
											className="dropdown-menu show"
											aria-labelledby="dropdownMenuLink">
											<div className="search-item">
												<input
													className="search-input"
													placeholder="Coming Soon"
													type="text"
													name="lname"
													disabled
												/>
											</div>

											<div className="dropdown-items-wrapper">
												{currencies.map(currency => (
													<ExchangeableItem
														key={currency.name}
														exchangeable={currency}
														status={currency.Status}
														onItemSelected={this.onCurrencySelected}
													/>
												))}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className={cn('calc-input-wrapper text-left', (Direction === 'RECEIVE' && Message) || (Limits && Limits.Max.ReceiveCurrency < receiveAmount) ? 'invalid' : null)}>
						<label className="field-label m-0">
							{Direction === 'RECEIVE' && Message ? Message : Limits && Limits.Max.ReceiveCurrency < receiveAmount ? 'Receive limit exceeded' : 'You receive'}
						</label>
						<div className="calc-field">
							<div className="col-6 col-xl-7 pr-0">
								<Field
									name="receiveAmount"
									component={this.renderField}
									normalize={this.normalizeReceiveAmount}
									placeholder={this.convertToReceiveAmount(
										this.state.placeholderSendAmount
									).toFixed(8)}
								/>
							</div>
							<div className="col-6 col-xl-5 pr-0 d-flex align-items-center">
								<div className="dropdown dropdown-currency-select">
									<a
										className="btn dropdown-toggle"
										role="button"
										id="dropdownMenuLink"
										onClick={() => this.toggleDropDown('coin')}>
										{this.state.coinSelected != null && (
											<div className="text-label currency-label">
												<div className="currency-symbol-wrapper">
													<img
														className="currency-symbol"
														src={this.state.coinSelected.image}
														alt={this.state.coinSelected.name} />
												</div>
												<span>{this.state.coinSelected.name}</span>
												<img
													className="dropdown-arrow"
													src="/img/arrow-down.svg"
													alt="Dropdown" />
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
													src="/img/dropdown-search.svg"
													alt="Search" />
												<input
													className="search-input"
													placeholder="Search"
													type="search"
													value={this.state.coinSearch}
													onClick={this.toggleSearch}
													onChange={this.searchCoin.bind(this)} />
											</div>
											<div className="dropdown-items-wrapper">
												{coins.length ? (
													coins.map(coin => (
														<ExchangeableItem
															key={coin.name}
															exchangeable={coin}
															status={coin.Status}
															onItemSelected={this.onCoinSelected} />
													))
												) : <div className="px-3">No results</div>}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					<Field name="receiveCurrency" component={field => <input type="hidden" {...field.input} />} />
					<Field
						name="wallet"
						label="Wallet address"
						component={this.renderWalletField}
						placeholder="Wallet Address" />
					<h6 className="exchange-rate mt-3">
						Exchange Rate:{' '}
						<b>
							{this.state.rate === 0
								? '-/-'
								: (this.state.currencySelected ? this.state.currencySelected.symbol : this.state.currencySymbol) +
								  ' ' +
								  (this.state.currencySelected ? this.state.rate.toFixed(this.state.currencySelected.dp) : this.state.rate.toFixed(2)) +
								  '/' +
								  (this.state.coinSelected ? this.state.coinSelected.name : 'BTC') +
								  ' '}
						</b>
					</h6>
					<div className="row">
						<div className="mt-2 col-md-12">{this.renderButton()}</div>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const selector = formValueSelector('CalcForm')
	let sendAmount = '"' + selector(state, 'sendAmount')
	sendAmount = Number.parseFloat(sendAmount.split(' ')[1])
	const receiveAmount = Number.parseFloat(selector(state, 'receiveAmount'))
	const wallet = selector(state, 'wallet')

	return {
		quote: state.quote,
		limit: state.limit,
		wallet,
		sendAmount,
		receiveAmount
	}
}

const debouceSend = _.debounce(
	(props, sendAmount, currency, coin) => {
		props.fetchQuote({
			SendCurrency: currency.name,
			ReceiveCurrency: coin,
			SendAmount: Number.parseFloat(sendAmount)
		})
	}, 500, { trailing: true }
)

const debouceReceive = _.debounce(
	(props, receiveAmount, currency, coin) => {
		props.fetchQuote({
			SendCurrency: currency.name,
			ReceiveCurrency: coin,
			ReceiveAmount: Number.parseFloat(receiveAmount)
		})
	}, 500, { trailing: true }
)

const asyncValidate = ({ wallet, receiveCurrency }) =>
	wallet ? axios.get(`https://shapeshift.io/validateAddress/${wallet}/${receiveCurrency}`)
    .then(res => {
      if (!res.data.isvalid)
        throw { wallet: 'Invalid wallet address' }
    }) : Promise.reject({ wallet: 'Invalid wallet address' })

export default reduxForm({
	form: 'CalcForm',
	asyncValidate,
	asyncChangeFields: ['wallet', 'receiveCurrency'],
	asyncBlurFields: ['wallet']
})(
	connect(mapStateToProps, { fetchQuote, fetchConsts, fetchAssets, fetchLimit })(Calculator)
)

Calculator.propTypes = {
	onConfirm: PropTypes.func,
	ctUser: PropTypes.number
}
