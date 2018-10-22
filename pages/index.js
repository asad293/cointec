import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import _ from 'lodash'

import Header from '../components/Header'
import Nav from '../components/Nav'
import Calculator from '../components/home/Calculator'
import CurrencySlider from '../components/home/CurrencySlider'
import GetStarted from '../components/home/GetStarted'
import ExchangeRates from '../components/home/ExchangeRates'
import DigitalCurrencies from '../components/home/DigitalCurrencies'
import Tracking from '../components/home/Tracking'
import Security from '../components/home/Security'
import Subscribe from '../components/home/Subscribe'
import Footer from '../components/Footer'

import { fetchAssetsList } from '../store/actions'

class Home extends Component {
	render() {
		const coinName = this.props.router.query.buy
		const coin = this.props.assets.list.Receive.find(
			asset => _.kebabCase(asset.FullName) === coinName
		)
		const title = coin
			? `Buy ${coin.FullName} | Cointec`
			: 'Buy Digital Currency | Cointec'
		return (
			<div>
				<Head>
					<title>{title}</title>
				</Head>
				<Header background="gradient">
					<Nav />
					<hr className="hr-header" />
					<div className="container">
						<div className="hero-wrapper">
							<div className="row">
								<div className="col-12 col-lg-6 hero-text">
									<h1 className="hero-title">
										Say hello to a new
										<br />
										kind of money.
									</h1>
									<h2 className="hero-intro">
										Buy 20 digital currencies using Bank Transfer or Bitcoin.
										<br className="d-none d-md-inline" />
										Create an account and get started in minutes.
									</h2>
									<div className="my-3 my-md-0">
										<Link href="/learn">
											<a>New to digital currencies? Learn more</a>
										</Link>
									</div>
								</div>
								<div className="d-none d-lg-flex col-lg-1 col-xl-2" />
								<div
									id="main-calc"
									className="col-12 col-lg-5 col-xl-4 hero-calculator pl-xl-0 pt-lg-3">
									<div className="calculator-wrapper">
										<Calculator />
									</div>
								</div>
							</div>
						</div>
					</div>
				</Header>

				<CurrencySlider />
				<GetStarted />
				<ExchangeRates />
				<DigitalCurrencies />
				<Tracking />
				<Security />
				<Subscribe />

				<Footer />
			</div>
		)
	}
}

const mapStateToProps = ({ assets }) => ({ assets })
const mapDispatchToProps = { fetchAssetsList }
const withRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default withRedux(withRouter(Home))
