import React, { Component } from 'react'
import { fetchAssetsList, fetchQuote } from '../../store/actions'
import { connect } from 'react-redux'

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
			// coins: props.assets.Receive,
			// currencies: props.assets.Send,
			coinSearch: '',
			coinSelected: false,
			// currencySelected: props.assets.Send[0],
			toggleCurrency: false,
			toggleCoin: false,
			search: false,
			active: false
		}
	}

	render() {
		return (
			<div>
				<form>
					<div className="calc-input-wrapper">
						{/* <label
							className={cn(
								'field-label m-0',
								(sendAmount || receiveAmount) && Message ? 'invalid' : null
							)}>
							{(sendAmount || receiveAmount) && Message ? Message : 'You send'}
						</label> */}
					</div>
				</form>
			</div>
		)
	}

	componentDidMount() {
		console.log('object')
		this.props.fetchAssetsList()
	}

	componentWillReceiveProps(props) {
		console.log(props)
	}
}

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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Calculator)
