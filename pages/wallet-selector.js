import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { fetchVerificationStatus, fetchWallets } from '../store/actions'

import Header from '../components/Header'
import Nav from '../components/Nav'
import AddWallet from '../components/wallet-selector/AddWallet'
import Footer from '../components/Footer'

const walletLogo = {
	MEW: '/static/images/my-ether-wallet.png',
	MetaMask: '/static/images/meta-mask.svg',
	Exodus: '/static/images/exodus.png',
	Jaxx: '/static/images/jaxx.png'
}

const walletLinks = {
	MEW: 'https://www.myetherwallet.com/getting-started',
	MetaMask: 'https://metamask.io/',
	Exodus: 'https://www.exodus.io/download/',
	Jaxx: 'https://jaxx.io/downloads.html'
}

class WalletSelector extends Component {
	constructor(props) {
		super(props)
		this.state = {
			addWalletModal: false,
			showDropdown: false,
			filteredAssets: [],
			searchWallet: '',
			selectedAsset: null,
			selectedWallet: null
		}
		this.handleInput = this.handleInput.bind(this)
		this.assetSelected = this.assetSelected.bind(this)
	}

	componentDidMount() {
		this.props.fetchWallets()
		addEventListener('click', this.onClickOutside)
	}

	componentWillUnmount() {
		removeEventListener('click', this.onClickOutside)
	}

	onClickOutside = event => {
		if (this.state.filteredAssets.length > 0) {
			const composedPath = el => {
				var path = []
				while (el) {
					path.push(el)
					if (el.tagName === 'HTML') {
						path.push(document)
						path.push(window)
						return path
					}
					el = el.parentElement
				}
			}
			let path = event.path || (event.composedPath && event.composedPath())
			if (!path) {
				path = composedPath(event.target)
			}
			const select =
				path &&
				path.find(
					node =>
						node.className && node.className.includes('wallet-dropdown-menu')
				)
			if (!select) {
				this.setState({
					showDropdown: false
				})
			}
		}
	}

	handleInput({ target }) {
		const word = target.value.toLowerCase().trim()
		this.setState({
			searchWallet: target.value,
			showDropdown: true,
			filteredAssets: this.props.assets.list.Receive
				? this.props.assets.list.Receive.filter(
						asset =>
							asset.Name.toLowerCase().startsWith(word) ||
							asset.FullName.toLowerCase().startsWith(word)
				  )
				: []
		})
	}

	assetSelected(asset) {
		this.setState({
			showDropdown: false,
			selectedAsset: asset,
			searchWallet: ''
		})
	}

	render() {
		const { wallets } = this.props.assets
		const displayWallets =
			wallets &&
			Object.keys(wallets)
				.map(key => {
					return {
						name: key,
						assets: wallets[key],
						logo: walletLogo[key]
					}
				})
				.filter(wallet =>
					this.state.selectedAsset
						? wallet.assets.includes(this.state.selectedAsset.Name)
						: true
				)

		return (
			<div className="wallet-selector-page">
				<Head>
					<title>Cryptocurrency wallet selector | Cointec</title>
				</Head>

				<Header background="gradient" style={{ overflow: 'initial' }}>
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
										<input
											type="text"
											placeholder="Search digital currency"
											value={this.state.searchWallet}
											onChange={this.handleInput}
										/>
										<i className="far fa-search" />
									</div>

									<div>
										{this.state.showDropdown &&
											this.state.filteredAssets &&
											this.state.filteredAssets.length > 0 && (
												<div className="wallet-dropdown-menu dropdown-menu show">
													{this.state.filteredAssets.map((asset, index) => (
														<div
															className="dropdown-item"
															key={index}
															onClick={() => this.assetSelected(asset)}>
															<img src={asset.Image} alt={asset.Name} />
															<span className="full-name">
																{asset.FullName}
															</span>
															<span className="name">{asset.Name}</span>
														</div>
													))}
												</div>
											)}
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
									{displayWallets &&
										displayWallets.map((wallet, index) => (
											<div key={index} className="col-lg-4 col-md-6">
												<WalletSelection
													name={wallet.name}
													logo={wallet.logo}
													prop1={'2 million downloads'}
													prop2={'Created in 2015'}
													prop3={'Store 20+ coins'}
													onCreate={() =>
														this.setState({
															addWalletModal: true,
															selectedWallet: wallet
														})
													}
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
						wallet={this.state.selectedWallet}
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

	componentWillReceiveProps(props) {
		// console.log(props.assets)
	}
}

const WalletSelection = ({ name, logo, prop1, prop2, prop3, onCreate }) => (
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
				<a onClick={onCreate}>
					<i className="fas fa-eye" />
				</a>
			</div>
		</div>
		<a className="btn-create" target="_blank" href={walletLinks[name]}>
			Create wallet
		</a>
	</div>
)

export default connect(
	({ auth, verification, accounts, globals, assets }) => ({
		auth,
		verification,
		accounts,
		globals,
		assets
	}),
	{
		fetchVerificationStatus,
		fetchWallets
	}
)(withRouter(WalletSelector))
