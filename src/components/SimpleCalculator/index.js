import React, { Component } from "react"
import { formValueSelector, Field, reduxForm } from "redux-form"

import { fetchQuote, fetchLimit, fetchConsts, fetchAssets } from '../../Redux/actions'
import { connect } from "react-redux"
import "./style.scss"
import cn from "classnames"
import { coins, currencies } from './exchangeables'
import { withRouter } from 'react-router'
import _ from 'lodash'

class SimpleCalculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      placeholderSendAmount: 250,
      placeholderReceiveAmount: 0,
      rate: 1200,
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
      active: false,
      defaultCoin: this.props.location.pathname === '/buy-augur' ? 'REP' : 'BTC',
    }
    
    this.fistScreen = this.fistScreen.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.updateRate = this.updateRate.bind(this)
    this.updateCoins = this.updateCoins.bind(this)

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
      if (sendAmount.indexOf('.', pos + 1) > 0) sendAmount = sendAmount.substring(0, pos + 1)

      // allow up to 2 dp
      if (sendAmount.length - pos > 2) sendAmount = sendAmount.substring(0, pos + 1 + decimalPoint)
    }

    if (value !== previousValue) {
      const currencyName = currencySelected.name
      const coinName = _.defaultTo(coinSelected && coinSelected.name, coins[0].name)

      if (sendAmount.length > 0)
        debouceSend(this.props, sendAmount, currencyName, coinName)
      else {
        debouceSend(this.props, placeholderSendAmount, currencyName, coinName)
        this.props.change('receiveAmount', null)
      }
    }

    if (sendAmount.length > 0)
      return '' + sendAmount
    else
      return sendAmount
  }

  normalizeReceiveAmount(value, previousValue) {
    const { currencySelected, coinSelected, placeholderSendAmount, coins } = this.state
    
    let decimalPoint = 8
    let receiveAmount = value.replace(/[^\d.]/g, '')
    // receiveAmount = Number(receiveAmount) < limits.Min.ReceiveCurrency ? String(limits.Min.ReceiveCurrency) : receiveAmount
    let pos = receiveAmount.indexOf('.')

    if (pos >= 0) {
      // prevent an extra decimal point
      if (receiveAmount.indexOf('.', pos + 1) > 0) receiveAmount = receiveAmount.substring(0, pos + 1)
      // allow up to 2 dp
      if (receiveAmount.length - pos > 2) receiveAmount = receiveAmount.substring(0, pos + 1 + decimalPoint)
    }

    if (value !== previousValue) {
      const currencyName = currencySelected.name
      const coinName = _.defaultTo(coinSelected && coinSelected.name, coins[0].name)

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


  initInterval(interval) {
    clearInterval(this.state.intervalId)
    let intervalId = setInterval(this.fetchCalls, interval * 1000)
    // store intervalId in the state so it can be accessed later to clear it
    this.setState({intervalId})
  }

  componentDidMount() {
    this.setState({ active: true })
    // set call fetch interval 
    this.initInterval(this.state.interval)
    // fetch call the first time component mounts
    this.fetchCalls()

    addEventListener('keyup', this.onEscape)
    addEventListener('click', this.onClickOutside)
  }

  componentWillUnmount() {
    this.setState({ active: false })
    clearInterval(this.state.intervalId)
    removeEventListener('keyup', this.onEscape)
    removeEventListener('click', this.onClickOutside)
  }

  onEscape = event => {
    if (event.keyCode === 27) {
      if (this.state.toggleCoin) {
        this.toggleDropDown('coin')
      }
      if (this.state.toggleCurrency) {
        this.toggleDropDown('currency')
      }
    }
  }

  onClickOutside = event => {
    const select = event.path.find(node => node.className === 'dropdown dropdown-currency-select')
    if (!select) {
      this.setState({
        toggleCoin: false,
        toggleCurrency: false,
        coinSearch: ''
      })
    }
  }

  getQuote() {
    if (this.state.action === 'sending') {
      this.props.fetchQuote({
        SendCurrency: this.state.currencySelected.name,
        ReceiveCurrency: this.state.coinSelected ? this.state.coinSelected.name : this.state.coins[0].name,
        SendAmount: this.props.sendAmount ? this.props.sendAmount : this.state.placeholderSendAmount
      })
    } else if (this.state.action === 'receiving' && this.props.receiveAmount) {
      this.props.fetchQuote({
        SendCurrency: this.state.currencySelected.name,
        ReceiveCurrency: this.state.coinSelected ? this.state.coinSelected.name : this.state.coins[0].name,
        ReceiveAmount: this.props.receiveAmount
      })
    }
  }

  fetchCalls() {
    if (this.props.match.path !== 'exchange') {
      this.props.fetchAssets()
      if (this.props.ctUser)
        this.props.fetchLimit(this.props.ctUser)
      this.props.fetchConsts()
      this.getQuote()
    }
  }


  componentWillReceiveProps(props) {
    const {
			quote: { QuoteSendAmount, QuoteReceiveAmount, loading },
			sendAmount,
			receiveAmount
		} = props
		const { action, currencySelected } = this.state
    this.setState({ quoteLoading: loading })

    if (sendAmount && action === 'sending') {
      if (sendAmount === QuoteSendAmount)
        this.props.change(
          'receiveAmount',
          Number.parseFloat(QuoteReceiveAmount).toFixed(QuoteReceiveAmount == 0 ? 0 : 8)
        )
    }
    if (receiveAmount && action === 'receiving' && currencySelected) {
      const { dp } = currencySelected
      if (receiveAmount === QuoteReceiveAmount)
        this.props.change(
          'sendAmount',
          `${Number.parseFloat(QuoteSendAmount).toFixed(QuoteSendAmount == 0 ? 0 : dp)}`
        )
    }

    this.updateLimit(props)
    this.updateCoins(props)
    this.updateRate(props)
  }

  onSubmit(values) {
    clearInterval(this.state.intervalId)
  }

  convertToReceiveAmount(amount) {
    return (!amount || !this.state.rate) ? 0 : (amount / this.state.rate)
  }

  convertToSendAmount(amount) {
    return amount * this.state.rate
  }

  renderField({ input, placeholder }) {
    return (
      <div>
        <input
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          className="form-control no-border p-0"
          {...input}
        />
      </div>
    )
  }

  onCoinSelected(coin) {
    this.props.history.push(`/buy-${_.kebabCase(coin.fullName)}`)
    this.setState({
      toggleCoin: false,
      coinSearch: ''
    })
  }

  onCurrencySelected(currency) {
    this.setState({
      currencySelected: currency,
      toggleCurrency: false
    }, () => this.fetchCalls())
  }

  updateLimit(props) {
    // this.setState({
    //   limit: props.limit.limit ? props.limit.limit : this.state.limit,
    //   limits: props.quote.Limits ? props.quote.Limits : this.state.limits
    // })

    if (props.limit.const) {
      let interval = props.limit.const.Frame1Refresh
      let refreshTime = props.limit.const.Frame2Refresh
      if (this.state.interval != interval && this.state.active) {
          this.initInterval(interval)
          this.setState({ interval })
      }
      if (this.state.reviewRefreshTime != refreshTime) {
          this.setState({ reviewRefreshTime: refreshTime })
      }
    }
  }

  updateRate(props) {
    this.setState({ rate: Number.parseFloat(props.quote.ExchangeRate) })
  }

  updateCoins(props) {
    let updatedCoins = []

    if (props.limit.assets && this.state.currencySelected) {
      Object.keys(props.limit.assets).forEach((assetPair) => {
        if (assetPair.startsWith(this.state.currencySelected.name)) {
          const asset = props.limit.assets[assetPair]
          const coin = coins.find(coin => assetPair.indexOf(coin.name) === 3)
          if (coin) {
            coin.DefaultQuoteAmount = asset.Send.DefaultQuoteAmount
            coin.Status = asset.Send.Status
            updatedCoins.push(coin)
          }
        }
      })

      // const prev = this.state.coinSelected
			// 	? this.state.coinSelected.name
      //   : false
      const coinParam = props.match && props.match.params[0]
      const nextCoin = updatedCoins.find(coin => _.kebabCase(coin.fullName) === coinParam)
      const coinSelected = nextCoin//this.state.coinSelected
				? nextCoin
				: updatedCoins.length
					? updatedCoins[0]
					: false

      this.setState({
        coins: updatedCoins,
        coinSelected,
        placeholderSendAmount: coinSelected ? coinSelected.DefaultQuoteAmount : this.state.placeholderSendAmount
      })
      // }, () => {
      //   if (prev != coinSelected.name) {
      //     this.fetchCalls()
      //   }
      // })
    }
  }

  renderButton() {
    const { coinSelected } = this.state
    const available = coinSelected && coinSelected.Status === 'AVAILABLE'
    return (
      <button
        type="submit"
        className={cn("btn-block btn-lg btn-exchange text-white no-border btn-success", !available ? 'unavailable' : null)}
        // data-toggle="modal" data-target="#subscribe-modal"
        onClick={(e) => {
          e.preventDefault()
          if (available)
            this.props.history.push('/login')
        }}>
        {available ? 'Instant Exchange' : 'Currently unavailable'}
      </button>
    )
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
    this.setState({search : !this.state.search})
  }

  toggleDropDown(type) {
    if (type === 'currency') {
      if (!this.state.toggleCurrency)
        this.props.fetchAssets()
      this.setState({ toggleCurrency: !this.state.toggleCurrency, toggleCoin: false, coinSearch: '' })
    }
    else if (type === 'coin') {
      if (!this.state.toggleCoin)
        this.props.fetchAssets()
      this.setState({ toggleCoin: !this.state.toggleCoin, coinSearch: '' })
    }
  }
  

  fistScreen() {
    const { handleSubmit } = this.props
    let coins = this.state.coins
    let currencies = this.state.currencies
    if (this.state.coinSearch)
      coins = this.state.coins.filter(coin => this.filterCoins(coin))

    const {
      sendAmount,
      receiveAmount,
      quote: { Limits, Message, Direction }
    } = this.props


    const ExchangeableItem = ({ exchangeable, onItemSelected, unavailable }) => (
      <div>
        { <a className={cn("dropdown-item", unavailable ? 'unavailable': null)} onClick={(e) => onItemSelected(exchangeable)}>
          <div className="text-label currency-label">
            <div className="currency-symbol-wrapper fluid px-2">
              <div className="col-8 text-left text-truncate currency-fullname p-0">
                <img className="currency-symbol" src={exchangeable.image} alt={exchangeable.name} />
                <span>{exchangeable.fullName}</span>
              </div>
              <div className="col-4 text-right p-0"><b>{exchangeable.name}</b></div>
            </div>
          </div>
        </a> }
      </div>
    )

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <div className="calc-input-wrapper">
            <label className={cn('field-label m-0', (sendAmount || receiveAmount) && Message ? 'invalid': null)}>
              {(sendAmount || receiveAmount) && Message ? Message : 'You send'}
            </label>
            <div className="calc-field">
              <div className="col-6 bg-input">
                <Field
                  name="sendAmount"
                  component={this.renderField}
                  normalize={this.normalizeSendAmount}
                  placeholder={
                    this.state.placeholderSendAmount.toFixed(this.state.currencySelected ? this.state.currencySelected.dp : 2)
                  } />
              </div>
              <div className="col-6 px-0 d-flex align-items-center d-flex align-items-center">
                <div className="dropdown dropdown-currency-select">
                  <a
                    className="btn dropdown-toggle"
                    href={document.documentElement.clientWidth > 992 ? '#' : '#main-calc'}
                    role="button"
                    id="dropdownMenuLink"
                    onClick={() => this.toggleDropDown('currency')}>
                    <div className="text-label currency-label">
                      <div className="currency-symbol-wrapper">
                        <img
                          className="currency-symbol"
                          src={this.state.currencySelected.image}
                          alt={this.state.currencySelected.name} />
                      </div>
                      <span className="text-left" style={{minWidth: '64px'}}>{this.state.currencySelected.name}</span>
                      <img
                        className="dropdown-arrow"
                        src="/img/arrow-down.svg"
                        alt="Dropdown" />
                    </div>
                  </a>
                  {
                    this.state.toggleCurrency &&
                    <div
                      className="dropdown-menu show"
                      aria-labelledby="dropdownMenuLink">

                      <div className="dropdown-items-wrapper">
                        {currencies.map((currency) => 
                          <ExchangeableItem
                            key={currency.name}
                            exchangeable={currency}
                            onItemSelected={this.onCurrencySelected} />
                        )}
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
            <label className="field-label m-0 mt-4">
              You receive
            </label>
            <div className="calc-field">
              <div className="col-6 bg-input">
                <Field
                  name="receiveAmount"
                  component={this.renderField}
                  normalize={this.normalizeReceiveAmount}
                  placeholder={this.convertToReceiveAmount(
                    this.state.placeholderSendAmount
                  ).toFixed(8)}
                />
              </div>
              <div className="col-6 px-0 d-flex align-items-center">
                <div className="dropdown dropdown-currency-select">
                  <a
                    className="btn dropdown-toggle"
                    href={document.documentElement.clientWidth > 992 ? '#' : '#main-calc'}
                    role="button"
                    id="dropdownMenuLink"
                    onClick={() => this.toggleDropDown('coin')}>
                    {this.state.coinSelected != null &&
                      <div className="text-label currency-label">
                        <div className="currency-symbol-wrapper">
                          <img
                            className="currency-symbol"
                            src={this.state.coinSelected.image}
                            alt={this.state.coinSelected.name} />
                        </div>
                        <span className="text-left" style={{minWidth: '64px'}}>{this.state.coinSelected.name}</span>
                        <img
                          className="dropdown-arrow"
                          src="/img/arrow-down.svg"
                          alt="Dropdown" />
                      </div>}
                  </a>
                  {this.state.toggleCoin &&
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
                          onClick = {this.toggleSearch}
                          onChange={this.searchCoin.bind(this)} />
                      </div>
                      <div className="dropdown-items-wrapper">
                        {coins.length ? coins.map((coin) => 
                          <ExchangeableItem
                            key={coin.name}
                            exchangeable={coin}
                            unavailable={coin.Status !== 'AVAILABLE'}
                            onItemSelected={this.onCoinSelected} />
                        ): <div className="px-3">No results</div>}
                      </div>
                    </div>}
                </div>
              </div>
            </div>
          </div>
          <h6 className="exchange-rate-label mt-4">
            Exchange Rate:{' '}
						<b>
							{!this.state.rate
								? '-/-'
								: (this.state.rate.toFixed(this.state.currencySelected ? this.state.currencySelected.dp : 2)) +
                  ' ' +
                  (this.state.currencySelected ? this.state.currencySelected.name : 'GBP') +
                  '/' +
                  (this.state.coinSelected ? this.state.coinSelected.name : 'BTC') +
                  ' '}
						</b>
          </h6>
          <div className="am row">
            <div className="mt-2 col-md-12">{this.renderButton()}</div>
          </div>
        </div>
      </form>
    )
  }

  render() {
    return <div>{ this.fistScreen() }</div>
  }
}

const mapStateToProps = state => {
  const selector = formValueSelector('SimpleCalcForm')
  const sendAmount = Number.parseFloat(selector(state, 'sendAmount'))
  const receiveAmount = Number.parseFloat(selector(state, 'receiveAmount'))

  return {
    quote: state.quote,
    limit: state.limit,
    sendAmount,
    receiveAmount
  }
}

const debouceSend = _.debounce((props, sendAmount, currency, coin) => {
  props.fetchQuote({
    SendCurrency: currency,
    ReceiveCurrency: coin,
    SendAmount: Number.parseFloat(sendAmount)
  })
}, 500, { trailing: true })

const debouceReceive = _.debounce((props, receiveAmount, currency, coin) => {
  props.fetchQuote({
    SendCurrency: currency,
    ReceiveCurrency: coin,
    ReceiveAmount: Number.parseFloat(receiveAmount)
  })
}, 500, { trailing: true })

export default reduxForm({ form: 'SimpleCalcForm' }) (
  connect(mapStateToProps, { fetchQuote, fetchLimit, fetchConsts, fetchAssets }) (
    withRouter(SimpleCalculator)
  )
)
