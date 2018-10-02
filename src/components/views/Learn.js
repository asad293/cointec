import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ReactTitle } from 'react-meta-tags'

import Header from '../core/Header'
import Navbar from '../core/Navbar'
import Footer from '../core/Footer'

class Learn extends Component {
	render() {
		return (
			<div className="learn-page">
				<ReactTitle title="Learn | Cointec" />
				<Header background="gradient">
					<Navbar />
					<hr className="hr-header m-0" />

					{/* Hero Section */}
					<div className="container">
						<div className="hero-wrapper hero-wrapper-inner">
							<div className="row">
								<div className="col-md-12">
									<h1 className="learn-heading d-none d-md-block">Learn about digital currency</h1>
									<h1 className="learn-heading d-block d-md-none">Learning portal</h1>
									<p>
										Buy 20 digital currencies using Bank<br className="d-block d-md-none" /> Transfer or Bitcoin.<br className="d-none d-md-block" />
										<span className="d-none d-md-block">Create an account and get started in minutes.</span>
									</p>
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
								title="Digital currency basics"
								description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
								image="/img/plc-hd.svg"
								to='/digital-currency-basics' />
						</div>
						
						<div className="col-sm-12 col-md-6 col-lg-4">
							<Card
								title="Digital wallets"
								description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
								image="/img/plc-hd.svg"
								to='/digital-wallets' />
						</div>

						<div className="col-sm-12 col-md-6 col-lg-4">
							<Card
								title="Blockchain"
								description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
								image="/img/plc-hd.svg"
								to='/blockchain' />
						</div>

						<div className="col-sm-12 col-md-6 col-lg-4">
							<Card
								title="Glossary of terms"
								description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
								image="/img/plc-hd.svg"
								to='/glossary-of-terms' />
						</div>

						<div className="col-sm-12 col-md-6 col-lg-4">
							<Card
								title="Glossary of tokens"
								description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
								image="/img/plc-hd.svg"
								to='/glossary-of-tokens' />
						</div>

						<div className="col-sm-12 col-md-6 col-lg-4">
							<Card
								title="FAQ’s and support"
								description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
								image="/img/plc-hd.svg"
								to='/' />
						</div>
					</div>
				</section>

				<Footer />
			</div>
		)
	}
}

const Card = ({ title, description, image, to }) => (
  <Link to={to} className="learn-card text-center">
    <img src={image} alt={title} />
    <h5>{title}</h5>
    <p>{description}</p>
  </Link>
)

export default Learn
