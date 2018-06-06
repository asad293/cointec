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
      coinSelected: false,
      currencySelected: currencies[0],
      toggleCurrency: false,
      toggleCoin: false,
      search: false,
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
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  back() {
    let intervalId = setInterval(this.fetchCalls, this.state.interval * 1000);
    this.setState({ screen: "first", intervalId });
  }

  normalizeGBP(value, previousValue) {
    let decimalPoint = this.state.currencySelected.dp;
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
                this.setState( { debouncedGBP: _.debounce((gbp) => { this.props.fetchQuote({'SendCurrency': this.state.currencySelected.name,'ReceiveCurrency': this.state.coinSelected.name, 'SendAmount': Number.parseFloat(gbp)})}, 500,  { 'trailing': true }) }, () => { 
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
      return this.state.currencySymbol + ' ' + gbp;
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
                    this.setState( { debouncedBTC: _.debounce((btc) => { this.props.fetchQuote({'SendCurrency': this.state.currencySelected.name,'ReceiveCurrency': this.state.coinSelected.name, 'ReceiveAmount': Number.parseFloat(btc)})}, 500,  { 'trailing': true }) }, () => {
                        this.state.debouncedBTC(btc) 
                    })
                
                if(this.state.debouncedBTC)
                    this.state.debouncedBTC(btc);
            }
            else {
                // fetch btc to reset default rate
                if(this.state.debouncedBTC)
                  this.state.debouncedBTC.cancel();
                this.props.fetchQuote({'SendCurrency': this.state.currencySelected.name, 'ReceiveCurrency': this.state.coinSelected.name, 'SendAmount': Number.parseFloat(this.state.placeholder)})
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
    this.props.fetchAssets();
    //this.props.fetchAccounts(5)
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  getQuote() {
    if(this.state.active === 'gbp') {
        this.props.fetchQuote({'SendCurrency': this.state.currencySelected.name,'ReceiveCurrency': this.state.coinSelected.name, 'SendAmount': this.props.gbp ? this.props.gbp : this.state.placeholder});
    }
    else if(this.state.active === 'btc' && this.props.btc) {
        this.props.fetchQuote({'SendCurrency': this.state.currencySelected.name,'ReceiveCurrency': this.state.coinSelected.name, 'ReceiveAmount': this.props.btc });
    }
  }

  fetchCalls() {
    this.props.fetchLimit();
    this.props.fetchConsts();
    //this.getQuote();
  }


  componentWillReceiveProps(props) {
    //console.log(props);
    if(props.quote.SendAmount === this.state.placeholder)
        this.setState({ placeholderBTC: props.quote.ReceiveAmount.toFixed(8) })
    if(props.gbp && this.state.active === 'gbp' && props.quote.ReceiveAmount)
        this.props.change('btc',Number.parseFloat(props.quote.ReceiveAmount).toFixed(8))
        
    if(props.btc && this.state.active === 'btc' && props.quote.SendAmount)
        this.props.change('gbp',this.state.currencySymbol + ' ' + Number.parseFloat(props.quote.SendAmount).toFixed(this.state.currencySelected.dp))
        
    this.updateLimit(props)
    this.updateRate(props)
    this.updateCoins(props)
    //this.updateButtonState(props)
  }

  updateCoins(props) {
    let coins = this.state.coins;
    console.log(coins)
    let prevPlaceHolder = this.state.placeholder;
    if(props.limit.assets) {
      let associateCoins = _.keyBy(coins, 'name');

      props.limit.assets.map((asset,i) => {
        let currencyIndex = asset.AssetPair.replace("GBP","");
        if(associateCoins[currencyIndex]) {
          _.assign(asset,associateCoins[currencyIndex])
        }
        else
          _.assign(asset,associateCoins['NOASSET'])
      })
      console.log('assets',props.limit.assets);
      this.setState({ coins: props.limit.assets });
      if(!this.state.coinSelected) {
        this.onCoinSelected(props.limit.assets[2]);
      }
    }
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
    console.log('here',coin);
    this.setState({
      coinSelected: coin,
      placeholder: coin.DefaultQuoteAmount
    }, () => { this.getQuote()});
  }

  onCurrencySelected(currency) {
    this.setState({
      currencySelected: currency,
      currencySymbol: currency.symbol,
    }, () => { this.getQuote(), this.props.change('gbp', null), this.props.change('btc', null)});
    
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
    if (coin.name.toLowerCase().startsWith(word)) {
        return true;
    }
    
    if (coin.keywords.startsWith(word)) {
      return true;
    }
    return false;
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
    const { handleSubmit } = this.props;
    let coins = this.state.coins;
    let currencies = this.state.currencies;
    if (this.state.coinSearch)
      coins = this.state.coins.filter(coin => this.filterCoins(coin));

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
                  name="btc"
                  label="You receive"
                  component={this.renderField}
                  normalize={this.normalizeBTC}
                  placeholder={ this.state.placeholderBTC }
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
            {this.state.currencySymbol +
              this.state.rate.toFixed(this.state.currencySelected.dp) +
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
