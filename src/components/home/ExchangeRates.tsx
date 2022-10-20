import { Box, Heading, Image, Stack, Text } from '@chakra-ui/react'
import SectionContainer from 'layouts/SectionContainer'

const ExchangeRates = () => (
  <SectionContainer>
    <Box w='50%'>
      <Image src='/building.svg' alt='Exchange rates' boxSize='80' />
    </Box>
    <Stack w='50%' justify='center' spacing='6'>
      <Heading fontSize='2xl'>
        Exchange rates you’ll find hard to beat for all our currency pairs.
      </Heading>
      <Text>
        We understand long winded it can be to buy some of the trending
        altcoins. That’s why we’ve created this platform to let you directly
        exchange. Add some more text here.
      </Text>
    </Stack>
  </SectionContainer>
)

export default ExchangeRates
