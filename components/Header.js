import React from 'react'

const Header = ({ background, children }) => (
	<header
		className={
			background === 'gradient' ? 'bg-gradient bg-primary-gradient' : 'bg-solid'
		}>
		{children}
	</header>
)

export default Header
