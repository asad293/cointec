import React from 'react'
import Link from 'next/link'

const Security = () => (
	<div className="bg-gradient bg-mid-gradient">
		<div className="home-section security-section container">
			<div className="row">
				<div className="col-12 col-lg-5 pr-lg-4 text-center text-lg-left">
					<h4 className="section-title d-none d-lg-block">
						{/* Your funds are secure throughout the transaction process. */}
						You’re in safe hands with our robust security protocols.
					</h4>
					<h4 className="section-title d-lg-none">
						Secure transaction process
					</h4>

					<p className="d-none d-lg-block">
						We understand long winded it can be to buy some of the trending
						altcoins. That’s why we’ve created this platform to let you directly
						exchange. Add some more text here.
					</p>
				</div>
				<div className="col-lg-1" />
				<div className="col-12 col-lg-6 text-center">
					<img
						className="security-lock"
						src="/static/images/digital-currencies.png"
						alt="security-lock"
					/>
					<p className="d-lg-none text-center">
						We understand long winded it can be to buy some of the trending
						altcoins. That’s why we’ve created this platform to let you directly
						exchange. Add some more text here.
					</p>
					{/* <Link href="/">
					<a className="d-block d-lg-none">More on security</a>
				</Link> */}
				</div>
			</div>
		</div>
	</div>
)

export default Security
