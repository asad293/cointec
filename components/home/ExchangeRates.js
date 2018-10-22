import React, { Component } from 'react'
import Link from 'next/link'
import Chart from './Chart'

class ExchangeRates extends Component {
	render() {
		return (
			<div className="bg-gradient bg-mid-gradient">
				<div className="home-section chart-section container px-4">
					<div className="row flex-column-reverse flex-md-row">
						<div className="col-12 col-md-6 pr-md-0 pr-lg-5 mt-4 mt-md-0">
							<Chart />
						</div>
						<div className="col-12 col-md-6 px-4 px-md-5 text-center text-md-left">
							<h4 className="section-title mt-5 d-none d-md-block">
								Receive your digital currencies in minutes, track every step.
							</h4>
							<h4 className="section-title d-md-none">
								Gauranteed exchange rates for all our currency pairs.
							</h4>

							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris.
							</p>

							<Link href="/">
								<a className="d-none d-md-inline">
									View all exchange rate charts
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ExchangeRates
