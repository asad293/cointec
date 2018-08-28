import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import jwt from 'jwt-simple'
import Cookie from 'js-cookie'

import Header from '../core/Header'
import Nav from '../core/Nav'
import Calculator from '../Calculator'
import ReviewForm from '../Calculator/ReviewForm'
import CreateOrderForm from '../Calculator/CreateOrderForm'
import TransactionTracker from '../Calculator/TransactionTracker'

class Exchange extends Component {
	constructor() {
		super()
		this.state = {
			sendAmount: 0,
			receiveAmount: 0,
			sendCurrency: 'GBP',
			receiveCurrency: 'BTC',
			rate: 1200,
			wallet: null,
			ctUser: null,
			isVerified: true,
			step: 1
		}

    this.next = this.next.bind(this)
    this.back = this.back.bind(this)
		this.onConfirm = this.onConfirm.bind(this)
	}

	componentDidMount() {
		let userData = null
		let user = null
		const token = localStorage.getItem('user')
		const sessionId = Cookie.get('CT-SESSION-ID')
		try {
			userData = jwt.decode(token, process.env.APP_SECRET_KEY)
			user = userData && JSON.parse(userData)
		} catch (e) {
		} finally {
			if (user && user.CtUserId && sessionId) {
				this.setState({
					ctUser: user.CtUserId
					// isVerified: user.isVerified
				})
			} else {
				this.props.history.push('/login', {
					redirectPath: this.props.history.location.pathname
				})
			}
		}
	}

	next(state) {
		this.setState({
			...state,
			step: this.state.step + 1
		})
  }
  
  back() {
    this.setState({
      step: this.state.step - 1
    })
  }

	onConfirm({ txnID }) {
    console.log(txnID)
    this.props.history.push(`/transaction-tracker/${txnID}`)
	}

	render() {
		// console.log(this.state.ctUser)
		let frame = null
		if (this.state.step === 1)
			frame = <AmountFrame ctUser={this.state.ctUser} onConfirm={this.next} />
		else if (this.state.step === 2)
			frame = <SummaryFrame
					sendAmount={this.state.sendAmount}
					receiveAmount={this.state.receiveAmount}
					sendCurrency={this.state.sendCurrency}
					receiveCurrency={this.state.receiveCurrency}
					ctUser={this.state.ctUser}
					wallet={this.state.wallet}
					rate={this.state.rate}
					onConfirm={this.next} />
		else if (this.state.step === 3)
			frame = <PaymentFrame
					sendAmount={this.state.sendAmount}
					receiveAmount={this.state.receiveAmount}
					sendCurrency={this.state.sendCurrency}
					receiveCurrency={this.state.receiveCurrency}
					wallet={this.state.wallet}
					rate={this.state.rate}
					ctUser={this.state.ctUser}
					onConfirm={this.onConfirm} />
		// else if (this.state.step === 4)
		// 	frame = <TransactionTrackerFrame txnID={0} />
		// else if (this.state.step === 4)
		//   frame = <TransactionTrackerFrame
		//     sendAmount={this.state.sendAmount}
		//     receiveAmount={this.state.receiveAmount}
		//     sendCurrency={this.state.sendCurrency}
		//     receiveCurrency={this.state.receiveCurrency}
		//     wallet={this.state.wallet}
		//     rate={this.state.rate}
		//     ctUser={this.state.ctUser} />

		return (
			<div className="full-height" style={{ backgroundColor: '#f4f7fa' }}>
				<Header background="solid">
					<Nav heading={this.state.step === 1 ? 'Buy digital currency' : this.state.step === 2 ? 'Order summary' : 'Make Bank Transfer'} />
				</Header>

				<div className="container">
					<div className="row mt-4">
						<div className="col-12 col-lg-7 col-xl-6 text-center">{frame}</div>
						<div className="info-column col-12 col-lg-4">
							{this.state.step === 1 ? <div>
								<h6>Transaction limit</h6>
								<div className="limit-amount">0 GBP</div>
							</div>: ''}
              {this.state.step === 2 ? (<div>
                <button className="btn-back" onClick={() => this.back()}>
                  <i className="far fa-angle-left"></i> <span>Back to currency selection</span>
                </button>
              </div>) : ''}
							{this.state.isVerified ? (
								<div>
									<hr />
									<h6>Add a bank account</h6>
									<p>
										You can add the bank account you wish to make a bank
										transfer from. This will speed up GBP transactions.
									</p>
									<a
										href="#"
										className="info-link"
										data-toggle="modal"
										data-target="#add-bank-account-modal">
										Add bank account
									</a>
								</div>
							) : (
								<div>
									<hr />
									<h6>You are not verified</h6>
									<p>
										You must be verified to increase your limit and make GBP
										transactions.
									</p>
									<Link to="/" className="info-link">
										Complete verification
									</Link>
								</div>
							)}
							<div>
								<hr />
								<h6 className="mb-4">Need help?</h6>
								<Link className="contact-us-link" to="/">
									Contact us
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* <div className="bottom-bar">
					<div className="container">
						<div className="row">
							<div className="col-6">@cointec ltd 2018</div>
							<div className="col-6 text-nowrap">
								<ul>
									<li>
										<Link to="/privacy">Privacy Policy</Link>
									</li>
									<li>
										<Link to="/terms">Terms and conditions</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div> */}
			</div>
		)
	}
}

const AmountFrame = props => (
	<div>
		{/* <h4 className="mt-4 mb-3 text-nowrap">Buy digital currency in minutes.</h4> */}
		<Calculator {...props} />
		<p className="text-left mt-3">
			By continuing you accept our <Link to="/terms">Terms of Use</Link>
		</p>
	</div>
)

const SummaryFrame = props => (
	<div>
		{/* <h4 className="mt-4 mb-3 text-nowrap">Order Summary</h4> */}
		<ReviewForm {...props} />
	</div>
)

const PaymentFrame = props => (
	<div>
		{/* <h4 className="mt-4 mb-3 text-nowrap">
      {`${props.sendCurrency === 'GBP' ? 'Bank Tranfer' : 'Wallet transfer'}`}
    </h4> */}
		<CreateOrderForm {...props} />
	</div>
)

const TransactionTrackerFrame = props => (
	<div>
		{/* <h4 className="mt-4 mb-3 text-nowrap">Transaction tracker</h4> */}
		<TransactionTracker {...props} />
	</div>
)

export default withRouter(Exchange)
