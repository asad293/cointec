import { Box, Heading, Image, Stack, Text } from '@chakra-ui/react'
import SectionContainer from 'layouts/SectionContainer'

const Security = () => (
  <SectionContainer bg='#f6f9fc'>
    <Stack w='50%' justify='center' spacing='6'>
      <Heading fontSize='2xl'>
        You’re in safe hands with our robust security protocols.
      </Heading>
      <Text>
        We understand long winded it can be to buy some of the trending
        altcoins. That’s why we’ve created this platform to let you directly
        exchange.
      </Text>
    </Stack>
    <Box w='50%'>
      <Image src='/secure.svg' alt='Choose from currencies' boxSize='80' />
    </Box>
  </SectionContainer>
)

export default Security
