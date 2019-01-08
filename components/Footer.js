import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const Footer = props => (
	<footer
		className="pt-5"
		style={{
			backgroundColor: props.backgroundColor,
			borderTop: '1px solid #D5DCE0'
		}}>
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-3 col-lg-4 text-center text-md-left">
					<img
						src="/static/images/footer-logo.svg"
						alt="Cointec Logo"
						className="mb-1"
					/>
					<div className="col-12 mt-3 pr-0 d-flex flex-row justify-content-center justify-content-md-start pl-4 pl-md-0">
						<Link href="https://twitter.com/cointec">
							<a>
								<i className="fab fa-twitter mr-4" />
							</a>
						</Link>
						<Link href="https://www.instagram.com/cointec">
							<a>
								<i className="fab fa-instagram mr-4" />
							</a>
						</Link>
						<Link href="https://medium.com/@Cointec">
							<a>
								<i className="fab fa-medium mr-4" />
							</a>
						</Link>
					</div>
				</div>

				<div className="col-12 col-md-9 col-lg-6">
					<div className="row text-center text-md-left mt-2 mb-3">
						<div className="col-12 col-md-4 mt-5 mt-md-0">
							<h5 className="menu-heading">Information</h5>
							<Link href="/">
								<a>Home</a>
							</Link>
							<Link href="/learn">
								<a>Learn</a>
							</Link>
							<Link href="/">
								<a>Charts</a>
							</Link>
						</div>

						<div className="col-12 col-md-4 mt-5 mt-md-0">
							<h5 className="menu-heading">Help</h5>
							<Link href="https://intercom.help/cointec-test">
								<a>Support</a>
							</Link>
							<Link href="#livechat">
								<a>Live chat</a>
							</Link>
						</div>

						<div className="col-12 col-md-4 mt-5 mt-md-0">
							<h5 className="menu-heading">Legal</h5>
							<Link href="/privacy-policy">
								<a>Privacy Policy</a>
							</Link>
							<Link href="/terms">
								<a>Terms of Service</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<hr />
		<div className="container text-center text-md-left">
			<div className="row">
				<div className="col-12 col-md-4">
					<p className="copyright">&copy; Cointec ltd 2018</p>
				</div>
				<div className="col-12 col-md-8">
					<p className="reg-info px-2 px-sm-5 px-md-0">
						Cointec Ltd is a company registered in England and Wales (No.
						08804411)
					</p>
				</div>
			</div>
		</div>
	</footer>
)

Footer.propTypes = {
	backgroundColor: PropTypes.string
}

Footer.defaultProps = {
	backgroundColor: '#F7F9FA'
}

export default Footer
