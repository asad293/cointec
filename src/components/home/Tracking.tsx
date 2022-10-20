import { Heading, Link, Stack, Text } from '@chakra-ui/react'
import TrackingStep from 'components/TrackingStep'
import SectionContainer from 'layouts/SectionContainer'
import NextLink from 'next/link'

const Tracking = () => (
  <SectionContainer>
    <Stack w='50%' spacing='5'>
      <TrackingStep
        title='You sent payment'
        rightElement={<Text color='#667075'>17:00 PM</Text>}
      />
      <TrackingStep
        title='We received payment'
        rightElement={<Text color='#667075'>17:00 PM</Text>}
      />
      <TrackingStep
        title='Coins sent'
        color='white'
        bg='linear-gradient(90deg, #0459c4 0%, #0575e6 100%)'
        rightElement={<Text color='white'>17:00 PM</Text>}
      />
    </Stack>
    <Stack w='50%' justify='center' spacing='6'>
      <Heading fontSize='2xl'>
        Receive your digital currencies in minutes, track every step.
      </Heading>
      <Text>
        We understand long winded it can be to buy some of the trending
        altcoins. That’s why we’ve created this platform to let you directly
        exchange. Add some more text here.
      </Text>
      <NextLink href='/digital-currency-list' passHref>
        <Link color='#0459c4' fontWeight='semibold' mt='12px' display='block'>
          Make your first transaction
        </Link>
      </NextLink>
    </Stack>
  </SectionContainer>
)

export default Tracking
