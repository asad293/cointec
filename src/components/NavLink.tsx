import { Link, LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  href: string
} & LinkProps

const NavLink = ({ children, href, ...props }: Props) => (
  <NextLink href={href} passHref>
    <Link variant='header' {...props}>
      {children}
    </Link>
  </NextLink>
)

export default NavLink
