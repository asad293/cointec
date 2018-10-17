import React from 'react'
import NavLink from '../NavLink'

const Sidebar = () => (
	<aside className="topics">
		<h6 className="heading-topics">RELAVANT</h6>
		<ul>
			<li>
				<NavLink href="/privacy-policy">Privacy policy</NavLink>
			</li>
			<li>
				<NavLink href="/terms">Terms and conditions</NavLink>
			</li>
			<li>
				<NavLink href="/security">Security</NavLink>
			</li>
		</ul>
	</aside>
)

export default Sidebar
