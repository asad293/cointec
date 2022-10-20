import { Box, BoxProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
} & BoxProps

const Card = ({ children, ...props }: Props) => {
  return (
    <Box
      bg='white'
      boxShadow='0px 8px 32px rgb(0 16 33 / 9%)'
      borderRadius='3px'
      {...props}
    >
      {children}
    </Box>
  )
}

export default Card
