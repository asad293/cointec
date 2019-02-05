import React, { Component } from 'react'

class CointecComparison extends Component {
	render() {
		return (
			<div className="home-section comparison-section container">
				<div className="row">
					<div className="col">
						<h4 className="section-title text-left text-sm-center">
							The fastest way to buy digital currency
						</h4>
					</div>
				</div>
				<div className="d-flex justify-content-center flex-column flex-lg-row">
					<div className="with-cointec">
						<h3 className="section-subtitle">With Cointec</h3>
						<ul className="deco-primary">
							<li>Create an external wallet</li>
							<li>Send up to 30 altcoins to your wallet</li>
						</ul>
						<a>
							Get your coins in <b>5-20 minutes</b>
						</a>
					</div>
					<div class="divider d-none d-lg-block" />
					<div className="without-cointec">
						<h3 className="section-subtitle">Without Cointec</h3>
						<ul>
							<li>Buy Bitcoin from a Bitcoin broker</li>
							<li>Send Bitcoin to a digital currency exchange</li>
							<li>Trade Bitcoin for altcoin on the exchange</li>
							<li>Create an external wallet for the altcoin</li>
							<li>Send altcoins to external wallet</li>
						</ul>
						<a>
							Get your coins in <b>1-2 hours</b>
						</a>
					</div>
				</div>
			</div>
		)
	}
}

export default CointecComparison
