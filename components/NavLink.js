import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import cn from 'classnames'

const NavLink = withRouter(({ href, children, router, ...props }) => (
	<Link href={href} {...props} prefetch>
		<a className={cn({ active: router.pathname === href })}>{children}</a>
	</Link>
))

export default NavLink
