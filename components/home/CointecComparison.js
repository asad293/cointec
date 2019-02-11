import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { fetchWallets } from '../../store/actions'
import _ from 'lodash'

const majorCoins = ['BTC', 'ETH', 'LTC', 'BCH', 'ETC']

class CointecComparison extends Component {
	componentWillMount() {
		this.props.fetchWallets()
	}

	render() {
		const coinName = this.props.router.query.buy
		const [coin] = this.props.assets.list.Receive.filter(
			asset =>
				_.kebabCase(asset.FullName) === coinName &&
				!majorCoins.includes(asset.Name)
		)
		// console.log(coin)
		let AssetPrimaryWallet
		if (coin && this.props.assets.wallets) {
			if (this.props.assets.wallets['Exodus'].includes(coin.Name)) {
				AssetPrimaryWallet = 'Exodus'
			} else if (this.props.assets.wallets['MEW'].includes(coin.Name)) {
				AssetPrimaryWallet = 'MyEtherWallet'
			} else if (this.props.assets.wallets['MetaMask'].includes(coin.Name)) {
				AssetPrimaryWallet = 'MetaMask'
			} else if (this.props.assets.wallets['Jaxx'].includes(coin.Name)) {
				AssetPrimaryWallet = 'Jaxx'
			}
		}
		// console.log(AssetPrimaryWallet)
		return (
			<div className="home-section comparison-section container">
				<div className="row">
					<div className="col">
						<h4 className="section-title text-left text-sm-center">
							The fastest way to buy {coin ? coin.FullName : 'digital currency'}
						</h4>
					</div>
				</div>
				<div className="d-flex justify-content-center flex-column flex-lg-row">
					<div className="with-cointec">
						<h3 className="section-subtitle">With Cointec</h3>
						<ul className="deco-primary">
							{AssetPrimaryWallet ? (
								<li>
									Create {AssetPrimaryWallet === 'Exodus' ? 'an' : 'a'}{' '}
									<a>{AssetPrimaryWallet}</a>
								</li>
							) : (
								<li>Create an external wallet</li>
							)}
							{coin ? (
								<li>Buy and send {coin.FullName} to your wallet</li>
							) : (
								<li>Send up to 30 altcoins to your wallet</li>
							)}
						</ul>
						<a>
							Get your coins in <b>5-20 minutes</b>
						</a>
					</div>
					<div className="divider d-none d-lg-block" />
					<div className="without-cointec">
						<h3 className="section-subtitle">Without Cointec</h3>
						<ul>
							<li>Buy Bitcoin from a Bitcoin broker</li>
							<li>Send Bitcoin to a digital currency exchange</li>
							{coin ? (
								<li>Trade Bitcoin for {coin.FullName} on the exchange</li>
							) : (
								<li>Trade Bitcoin for altcoin on the exchange</li>
							)}
							{AssetPrimaryWallet ? (
								<li>
									Create {AssetPrimaryWallet === 'Exodus' ? 'an' : 'a'}{' '}
									{AssetPrimaryWallet}
								</li>
							) : (
								<li>Create an external wallet for the altcoin</li>
							)}
							{coin ? (
								<li>Send {coin.FullName} to your wallet</li>
							) : (
								<li>Send altcoins to external wallet</li>
							)}
						</ul>
						<a>
							Get your coins in <b>1-2 hours</b>
						</a>
					</div>
				</div>
			</div>
		)
	}

	componentWillReceiveProps(props) {
		// console.log(props.assets.wallets)
	}
}

export default connect(
	({ assets }) => ({ assets }),
	{ fetchWallets }
)(withRouter(CointecComparison))
