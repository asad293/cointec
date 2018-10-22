import React from 'react'
import Link from 'next/link'

const Security = () => (
	<div className="home-section security-section container">
		<div className="row">
			<div className="col-12 col-md-6 pr-md-4 text-center text-md-left">
				<h4 className="section-title d-none d-md-block">
					Your funds are secure throughout the transaction process.
				</h4>
				<h4 className="section-title d-md-none">Secure transaction process</h4>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris.
				</p>

				<Link href="/">
					<a className="d-none d-md-inline">More on security</a>
				</Link>
			</div>
			<div className="col-12 col-md-6 text-center mt-4 mt-md-0">
				<img
					className="security-lock"
					src="/static/images/security-lock.svg"
					alt="security-lock"
				/>
				<Link href="/">
					<a className="d-block d-md-none">More on security</a>
				</Link>
			</div>
		</div>
	</div>
)

export default Security
