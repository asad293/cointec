import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { fetchVerificationStatus } from '../store/actions'

import Header from '../components/Header'
import Nav from '../components/Nav'
import AddWallet from '../components/wallet-selector/AddWallet'
import Footer from '../components/Footer'

class WalletSelector extends Component {
	constructor(props) {
		super(props)
		this.state = {
			addWalletModal: false,
			wallets: [
				{
					logo: '/static/images/meta-mask.svg',
					prop1: '2 million downloads',
					prop2: 'Created in 2015',
					prop3: 'Store 20+ coins'
				},
				{
					logo: '/static/images/exodus.png',
					prop1: '2 million downloads',
					prop2: 'Created in 2015',
					prop3: 'Store 20+ coins'
				},
				{
					logo: '/static/images/my-ether-wallet.png',
					prop1: '2 million downloads',
					prop2: 'Created in 2015',
					prop3: 'Store 20+ coins'
				},
				{
					logo: '/static/images/jaxx.png',
					prop1: '2 million downloads',
					prop2: 'Created in 2015',
					prop3: 'Store 20+ coins'
				}
			]
		}
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
									<h1 className="page-heading d-md-block d-none">
										Cryptocurrency wallet selector
									</h1>
									<h1 className="page-heading d-block	d-md-none">
										Choosing a wallet
									</h1>
									<h6 className="page-sub-heading d-none d-sm-block">
										Let us help you choose a suitable wallet
									</h6>
									<div className="search-bar">
										<input type="text" />
										<i className="far fa-search" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</Header>

				<section className="page-content dc-glossary container">
					<div className="row">
						<div className="col">
							<div className="content-wrapper wallet-list p-0 h-auto position-relative">
								<div className="row">
									{this.state.wallets.map((wallet, index) => (
										<div key={index} className="col-lg-4 col-md-6">
											<WalletSelection
												logo={wallet.logo}
												prop1={wallet.prop1}
												prop2={wallet.prop2}
												prop3={wallet.prop3}
												onCreate={() => this.setState({ addWalletModal: true })}
											/>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				<Footer backgroundColor="#fff" />

				{this.state.addWalletModal && (
					<AddWallet
						onClose={() =>
							this.setState({
								addWalletModal: false
							})
						}
					/>
				)}

				<style jsx global>{`
					html {
						background: #f7f9fa;
					}
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

const WalletSelection = ({ logo, prop1, prop2, prop3, onCreate }) => (
	<div className="wallet-selection">
		<div className="header">
			<img src={logo} alt="Meta Mask" />
		</div>
		<div className="wallet-body">
			<div className="wallet-prop">
				<i className="far fa-arrow-to-bottom fa-lg" />
				{prop1}
			</div>
			<hr className="m-0" />
			<div className="wallet-prop">
				<i className="far fa-arrow-to-bottom fa-lg" />
				{prop2}
			</div>
			<hr className="m-0" />
			<div className="wallet-prop">
				<i className="far fa-arrow-to-bottom fa-lg" />
				{prop3}
				<i className="fas fa-eye" />
			</div>
		</div>
		<a className="btn-create" onClick={onCreate}>
			Create wallet
		</a>
	</div>
)

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
