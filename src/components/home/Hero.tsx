import { Container, Flex } from '@chakra-ui/react'
import Calculator from './Calculator'
import TitleSection from './TitleSection'

const Hero = () => (
  <Container maxW='container.lg' position='relative' pt='72px'>
    <Flex justify='space-between' align='center'>
      <TitleSection />
      <Calculator />
    </Flex>
  </Container>
)

export default Hero
