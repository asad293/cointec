import { Button, HStack, Text } from '@chakra-ui/react'
import NavLink from './NavLink'

const Nav = () => {
  return (
    <HStack as='nav' spacing='30px'>
      <NavLink href='/buy'>Buy</NavLink>
      <NavLink href='/learn'>Learn</NavLink>
      <NavLink href='/support'>Support</NavLink>
      <NavLink href='/login'>Log in</NavLink>
      <Button colorScheme='whiteAlpha' variant='outline'>
        <Text color='white'>Sign up</Text>
      </Button>
    </HStack>
  )
}

export default Nav
