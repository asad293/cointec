import React, { Component } from "react";
import { formValueSelector, Field, reduxForm } from "redux-form";

import { fetchQuote, fetchLimit, fetchConsts, fetchAssets } from '../../Redux/actions';
import { connect } from "react-redux";
import "./style.scss";
import cn from "classnames";
import walletValidator from 'wallet-address-validator';
import { coins, currencies } from './exchangeables';

class SimpleCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderSendAmount: 250,
      placeholderReceiveAmount: 0,
      rate: 1200,
      currencySymbol: "£",
      limit: 0,
      limitMin: 15,
      // buttonIsDisabled: false,
      // screen: 'first',
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
    };

    this.fistScreen = this.fistScreen.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateRate = this.updateRate.bind(this);
    // this.updateSendAmount = this.updateSendAmount.bind(this);
    // this.updateReceiveAmount = this.updateReceiveAmount.bind(this);

    this.normalizeSendAmount = this.normalizeSendAmount.bind(this);
    this.normalizeReceiveAmount = this.normalizeReceiveAmount.bind(this);
    this.convertToReceiveAmount = this.convertToReceiveAmount.bind(this);
    this.convertToSendAmount = this.convertToSendAmount.bind(this);

    // this.back = this.back.bind(this);
    this.fetchCalls = this.fetchCalls.bind(this);
    this.onCoinSelected = this.onCoinSelected.bind(this);
    this.onCurrencySelected = this.onCurrencySelected.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  // back() {
  //   let intervalId = setInterval(this.fetchCalls, this.state.interval * 1000);
  //   this.setState({ screen: 'first', intervalId });
  // }

  normalizeSendAmount(value, previousValue) {
    const decimalPoint = 2

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
      if (sendAmount.length > 0)
        this.props.fetchQuote({
          SendCurrency: this.state.currencySelected.name,
          ReceiveCurrency: this.state.coinSelected.name,
          SendAmount: Number.parseFloat(sendAmount)
        })
      else {
        this.props.fetchQuote({
          SendCurrency: this.state.currencySelected.name,
          ReceiveCurrency: this.state.coinSelected.name,
          SendAmount: Number.parseFloat(this.state.placeholderSendAmount)
        })
        this.props.change('receiveAmount', null);
      }
    }

    if (sendAmount.length > 0)
      return "£ " + sendAmount;
    else
      return sendAmount;
  }

  normalizeReceiveAmount(value, previousValue) {
    let decimalPoint = 8;
    let receiveAmount = value.replace(/[^\d.]/g, '');
    let pos = receiveAmount.indexOf('.');

    if (pos >= 0) {
      // prevent an extra decimal point
      if (receiveAmount.indexOf('.', pos + 1) > 0) receiveAmount = receiveAmount.substring(0, pos + 1);
      // allow up to 2 dp
      if (receiveAmount.length - pos > 2) receiveAmount = receiveAmount.substring(0, pos + 1 + decimalPoint);
    }

    if (value !== previousValue) {
      if (receiveAmount.length > 0) {
        this.setState({ action: 'receiving' })
        this.props.fetchQuote({
          SendCurrency: this.state.currencySelected.name,
          ReceiveCurrency: this.state.coinSelected.name,
          ReceiveAmount: Number.parseFloat(receiveAmount)
        })
      } else {
        // fetch quote to reset default rate
        this.props.fetchQuote({
          SendCurrency: this.state.currencySelected.name,
          ReceiveCurrency: this.state.coinSelected.name,
          SendAmount: Number.parseFloat(this.state.placeholderSendAmount)
        })
        this.props.change('sendAmount', null);
        // this.setState({ active: "gbp" });
        this.setState({ action: 'sending' })
      }
    }
    return receiveAmount;
  }


  initInterval(interval) {
    clearInterval(this.state.intervalId)
    let intervalId = setInterval(this.fetchCalls, interval * 1000);
    // store intervalId in the state so it can be accessed later to clear it
    this.setState({intervalId})
}
  componentDidMount() {
    // set call fetch interval 
    this.initInterval(this.state.interval)
    // fetch call the first time component mounts
    this.fetchCalls();
    // // store intervalId in the state so it can be accessed later to clear it
    // this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  fetchCalls() {
    this.props.fetchLimit();
    this.props.fetchConsts();

    if (this.state.action === 'sending') {
      this.props.fetchQuote({
        SendCurrency: this.state.currencySelected.name,
        ReceiveCurrency: this.state.coinSelected.name,
        SendAmount: this.props.sendAmount ? this.props.sendAmount : this.state.placeholderSendAmount
      })
    } else if (this.state.action === 'receiving' && this.props.receiveAmount) {
      this.props.fetchQuote({
        SendCurrency: this.state.currencySelected.name,
        ReceiveCurrency: this.state.coinSelected.name,
        ReceiveAmount: this.props.receiveAmount
      })
    }
  }


  componentWillReceiveProps(props) {
    this.setState({
      quoteLoading: props.quote.loading
    })

    if (props.sendAmount && this.state.action === 'sending' && props.quote.QuoteReceiveAmount)
      this.props.change('receiveAmount', Number.parseFloat(props.quote.QuoteReceiveAmount).toFixed(8))
    
    if (props.receiveAmount && this.state.action === 'receiving' && props.quote.QuoteSendAmount)
      this.props.change(
        'sendAmount',
        `${this.state.currencySymbol} ${Number.parseFloat(props.quote.QuoteSendAmount).toFixed(2)}`
      )

    this.updateRate(props);
  }

  onSubmit(values) {
    clearInterval(this.state.intervalId)
  }

  convertToReceiveAmount(amount) {
    return amount / this.state.rate;
  }

  convertToSendAmount(amount) {
    return amount * this.state.rate;
  }

  renderField(field) {
    const {
      placeholder,
      valid,
      meta: { touched, error },
      label
    } = field;
    const className = `${touched && error ? "has-warning" : ""} ${
      valid === true ? "has-success" : ""
    }  ${valid === false ? "has-warning" : ""}`;
    return (
      <div className={className}>
        <label className="field-label m-0">{label}</label>
        <input
          autoComplete="off"
          placeholder={placeholder}
          className="form-control no-border p-0 "
          {...field.input}
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  onCoinSelected(coin) {
    console.log('here',coin);
    this.setState({
      coinSelected: coin
    }, () => this.fetchCalls());
  }

  onCurrencySelected(currency) {
    this.setState({
      currencySelected: currency
    });
  }

  // updateReceiveAmount(props) {
  //   if (props.receiveAmount.ExchangeRate) {
  //     this.setState({ receiveAmount: Number.parseFloat(props.receiveAmount.ExchangeRate) })
  //   }
  // }

  // updateSendAmount(props) {
  //   if (props.receiveAmount.ExchangeRate) {
  //     this.setState({ receiveAmount: Number.parseFloat(props.receiveAmount.ExchangeRate) });
  //   }
  // }

  updateRate(props) {
    if (props.quote.ExchangeRate) {
      this.setState({ rate: Number.parseFloat(props.quote.ExchangeRate) })
    }
}

  renderButton() {
    let buttonState = "";
    let buttonClass = "btn-success ";
    // if (this.state.buttonIsDisabled) {
    //   buttonState = "disabled";
    //   buttonClass = "";
    // }
    return (
      <button
        type="submit"
        className={cn(
          "btn-block btn-lg btn-exchange text-white no-border",
          buttonClass,
          buttonState
        )}
        data-toggle="modal" data-target="#subscribe-modal"
        disabled={buttonState}>
        Subscribe for early access
      </button>
    );
  }

  searchCoin({ target }) {
    this.setState({
      coinSearch: target.value
    })
  }

  filterCoins(coin) {
    let word = this.state.coinSearch.toLowerCase().trim();
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
    if(type === 'currency') {
      if(!this.state.toggleCurrency)
        this.props.fetchAssets();
      this.setState({ toggleCurrency: !this.state.toggleCurrency });
    }
    else if(type === 'coin') {
      if(!this.state.toggleCoin)
        this.props.fetchAssets();
      this.setState({ toggleCoin: !this.state.toggleCoin });
    }
  }
  

  fistScreen() {
    const { handleSubmit } = this.props
    let coins = this.state.coins
    let currencies = this.state.currencies
    if (this.state.coinSearch)
      coins = this.state.coins.filter(coin => this.filterCoins(coin))

    const ExchangeableItem = ({ exchangeable, onItemSelected, status, unavailable }) => (
      <div>
        { status !== 'DISABLED' && 
        <a className={cn("dropdown-item", unavailable ? 'unavailable': null)} onClick={ unavailable ? null: (e) => onItemSelected(exchangeable)}>
          <div className="text-label currency-label">
            <div className="currency-symbol-wrapper">
              <img className="currency-symbol" src={exchangeable.image} alt={exchangeable.name} />
            </div>
            <span>{exchangeable.name}</span>
          </div>
          {/* <span>{exchangeable.name}</span> */}
        </a> }
      </div>
    )

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <div className="calc-input-wrapper">
            <div className="row am row-flex ">
              <div className="col-6  bg-input">
                <Field
                  name="sendAmount"
                  label="You send"
                  component={this.renderField}
                  normalize={this.normalizeSendAmount}
                  placeholder={
                    this.state.currencySymbol + " " + this.state.placeholderSendAmount
                  }
                />
              </div>
              <div onClick={() => this.toggleDropDown('currency')} className="col-6 pl-0  d-flex align-items-center d-flex align-items-center">
                <div className="dropdown dropdown-currency-select">
                  <a
                    className="btn dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    //data-toggle="dropdown"
                    //aria-haspopup="true"
                    //aria-expanded="false"
                    >
                    <div className="text-label currency-label">
                      <div className="currency-symbol-wrapper">
                        <img
                          className="currency-symbol"
                          src={this.state.currencySelected.image}
                          alt={this.state.currencySelected.name} />
                      </div>
                      <span>{this.state.currencySelected.name}</span>
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
                      <div className="search-item">
                        
                      
                        <input className="search-input"
                          placeholder="Coming Soon"
                          type="text" name="lname" disabled/>
                      </div>

                      <div className="dropdown-items-wrapper">
                        {currencies.map((currency) => 
                          <ExchangeableItem
                            key={currency.name}
                            exchangeable={currency}
                            status={currency.Status}
                            //unavailable={currency.unavailable}
                            onItemSelected={this.onCurrencySelected} />
                        )}
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
            <hr className="my-2" />
            <div className="row am row-flex ">
              <div className="col-6 bg-input">
                <Field
                  name="receiveAmount"
                  label="You receive"
                  component={this.renderField}
                  normalize={this.normalizeReceiveAmount}
                  placeholder={this.convertToReceiveAmount(
                    this.state.placeholderSendAmount
                  ).toFixed(8)}
                />
              </div>
              <div className="col-6 pl-0 d-flex align-items-center">
                <div onClick={() => this.toggleDropDown('coin')} className="dropdown dropdown-currency-select">
                  <a
                    className="btn dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"

                    //data-toggle="dropdown"
                    //aria-haspopup="true"
                    //aria-expanded="false"
                    >
                    { 
                      this.state.coinSelected != null &&

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
                    }
                  </a>
                  {
                    this.state.toggleCoin &&
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
                        {coins.map((coin) => 
                          <ExchangeableItem
                            key={coin.name}
                            exchangeable={coin}
                            status={coin.Status}
                            //unavailable={coin.unavailable}
                            onItemSelected={this.onCoinSelected} />
                        )}
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="am row">
            <div className="mt-4 col-md-12">{this.renderButton()}</div>
          </div>

          <h6 className="text-white mt-3">
            {
              this.state.currencySymbol + ' ' +
              this.state.rate.toFixed(2) + '/' + 
              (this.state.coinSelected ? this.state.coinSelected.name : 'BTC') + 
              ' Exchange Rate'
            }
          </h6>
        </div>
      </form>
    );
  }

  render() {
    return <div>{ this.fistScreen() }</div>
  }
}

const mapStateToProps = state => {
  const selector = formValueSelector('SimpleCalcForm')
  let sendAmount = '"' + selector(state, 'sendAmount')
  sendAmount = Number.parseFloat(sendAmount.split(" ")[1])
  const receiveAmount = Number.parseFloat(selector(state, 'receiveAmount'))

  return {
    quote: state.quote,
    sendAmount,
    receiveAmount
  }
}

export default reduxForm({ form: 'SimpleCalcForm' }) (
  connect(mapStateToProps, { fetchQuote, fetchLimit, fetchConsts, fetchAssets }) (
    SimpleCalculator
  )
)
