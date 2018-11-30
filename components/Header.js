import React from 'react'

const Header = ({ background, children, style }) => (
	<header
		className={
			background === 'gradient' ? 'bg-gradient bg-primary-gradient' : 'bg-solid'
		}
		style={style}>
		{children}
	</header>
)

export default Header
