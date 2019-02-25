import React from 'react'
import Link from 'next/link'

const DigitalCurrencies = () => (
	<div className="bg-gradient bg-mid-gradient">
		<div className="home-section container digital-currencies-section">
			<div className="row">
				<div className="col-12 col-lg-5 text-center text-lg-left">
					<h4 className="section-title d-none d-lg-block">
						{/* Choose from 20 of the most popular digital currencies. */}
						Choose from 30 of the most popular digital currency assets.
					</h4>
					<h4 className="section-title d-lg-none">Choose from 30 currencies</h4>

					<p className="d-none d-lg-block">
						We understand long winded it can be to buy some of the trending
						altcoins. That’s why we’ve created this platform to let you directly
						exchange. Add some more text here.
					</p>

					<Link href="/digital-currency-list">
						<a className="d-none d-lg-inline-block">
							View all our digital currencies
						</a>
					</Link>
				</div>
				<div className="col-lg-1" />
				<div className="col-12 col-lg-6 text-center mt-4 mt-lg-0">
					{/* <img
						className="digital-currencies-art"
						src="/static/images/digital-currencies.png"
					/> */}
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
					<p className="d-lg-none text-center">
						We understand long winded it can be to buy some of the trending
						altcoins. That’s why we’ve created this platform to let you directly
						exchange. Add some more text here.
					</p>
					<Link href="/digital-currency-list">
						<a className="d-lg-none">View all our digital currencies</a>
					</Link>
				</div>
			</div>
		</div>
	</div>
)

export default DigitalCurrencies
