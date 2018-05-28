import React, { Component } from "react";
import { formValueSelector, Field, reduxForm } from "redux-form";
import { fetchAssets, fetchQuote, fetchLimit, fetchConsts, fetchAccounts } from "../../Redux/actions/index";
import { connect } from "react-redux";
import "./style.scss";
import cn from "classnames";
import walletValidator from "wallet-address-validator";
import { coins, currencies } from './exchangeables';

class SimpleCalculator extends Component {
  constructor() {
    super();
    this.state = {
      placeholder: 250,
      placeholderBTC: null,
      rate: 1200,
      currencySymbol: "£",
      limit: 0,
      limitMin: 15,
      buttonIsDisabled: false,
      screen: "first",
      active: "gbp",
      intervalId: null,
      interval: 60,
      debouncedBTC: null,
      debouncedGBP: null,
      btcLoading: false,
      gbpLoading: false,
      coins,
      currencies,
      coinSearch: '',
      coinSelected: coins[0],
      currencySelected: currencies[0]
    };
    this.fistScreen = this.fistScreen.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateRate = this.updateRate.bind(this);

    this.normalizeGBP = this.normalizeGBP.bind(this);
    this.normalizeBTC = this.normalizeBTC.bind(this);
    this.convertToBTC = this.convertToBTC.bind(this);
    this.convertToGBP = this.convertToGBP.bind(this);
    this.updateCoins = this.updateCoins.bind(this);
    this.fetchCalls = this.fetchCalls.bind(this);
    this.getQuote = this.getQuote.bind(this);
    this.back = this.back.bind(this);
    this.onCoinSelected = this.onCoinSelected.bind(this);
    this.onCurrencySelected = this.onCurrencySelected.bind(this);
  }

  back() {
    let intervalId = setInterval(this.fetchCalls, this.state.interval * 1000);
    this.setState({ screen: "first", intervalId });
  }

  normalizeGBP(value, previousValue) {
    let decimalPoint = 2;
    let gbp = value.replace(/[^\d.]/g, "");
    let pos = gbp.indexOf(".");

    this.setState({ active: "gbp" });
    if (pos >= 0) {
      // prevent an extra decimal point
      if (gbp.indexOf(".", pos + 1) > 0) gbp = gbp.substring(0, pos + 1);
      // allow up to 2 dp
      if (gbp.length - pos > 2) gbp = gbp.substring(0, pos + 1 + decimalPoint);
    }

    if(value !== previousValue)
    {
        if(gbp.length > 0) {
            if(this.state.debouncedGBP === null) {
                this.setState( { debouncedGBP: _.debounce((gbp) => { this.props.fetchQuote({'ReceiveCurrency': this.state.coinSelected.name, 'SendAmount': Number.parseFloat(gbp)})}, 500,  { 'trailing': true }) }, () => { 
                    this.state.debouncedGBP(gbp)
                })
            }

            if(this.state.debouncedGBP) {
                this.state.debouncedGBP(gbp);
            }
        }
        else
        {
          if(this.state.debouncedGBP)
            this.state.debouncedGBP(this.state.placeholder)
          this.props.change('btc', null)
        }
    }

    if (gbp.length > 0) 
      return "£ " + gbp;
    else 
      return gbp;
  }

  normalizeBTC(value, previousValue) {
    let decimalPoint = 8;
    let btc = value.replace(/[^\d.]/g, "");
    let pos = btc.indexOf(".");

    if (pos >= 0) {
      // prevent an extra decimal point
      if (btc.indexOf(".", pos + 1) > 0) btc = btc.substring(0, pos + 1);
      // allow up to 2 dp
      if (btc.length - pos > 2) btc = btc.substring(0, pos + 1 + decimalPoint);
    }

    if(value !== previousValue)
        {
            if(btc.length > 0) {
                this.setState({active: 'btc'})
                if(this.state.debouncedBTC === null)
                    this.setState( { debouncedBTC: _.debounce((btc) => { this.props.fetchQuote({'ReceiveCurrency': this.state.coinSelected.name, 'ReceiveAmount': Number.parseFloat(btc)})}, 500,  { 'trailing': true }) }, () => {
                        this.state.debouncedBTC(btc) 
                    })
                
                if(this.state.debouncedBTC)
                    this.state.debouncedBTC(btc);
            }
            else {
                // fetch btc to reset default rate
                if(this.state.debouncedBTC)
                  this.state.debouncedBTC.cancel();
                this.props.fetchQuote({'ReceiveCurrency': this.state.coinSelected.name, 'SendAmount': Number.parseFloat(this.state.placeholder)})
                this.props.change('gbp', null)
                this.setState({active: 'gbp'})
            }
        }

    return btc;
  }


  initInterval(interval) {
    clearInterval(this.state.intervalId)
    let intervalId = setInterval(this.fetchCalls, interval * 1000);
    // store intervalId in the state so it can be accessed later to clear it
    this.setState({intervalId: intervalId})
}
  componentDidMount() {
    // set call fetch interval 
    this.initInterval(this.state.interval)
    // fetch call the first time component mounts
    this.fetchCalls()
    //this.props.fetchAccounts(5)
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  getQuote() {
    if(this.state.active === 'gbp') {
        this.props.fetchQuote({'ReceiveCurrency': this.state.coinSelected.name, 'SendAmount': this.props.gbp ? this.props.gbp : this.state.placeholder});
    }
    else if(this.state.active === 'btc' && this.props.btc) {
        this.props.fetchQuote({'ReceiveCurrency': this.state.coinSelected.name, 'ReceiveAmount': this.props.btc });
    }
  }

  fetchCalls() {
    this.props.fetchAssets();
    this.props.fetchLimit();
    this.props.fetchConsts();
    this.getQuote();
  }


  componentWillReceiveProps(props) {
    //console.log(props);
    if(props.quote.SendAmount === this.state.placeholder)
        this.setState({ placeholderBTC: props.quote.ReceiveAmount })
    if(props.gbp && this.state.active === 'gbp' && props.quote.ReceiveAmount)
        this.props.change('btc',Number.parseFloat(props.quote.ReceiveAmount).toFixed(8))
        
    if(props.btc && this.state.active === 'btc' && props.quote.SendAmount)
        this.props.change('gbp',this.state.currencySymbol + ' ' + Number.parseFloat(props.quote.SendAmount).toFixed(2))
        
    this.updateLimit(props)
    this.updateRate(props)
    this.updateCoins(props)
    //this.updateButtonState(props)
  }

  updateCoins(props) {
    const coins = this.state.coins;
    if(props.limit.assets) {
      props.limit.assets.map((asset) => {
        coins.map((coin) => {
          if(asset.AssetPair.indexOf(coin.name) === 3) {
            coin.DefaultQuoteAmount = asset.DefaultQuoteAmount;
            if(asset.Status === 'DISABLED') {
              coin.disabled = true
              //console.log(coin,'disabled')
            }
            else if(asset.Status === 'UNAVAILABLE') {
              coin.unavailable = true
              //console.log(coin,'UNAVAILABLE')
            }
            else {
              coin.available = true;
            }
          }
        })
      })
    }
    //console.log(coins);
    this.setState({coins});
  }

  onSubmit(values) {
    clearInterval(this.state.intervalId)
  }

  convertToBTC(amount) {
    return amount / this.state.rate;
  }

  convertToGBP(amount) {
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
    this.setState({
      coinSelected: coin
    }, () => { this.getQuote()});
  }

  onCurrencySelected(currency) {
    this.setState({
      currencySelected: currency
    });
    
  }

  updateLimit(props) {
        
    if (props.limit.limit) {
        this.setState({ limit: props.limit.limit })
    }
    if (props.limit.const) {
        let interval = props.limit.const.Frame1Refresh
        let refreshTime = props.limit.const.Frame2Refresh
        if(this.state.interval != interval) {
            this.initInterval(interval)
            this.setState({ interval })
        }
        if(this.state.reviewRefreshTime != refreshTime) {
            this.setState({ reviewRefreshTime: refreshTime })
        }
    }
  }

  updateRate(props) {
    if(props.quote.ExchangeRate) {
        this.setState({ rate: Number.parseFloat(props.quote.ExchangeRate) })
    }
}

  renderButton() {
    let buttonState = "";
    let buttonClass = "btn-success ";
    if (this.state.buttonIsDisabled) {
      buttonState = "disabled";
      buttonClass = "";
    }
    return (
      <button
        type="submit"
        className={cn(
          "btn-block btn-lg btn-exchange text-white no-border",
          buttonClass,
          buttonState
        )}
        disabled={buttonState}
      >
        Instant exchange
      </button>
    );
  }

  searchCoin({ target }) {
    this.setState({
      coinSearch: target.value
    });
  }

  filterCoins(coin) {
    let word = this.state.coinSearch.toLowerCase().trim();
    if (coin.name.toLowerCase().includes(word)) {
        return true;
    }
    
    if (coin.keywords.includes(word)) {
      return true;
    }
    return false;
  }

  fistScreen() {
    const { handleSubmit } = this.props;
    let coins = this.state.coins;
    let currencies = this.state.currencies;
    if (this.state.coinSearch)
      coins = this.state.coins.filter(coin => this.filterCoins(coin));

    const ExchangeableItem = ({ exchangeable, onItemSelected, disabled = false, unavailable = false }) => (
      <div>
        { !disabled && 
        <a className={cn("dropdown-item", unavailable ? 'unavailable': null)} onClick={ unavailable ? null: (e) => onItemSelected(exchangeable)}>
          <div className="text-label currency-label">
            <div className="currency-symbol-wrapper">
              <img className="currency-symbol" src={exchangeable.image} alt={exchangeable.name} />
            </div>
            <span>{exchangeable.name}</span>
          </div>
        </a>
        }
      </div>
    );

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <div className="calc-input-wrapper">
            <div className="row am row-flex ">
              <div className="col-6  bg-input">
                <Field
                  name="gbp"
                  label="You send"
                  component={this.renderField}
                  normalize={this.normalizeGBP}
                  placeholder={
                    this.state.currencySymbol + " " + this.state.placeholder
                  }
                />
              </div>
              <div className="col-6 pl-0  d-flex align-items-center d-flex align-items-center">
                <div className="dropdown dropdown-currency-select">
                  <a
                    className="btn dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
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
                  <div
                    className="dropdown-menu"
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
                          disabled={currency.disabled}
                          unavailable={currency.unavailable}
                          onItemSelected={this.onCurrencySelected} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-2" />
            <div className="row am row-flex ">
              <div className="col-6 bg-input">
                <Field
                  name="btc"
                  label="You receive"
                  component={this.renderField}
                  normalize={this.normalizeBTC}
                  placeholder={ this.state.placeholderBTC }
                />
              </div>
              <div className="col-6 pl-0 d-flex align-items-center">
                <div className="dropdown dropdown-currency-select">
                  <a
                    className="btn dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
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
                  </a>

                  <div
                    className="dropdown-menu"
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
                        onChange={this.searchCoin.bind(this)} />
                    </div>

                    <div className="dropdown-items-wrapper">
                      {coins.map((coin) => 
                        <ExchangeableItem
                          key={coin.name}
                          exchangeable={coin}
                          disabled={coin.disabled}
                          unavailable={coin.unavailable}
                          onItemSelected={this.onCoinSelected} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="am row">
            <div className="mt-4 col-md-12">{this.renderButton()}</div>
          </div>

          <h6 className="text-white mt-3">
            {this.state.currencySymbol +
              this.state.rate.toFixed(2) +
              "/" + this.state.coinSelected.name + " Exchange Rate"}
          </h6>
        </div>
      </form>
    );
  }

  render() {
    return <div>{this.fistScreen()}</div>;
  }
}

const mapStateToProps = state => {
  const selector = formValueSelector("SimpleCalcForm");
  let gbp = '"' + selector(state, "gbp");
  gbp = Number.parseFloat(gbp.split(" ")[1]);
  const btc = Number.parseFloat(selector(state, "btc"));

  return {
    bank: state.bank,
    quote: state.quote,
    limit: state.limit,
    gbp,
    btc
  };
};

export default reduxForm({
  form: "SimpleCalcForm"
})(
  connect(mapStateToProps, { fetchLimit, fetchAssets, fetchQuote,fetchConsts, fetchAccounts })(
    SimpleCalculator
  )
);
