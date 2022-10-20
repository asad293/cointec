import { Box, Heading, Image, Link, Stack, Text } from '@chakra-ui/react'
import SectionContainer from 'layouts/SectionContainer'
import NextLink from 'next/link'

const DigitalCurrencies = () => (
  <SectionContainer bg='#f6f9fc'>
    <Stack w='50%' justify='center' spacing='6'>
      <Heading fontSize='2xl'>
        Choose from 30 of the most popular digital currency assets.
      </Heading>
      <Text>
        We understand long winded it can be to buy some of the trending
        altcoins. That’s why we’ve created this platform to let you directly
        exchange. Add some more text here.
      </Text>
      <NextLink href='/digital-currency-list' passHref>
        <Link color='#0459c4' fontWeight='semibold' mt='12px' display='block'>
          View all our digital currencies
        </Link>
      </NextLink>
    </Stack>
    <Box w='50%'>
      <Image src='/choose.svg' alt='Choose from currencies' boxSize='80' />
    </Box>
  </SectionContainer>
)

export default DigitalCurrencies
