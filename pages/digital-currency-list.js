import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Header from '../components/Header'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

class DigitalCurrencyList extends Component {
	render() {
		return (
			<div className="digital-currency-page learn-page">
				<Head>
					<title>Digital Currencies | Cointec</title>
				</Head>
				<Header background="gradient">
					<Nav />
					<hr className="hr-header" />

					<div className="container">
						<div className="hero-wrapper hero-wrapper-inner">
							<div className="row">
								<div className="col-md-12">
									<h1 className="learn-heading dc-basics-heading">
										Digital currency list
									</h1>
								</div>
							</div>
						</div>
					</div>
				</Header>

				<section className="page-content dc-glossary container">
					<div className="row mb-md-3">
						{coins.map(coin => (
							<Currency
								key={coin.name}
								name={coin.name}
								fullName={coin.fullName}
								image={coin.image}
								disabled={coin.Status === 'DISABLED'}
							/>
						))}
					</div>
					<p className="more-on-currencies">
						Want to learn about the underlying technology behind all the digital
						currencies we offer? Check out the{' '}
						<Link href="/glossary-of-tokens">
							<a>glossary of tokens.</a>
						</Link>
					</p>
				</section>

				<Footer />
			</div>
		)
	}
}

const Currency = ({ name, fullName, image }) => (
	<div className="col-12 col-md-6 col-lg-4">
		<Link href={`/exchange/${name}`} className="digital-currency">
			<img src={image} alt={name} />
			<p>{fullName}</p>
		</Link>
	</div>
)

export default DigitalCurrencyList
