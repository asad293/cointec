import { Box, BoxProps, Flex, HStack, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { FiCheck } from 'react-icons/fi'

type Props = {
  title: string
  rightElement?: ReactNode
} & BoxProps

const TrackingStep = ({ title, color, rightElement, ...props }: Props) => (
  <Flex
    justify='space-between'
    boxShadow='0px 2px 8px rgb(0 16 33 / 12%)'
    borderRadius='3'
    px='24px'
    py='20px'
    color={color}
    {...props}
  >
    <HStack spacing='8'>
      <Box as={FiCheck} boxSize='6' color={color || '#045cc7'} />
      <Text fontWeight='semibold'>{title}</Text>
    </HStack>
    {rightElement}
  </Flex>
)

export default TrackingStep
