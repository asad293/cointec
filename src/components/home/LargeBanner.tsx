import { Box, Button, Center, Stack, Text } from '@chakra-ui/react'
import BgShapeBottom from './BgShapeBottom'
import BgShapeTop from './BgShapeTop'

const LargeBanner = () => (
  <Box bg='#0575e6' h='240px' position='relative'>
    <Center h='full'>
      <Stack spacing='6'>
        <Text color='white' fontSize='2xl' fontWeight='bold'>
          Get started today
        </Text>
        <Button colorScheme='whiteAlpha' variant='outline'>
          <Text color='white'>Create an account</Text>
        </Button>
      </Stack>
    </Center>
    <BgShapeTop />
    <BgShapeBottom />
  </Box>
)

export default LargeBanner
