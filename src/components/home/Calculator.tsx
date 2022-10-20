import { Button, Flex, Text } from '@chakra-ui/react'
import Card from 'components/Card'
import { useStore } from 'store'
import { trpc } from 'utils/trpc'
import InputStack from './InputStack'

const Calculator = () => {
  const { data: forSending } = trpc.useQuery([
    'currency.all',
    { direction: 'SEND' },
  ])
  const { data: forReceiving } = trpc.useQuery([
    'currency.all',
    { direction: 'RECEIVE' },
  ])

  const senderAmount = useStore((state) => state.senderAmount)
  const senderCurrency = useStore((state) => state.senderCurrency)
  const recipientAmount = useStore((state) => state.recipientAmount)
  const recipientCurrency = useStore((state) => state.recipientCurrency)

  const { setSenderAmount, setRecipientAmount } = useStore((state) => ({
    setSenderAmount: state.setSenderAmount,
    setRecipientAmount: state.setRecipientAmount,
  }))

  return (
    <Card w='365px' h='346px' p='32px'>
      <Flex flexDir='column'>
        <InputStack
          label='You send'
          amount={senderAmount}
          onAmountChange={setSenderAmount}
          currency={senderCurrency}
          currencyOptions={forSending}
          mb='28px'
        />
        <InputStack
          label='You receive'
          amount={recipientAmount}
          onAmountChange={setRecipientAmount}
          currency={recipientCurrency}
          currencyOptions={forReceiving}
          mb='28px'
        />
        <Text mb='20px' fontWeight='bold' color='brand.500'>
          Exchange Rate: -/-
        </Text>
        <Button py='24px'>Currently unavailable</Button>
      </Flex>
    </Card>
  )
}

export default Calculator
