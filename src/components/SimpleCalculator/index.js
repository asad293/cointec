import React, { Component } from "react";
import { formValueSelector, Field, reduxForm } from "redux-form";
import { fetchBTC, fetchGBP, fetchAccounts } from "../../Redux/actions/index";
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
      placeholderBTC: 0,
      rate: 1200,
      currencySymbol: "£",
      limit: 0,
      limitMin: 15,
      buttonIsDisabled: false,
      screen: "first",
      active: "gbp",
      intervalId: null,
      interval: 10,
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
    this.updateGBP = this.updateGBP.bind(this);
    this.updateBTC = this.updateBTC.bind(this);

    this.normalizeGBP = this.normalizeGBP.bind(this);
    this.normalizeBTC = this.normalizeBTC.bind(this);
    this.convertToBTC = this.convertToBTC.bind(this);
    this.convertToGBP = this.convertToGBP.bind(this);
    this.fetchCalls = this.fetchCalls.bind(this);
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

    if (value !== previousValue) {
      if (gbp.length > 0)
        this.props.fetchBTC({ amount: Number.parseFloat(gbp) });
      else {
        this.props.fetchBTC({
          amount: Number.parseFloat(this.state.placeholder)
        });
        this.props.change("btc", null);
      }
    }

    if (gbp.length > 0) return "£ " + gbp;
    else return gbp;
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

    if (value !== previousValue) {
      if (btc.length > 0) {
        this.setState({ active: "btc" });
        this.props.fetchGBP({ amount: Number.parseFloat(btc) });
      } else {
        // fetch btc to reset default rate
        this.props.fetchBTC({
          amount: Number.parseFloat(this.state.placeholder)
        });
        this.props.change("gbp", null);
        this.setState({ active: "gbp" });
      }
    }

    return btc;
  }

  componentDidMount() {
    let intervalId = setInterval(this.fetchCalls, this.state.interval * 1000);
    // fetch call the first time component mounts
    this.fetchCalls();
    // store intervalId in the state so it can be accessed later to clear it
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  fetchCalls() {
    if (this.state.active === "gbp") {
      this.props.fetchBTC({
        amount: this.props.gbp ? this.props.gbp : this.state.placeholder
      });
    } else if (this.state.active === "btc" && this.props.btc) {
      this.props.fetchGBP({ amount: this.props.btc });
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      btcLoading: props.btcRate.loading,
      gbpLoading: props.gbpRate.loading
    });
    if (
      props.gbp &&
      this.state.active === "gbp" &&
      props.btcRate.CustomerReceiveAmount
    )
      this.props.change(
        "btc",
        Number.parseFloat(props.btcRate.CustomerReceiveAmount).toFixed(8)
      );

    if (
      props.btc &&
      this.state.active === "btc" &&
      props.gbpRate.CustomerSendAmount
    )
      this.props.change(
        "gbp",
        this.state.currencySymbol +
          " " +
          Number.parseFloat(props.gbpRate.CustomerSendAmount).toFixed(2)
      );

    this.updateRate(props);
  }

  onSubmit(values) {
    clearInterval(this.state.intervalId);
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
      label,
      reference
    } = field;
    const className = `${touched && error ? "has-warning" : ""} ${
      valid === true ? "has-success" : ""
    }  ${valid === false ? "has-warning" : ""}`;
    return (
      <div className={className}>
        <label className="field-label m-0">{label}</label>
        <input
          autoComplete="off"
          ref={reference}
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
    });
    this.coinInput.focus();
  }

  onCurrencySelected(currency) {
    this.setState({
      currencySelected: currency
    });
    this.currencyInput.focus();
    // updateRate()
  }

  updateBTC(props) {
    if (props.btc.CustomerRate) {
      this.setState({ btc: Number.parseFloat(props.btc.CustomerRate) });
    }
  }

  updateGBP(props) {
    if (props.gbp.CustomerRate) {
      this.setState({ gbp: Number.parseFloat(props.gbp.CustomerRate) });
    }
  }

  updateRate(props) {
    if (this.state.active === "btc" && props.gbpRate.CustomerRate) {
      this.setState({ rate: Number.parseFloat(props.gbpRate.CustomerRate) });
    } else if (props.btcRate.CustomerRate) {
      this.setState({ rate: Number.parseFloat(props.btcRate.CustomerRate) });
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

  fistScreen() {
    const { handleSubmit } = this.props;
    let coins = this.state.coins;
    let currencies = this.state.currencies;
    if (this.state.coinSearch)
      coins = this.state.coins.filter(coin => this.filterCoins(coin));

    const ExchangeableItem = ({ exchangeable, onItemSelected }) => (
      <a className="dropdown-item" onClick={(e) => onItemSelected(exchangeable)}>
        <div className="text-label currency-label">
          <div className="currency-symbol-wrapper">
            <img className="currency-symbol" src={exchangeable.image} alt={exchangeable.name} />
          </div>
          <span>{exchangeable.name}</span>
        </div>
      </a>
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
                  reference={(input) => { this.currencyInput = input }}
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
                  reference={(input) => { this.coinInput = input }}
                  component={this.renderField}
                  normalize={this.normalizeBTC}
                  placeholder={this.convertToBTC(
                    this.state.placeholder
                  ).toFixed(8)}
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
              "/BTC Exchange Rate"}
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
    btcRate: state.btcRate,
    gbpRate: state.gbpRate,
    gbp,
    btc
  };
};

export default reduxForm({
  form: "SimpleCalcForm"
})(
  connect(mapStateToProps, { fetchBTC, fetchGBP, fetchAccounts })(
    SimpleCalculator
  )
);
