import React, { Component } from 'react'
import Link from 'next/link'
import Cookie from 'js-cookie'

class Nav extends Component {
	constructor() {
		super()
		this.state = {}
		this.signOut = this.signOut.bind(this)
	}

	componentDidMount() {
		const userData = localStorage.getItem('user')
		const user = userData && JSON.parse(userData)
		const sessionId = Cookie.get('CT-SESSION-ID')
		if (user && user.CtUserId && sessionId) {
			this.setState({ ctUser: user.CtUserId, email: user.email })
		}
	}

	signOut() {
		localStorage.removeItem('user')
		this.setState({
			ctUser: null,
			email: null
		})
	}

	render() {
		return (
			<div className="container">
				<nav className="navbar navbar-custom navbar-expand-lg navbar-dark px-0">
					<Link href="/">
						<a className="navbar-brand">
							<img
								src="/static/images/logo-white.svg"
								className="img-fluid mx-auto d-block"
								alt="Logo"
							/>
						</a>
					</Link>

					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<img
							className="currency-symbol"
							src="/static/images/menu-icon.svg"
							alt="Menu Icon"
						/>
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav w-100 justify-content-end align-items-lg-center">
							<li className="nav-item">
								<Link href="/exchange">
									<a className="nav-link">Buy</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href="/learn" prefetch>
									<a className="nav-link">Learn</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href="https://intercom.help/cointec-test">
									<a className="nav-link" target="_blank">
										Support
									</a>
								</Link>
							</li>
							{!this.state.ctUser && (
								<li className="nav-item">
									<Link href="/login" prefetch>
										<a className="nav-link">Log in</a>
									</Link>
								</li>
							)}
							{this.state.ctUser && (
								<li className="nav-item">
									<a
										className="nav-link"
										style={{ cursor: 'pointer' }}
										onClick={this.signOut}>
										Sign Out
									</a>
								</li>
							)}
							{!this.state.ctUser && (
								<li className="nav-item">
									<Link href="/signup" prefetch>
										<a className="nav-link btn btn-outline-success sign-up-btn">
											Sign up
										</a>
									</Link>
								</li>
							)}
							{this.state.ctUser && (
								<li className="nav-item">
									<Link href="/dashboard" prefetch>
										<a className="nav-link btn btn-outline-success sign-up-btn">
											Dashboard
										</a>
									</Link>
								</li>
							)}
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}

export default Nav
