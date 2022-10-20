import { Box } from '@chakra-ui/react'

const BgShapeTop = () => (
  <Box
    bg='linear-gradient(270deg, rgba(0, 0, 0, 0.5) 0%, rgba(10, 84, 195, 0) 50%)'
    h='270px'
    w='865px'
    mixBlendMode='soft-light'
    transform='rotate(180deg)'
    transformOrigin='100% 0'
    borderRadius='0 18.75rem 0 0'
    left='-50rem'
    bottom='-16.875rem'
    opacity='0.3'
    position='absolute'
    pointerEvents='none'
  />
)

export default BgShapeTop
