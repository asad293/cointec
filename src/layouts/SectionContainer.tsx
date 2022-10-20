import { Box, BoxProps, Container, HStack } from '@chakra-ui/react'

const SectionContainer = ({ children, ...props }: BoxProps) => {
  return (
    <Box py='80px' {...props}>
      <Container maxW='container.lg'>
        <HStack spacing='32'>{children}</HStack>
      </Container>
    </Box>
  )
}

export default SectionContainer
