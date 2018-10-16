import React from 'react'
import Link from 'next/link'

const DigitalCurrencies = () => (
	<div className="home-section container">
		<div className="row">
			<div className="col-12 col-md-6 pr-4 text-center text-md-left">
				<h4 className="section-title d-none d-md-block">
					Choose from 20 of the most popular digital currencies.
				</h4>
				<h4 className="section-title d-md-none">
					Wide selection of currencies
				</h4>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris.
				</p>

				<Link href="/digital-currency-list">
					<a className="d-none d-md-inline">See all digital currencies</a>
				</Link>
			</div>
			<div className="col-12 col-md-6 text-center mt-4 mt-md-0">
				<div className="currencies-group">
					<img src="/static/images/cg-image-1.svg" />
					<img src="/static/images/cg-image-2.svg" />
					<img src="/static/images/cg-image-3.svg" />
					<img src="/static/images/cg-image-4.svg" />
					<img src="/static/images/cg-image-5.svg" />
					<img src="/static/images/cg-image-1.svg" />
					<img src="/static/images/cg-image-6.svg" />
					<img src="/static/images/cg-image-7.svg" />
				</div>
				<Link href="/digital-currency-list">
					<a className="d-md-none">See all digital currencies</a>
				</Link>
			</div>
		</div>
	</div>
)

export default DigitalCurrencies
