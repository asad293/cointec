import { Box, Heading, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

const TitleSection = () => {
  return (
    <Box>
      <Heading fontSize='5xl' lineHeight='3.7rem' color='white'>
        Say hello to a new
        <br />
        kind of money.
      </Heading>

      <Box color='text.light' lineHeight='28px' fontWeight='semibold' mt='18px'>
        <Text>Buy 30 digital currencies using Bank Transfer or Bitcoin.</Text>
        <Text>Create an account and start buying digital currency today.</Text>
      </Box>

      <NextLink href='/learn' passHref>
        <Link color='white' fontWeight='bold' mt='12px' display='block'>
          New to digital currencies? Learn more
        </Link>
      </NextLink>
    </Box>
  )
}

export default TitleSection
