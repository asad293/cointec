import { Box, BoxProps, Flex, Input, Text } from '@chakra-ui/react'
import { Currency } from '@prisma/client'
import { ChangeEvent } from 'react'
import CurrencySelector from './CurrencySelector'

type Props = {
  label: string
  amount?: number
  currency: string
  currencyOptions?: Currency[]
  onAmountChange: (amount?: number) => void
} & BoxProps

const InputStack = ({
  label,
  amount,
  onAmountChange,
  currency,
  currencyOptions,
  ...props
}: Props) => {
  const handleAmountChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value) {
      onAmountChange(parseFloat(target.value))
    } else {
      onAmountChange()
    }
  }

  return (
    <Box {...props}>
      <Text fontWeight='semibold' fontSize='14px' lineHeight='10px' mb='13px'>
        {label}
      </Text>
      <Flex
        border='1px solid #c1c7cd'
        borderRadius='2px'
        py='9px'
        pl='15px'
        pr='15px'
      >
        <Input
          value={amount}
          onChange={handleAmountChange}
          variant='unstyled'
          placeholder='100.00'
          w='50%'
        />
        <CurrencySelector
          w='50%'
          currency={currency}
          currencyOptions={currencyOptions}
        />
      </Flex>
    </Box>
  )
}

export default InputStack
