import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { fetchVerificationStatus } from '../store/actions'

import Header from '../components/Header'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

class WalletSelector extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount() {}

	render() {
		return (
			<div className="wallet-selector-page">
				<Head>
					<title>Cryptocurrency wallet selector | Cointec</title>
				</Head>

				<Header background="gradient">
					<Nav />
					<hr className="hr-header" />
					<div className="container">
						<div className="hero-wrapper hero-wrapper-inner">
							<div className="row">
								<div className="col-md-12">
									<h1 className="page-heading">
										Cryptocurrency wallet selector
									</h1>
									<h6 className="page-sub-heading">
										Cryptocurrency wallet selector
									</h6>
								</div>
							</div>
						</div>
					</div>
				</Header>

				<section className="page-content dc-glossary container">
					<div className="row">
						<div className="col">
							<div className="content-wrapper p-0 h-auto position-relative" />
						</div>
					</div>
				</section>

				<style jsx global>{`
					html body {
						background: none;
						box-shadow: none;
					}
				`}</style>
			</div>
		)
	}

	componentWillReceiveProps(props) {}
}

export default connect(
	({ auth, verification, accounts, globals }) => ({
		auth,
		verification,
		accounts,
		globals
	}),
	{
		fetchVerificationStatus
	}
)(withRouter(WalletSelector))
