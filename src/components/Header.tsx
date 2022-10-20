import { Container, Flex, Image } from '@chakra-ui/react'
import Nav from './Nav'

const Header = () => (
  <Container as='header' maxW='container.lg' h='60px'>
    <Flex justify='space-between' align='center' h='full'>
      <Image src='logo-white.svg' alt='cointec' w='104px' />
      <Nav />
    </Flex>
  </Container>
)

export default Header
