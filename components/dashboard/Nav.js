import React from 'react'
import Link from 'next/link'
import NavLink from '../NavLink'

const Nav = () => (
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
						<NavLink href="/dashboard" className="dash-nav-link">
							Dashboard
						</NavLink>
					</li>
					<li className="nav-item mr-md-auto">
						<NavLink href="/transactions" className="dash-nav-link">
							Transactions
						</NavLink>
					</li>
					<li className="nav-item">
						<Link href="/exchange">
							<a className="nav-link">Exchange</a>
						</Link>
					</li>
					<li className="nav-item">
						<div className="btn-group dashboard-menu">
							<button
								type="button"
								className="btn btn-dropdown"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false">
								<img src="/static/images/user-circle.svg" alt="user-menu" />
								<i className="far fa-angle-down" />
							</button>
							<div className="dropdown-menu dropdown-menu-right">
								<button className="dropdown-item" type="button">
									<i className="far fa-cog" />
									Account settings
								</button>
								<button className="dropdown-item" type="button">
									<i className="far fa-cog" />
									Account settings
								</button>
								<button className="dropdown-item" type="button">
									<i className="far fa-cog" />
									Account settings
								</button>
								<button className="dropdown-item" type="button">
									<i className="far fa-cog" />
									Account settings
								</button>
								<button className="dropdown-item" type="button">
									<i className="far fa-cog" />
									Sign out
								</button>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	</div>
)

export default Nav
