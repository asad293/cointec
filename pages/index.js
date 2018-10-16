import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import '../styles/app.scss'

import Header from '../components/Header'
import Nav from '../components/Nav'
import Calculator from '../components/Landing/Calculator'
import CurrencySlider from '../components/Landing/CurrencySlider'
import GetStarted from '../components/Landing/GetStarted'
import ExchangeRates from '../components/Landing/ExchangeRates'
import DigitalCurrencies from '../components/Landing/DigitalCurrencies'
import Tracking from '../components/Landing/Tracking'
import Security from '../components/Landing/Security'
import Subscribe from '../components/Landing/Subscribe'
import Footer from '../components/Footer'

const Home = () => (
	<div>
		<Head>
			<title>Buy Digital Currency | Cointec</title>
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

export default Home
