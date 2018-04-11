import React, { Component } from 'react'
import { formValueSelector, Field, reduxForm } from 'redux-form'
import { fetchBTC, fetchGBP, fetchLimit } from '../../Redux/actions/index'
import { connect } from 'react-redux'
import './style.css'
import cn from 'classnames'
import walletValidator from 'wallet-address-validator'
import ReviewForm from './Components/reviewForm'

class Calculator extends Component {
    
    constructor() {
        super()
        this.state = {
            placeholder: 250,
            placeholderBTC: 0,
            rate: 1200,
            currencySymbol: '£',
            limit: 0,
            buttonIsDisabled: false,
            screen: 'second',
            active: null
        }
        this.fistScreen = this.fistScreen.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.updateLimit = this.updateLimit.bind(this)
        this.updateRate = this.updateRate.bind(this)
        this.updateGBP = this.updateGBP.bind(this)
        this.updateBTC = this.updateBTC.bind(this)
        this.updateButtonState = this.updateButtonState.bind(this)

        this.normalizeGBP = this.normalizeGBP.bind(this)
        this.normalizeBTC = this.normalizeBTC.bind(this)
        this.convertToBTC = this.convertToBTC.bind(this)
        this.convertToGBP = this.convertToGBP.bind(this)
        this.back = this.back.bind(this)
    }

    back() {
        this.setState({screen: 'first'})
    }

    normalizeGBP(value, previousValue) {
        let decimalPoint = 2
        let gbp = value.replace(/[^\d.]/g, '')
        let pos = gbp.indexOf('.')

        this.setState({active: 'gbp'})
        if(pos >= 0) {
            // prevent an extra decimal point
            if(gbp.indexOf('.',pos+1) > 0)
                gbp = gbp.substring(0,pos+1)
            // allow up to 2 dp
            if(gbp.length - pos > 2 )
                gbp = gbp.substring(0,(pos+1)+decimalPoint)
        }

        if(value !== previousValue)
        {
            if(gbp.length > 0)
                this.props.fetchBTC({'amount': Number.parseFloat(gbp)})
            else
            {
                this.props.fetchBTC({'amount': Number.parseFloat(this.state.placeholder)})
                this.props.change('btc', null)
            }
        }

        if(gbp.length > 0)
            return '£ ' + gbp
        else
            return gbp
    }

    normalizeBTC(value, previousValue) {
        let decimalPoint = 8
        let btc = value.replace(/[^\d.]/g, '')
        let pos = btc.indexOf('.')
        
        this.setState({active: 'btc'})
        if(pos >= 0) {
            // prevent an extra decimal point
            if(btc.indexOf('.',pos+1) > 0)
                btc = btc.substring(0,pos+1)
            // allow up to 2 dp
            if(btc.length - pos > 2 )
                btc = btc.substring(0,(pos+1)+decimalPoint)
        }

        if(value !== previousValue)
        {
            if(btc.length > 0)
                this.props.fetchGBP({'amount': Number.parseFloat(btc)})
            else {
                // fetch btc to reset default rate
                this.props.fetchBTC({'amount': Number.parseFloat(this.state.placeholder)})
                this.props.change('gbp', null)
                this.setState({active: 'null'})
            }
        }

        return btc
    }
      

    componentDidMount() {
        console.log(this)
        this.props.fetchLimit();
        this.props.fetchBTC({'amount': this.state.placeholder});
    }

    componentWillReceiveProps(props) {
        if(props.gbp && this.state.active === 'gbp')
            this.props.change('btc',Number.parseFloat(props.btcRate.CustomerReceiveAmount).toFixed(8))
            
        if(props.btc && this.state.active === 'btc')
            this.props.change('gbp',this.state.currencySymbol + ' ' + Number.parseFloat(props.gbpRate.CustomerSendAmount).toFixed(2))
            
        this.updateLimit(props)
        this.updateRate(props)
        this.updateButtonState(props)
    }

    onSubmit(values) {

    }

    convertToBTC(amount) {
        return amount / this.state.rate
    }

    convertToGBP(amount) {
        return amount * this.state.rate
    }

    renderField(field) {
        const { placeholder,valid , meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-warning' : '' } ${valid === true ? 'has-success' : '' }  ${valid === false ? 'has-warning' : '' }`;
        return (
            <div className={className}>
                <input placeholder={placeholder} className="form-control"
                    {...field.input}
                />
                <div className = "text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    updateBTC(props) {
        if (props.btc.CustomerRate) {
            this.setState({ btc: Number.parseFloat(props.btc.CustomerRate) })
        }
    }

    updateGBP(props) {
        if (props.gbp.CustomerRate) {
            this.setState({ gbp: Number.parseFloat(props.gbp.CustomerRate) })
        }
    }

    updateRate(props) {
        if (this.state.active === 'btc' && props.gbpRate.CustomerRate) {
            this.setState({ rate: Number.parseFloat(props.gbpRate.CustomerRate) })
        }
        else if(props.btcRate.CustomerRate) {
            this.setState({ rate: Number.parseFloat(props.btcRate.CustomerRate) })
        }
    }

    updateLimit(props) {
        
        if (props.limit.limit) {
            this.setState({ limit: props.limit.limit })
        }
    }

    updateButtonState(props) {
        if(this.state.limit < props.gbp || (!props.validWallet && props.wallet))
        {
            this.setState({buttonIsDisabled: true})
        }
        else
            this.setState({buttonIsDisabled: false})
    }

    renderButton() {
        let buttonState = ''
        let buttonClass = 'btn-success'
        if(this.state.buttonIsDisabled ) {
            buttonState = 'disabled'
            buttonClass = ''
        }
        
        return <button type="submit" className={cn('btn-block btn-lg',buttonClass,buttonState)} disabled={buttonState}>Instant exchange</button>
    }
    
    fistScreen() {
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <div className="wrapper">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <h5 className="text-center">Deposit</h5>
                            </div>
                            <div className="row">
                                <h2 className="text-center">GBP</h2>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <h5 className="text-center">Receive</h5>
                            </div>
                            <div className="row">
                                <h2 className="text-center">BTC</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Field
                                name="gbp"
                                component={this.renderField}
                                normalize={this.normalizeGBP}
                                placeholder={this.state.currencySymbol + ' ' + this.state.placeholder}
                            />
                        </div>
                        <div className="col-md-6">
                            <Field
                                name="btc"
                                component={this.renderField}
                                normalize={this.normalizeBTC}
                                placeholder={this.convertToBTC(this.state.placeholder).toFixed(8)}
                            />
                        </div>
                    </div>
                    <div className="row buffer-top">
                        <div className="col-md-12">
                            <Field
                                name="wallet"
                                touched = {this.props.validWallet}
                                component={this.renderField}
                                valid = {this.props.validWallet}
                                placeholder={'Enter wallet address...'}
                            />
                        </div>
                    </div>
                    <div className="row buffer-top">
                        <div className="col-md-6">
                            <h6 className="text-primary">Rate: {this.state.currencySymbol + this.state.rate.toFixed(2) + '/BTC'}</h6>
                        </div>
                        <div className="col-md-6">
                            <h6 className="text-right text-danger">Limit: {this.state.currencySymbol + this.state.limit}</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            { this.renderButton() }
                        </div>
                    </div>
                </div>
            </form>
        )
    }

    render() {
        if(this.state.screen === 'first') {
            return(
                <div>
                    {this.fistScreen()}
                </div>
            )
        }
        else {
            return (  
                <ReviewForm callback={() => this.back()}/>
            )
        }
    }
}


function validate(values) {
    const errors = {};
  

    // validate inputs from 'values'
    if(!values.gbp) {
      errors.gbp = "Enter gbp amount";
    }

    if (!values.btc) {
      errors.btc = "Enter btc amount";
    }
    
    if(!values.wallet) {
      errors.wallet = "Enter a valid wallet!";
    }
  
    return errors;
}

const mapStateToProps = (state) => {
    const selector = formValueSelector('CalcForm')
    let gbp = '"' + selector(state, 'gbp')
    gbp = Number.parseFloat(gbp.split(' ')[1])
    const btc = Number.parseFloat(selector(state, 'btc'))
    const wallet = selector(state, 'wallet')
    let validWallet = walletValidator.validate(wallet,'bitcoin')

    return { btcRate: state.btc, gbpRate: state.gbp, limit: state.limit, wallet, validWallet, gbp, btc };
 };

 
export default reduxForm({
    form: 'CalcForm',
    validate
})(connect(mapStateToProps,{ fetchBTC, fetchGBP, fetchLimit })(Calculator));
  