import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Header from '../components/Header'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

class Learn extends Component {
	render() {
		return (
			<div className="learn-page">
				<Head>
					<title>Learn | Cointec</title>
				</Head>
				<Header background="gradient" deco={false}>
					<Nav />
					<hr className="hr-header m-0" />

					{/* Hero Section */}
					<div className="container">
						<div className="hero-wrapper hero-wrapper-inner learn">
							<div className="row">
								<div className="col-md-12">
									<h1 className="learn-heading d-none d-md-block">
										Learn about digital currency
									</h1>
									<h1 className="learn-heading d-block d-md-none">
										Learning portal
									</h1>
									<p className="d-none d-md-block">
										Our learning portal brings you up to speed with crypto.
									</p>
									<p className="d-block d-md-none">
										Digital currency made simple
									</p>
									{/* <p>
										Buy 20 digital currencies using Bank
										<br className="d-block d-md-none" /> Transfer or Bitcoin.
										<br className="d-none d-md-block" />
										<span className="d-none d-md-block">
											Create an account and get started in minutes.
										</span>
									</p> */}
								</div>
							</div>
						</div>
					</div>
					{/* Hero Section End */}
				</Header>

				<section className="page-content container">
					<div className="row">
						<div className="col-sm-12 col-md-6 col-lg-4">
							<Card
								title="Cryptocurrency basics"
								description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
								image="/static/images/lrn-plc-hd.svg"
								linkText="Create your first order"
								href="/digital-currency-basics"
							/>
						</div>

						<div className="col-sm-12 col-md-6 col-lg-4">
							<Card
								title="Storing cryptocurrency"
								description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
								image="/static/images/lrn-plc-hd.svg"
								linkText="Create your first order"
								href="/digital-wallets"
							/>
						</div>

						<div className="col-sm-12 col-md-6 col-lg-4">
							<Card
								title="Blockchain technology"
								description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
								image="/static/images/lrn-plc-hd.svg"
								linkText="Create your first order"
								href="/blockchain"
							/>
						</div>

						<div className="col-sm-12 col-md-6 col-lg-4">
							<Card
								title="Glossary of terms"
								description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
								image="/static/images/lrn-plc-hd.svg"
								linkText="Create your first order"
								href="/glossary-of-terms"
							/>
						</div>

						<div className="col-sm-12 col-md-6 col-lg-4">
							<Card
								title="Glossary of tokens"
								description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
								image="/static/images/lrn-plc-hd.svg"
								linkText="Create your first order"
								href="/glossary-of-tokens"
							/>
						</div>

						<div className="col-sm-12 col-md-6 col-lg-4">
							<Card
								title="FAQ’s and support"
								description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
								image="/static/images/lrn-plc-hd.svg"
								linkText="Create your first order"
								href="/"
								noPrefix={true}
							/>
						</div>
					</div>
				</section>

				<Footer backgroundColor="#fff" />

				<style jsx global>{`
					html body {
						background-color: #f7f9fa;
					}
				`}</style>
			</div>
		)
	}
}

const Card = ({ title, description, image, linkText, href, noPrefix }) => (
	<div className="learn-card text-center">
		<img src={image} alt={title} />
		<h5>{title}</h5>
		<p>{description}</p>
		<Link href={href} as={noPrefix ? undefined : `/learn${href}`}>
			<a>{linkText}</a>
		</Link>
	</div>
)

export default Learn
