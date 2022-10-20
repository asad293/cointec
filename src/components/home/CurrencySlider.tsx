import { Flex, HStack, Image, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { chunk } from 'lodash'

import { trpc } from 'utils/trpc'

const Carousel = dynamic(() => import('components/Carousel'), { ssr: false })

const CurrencySlider = () => {
  const { data } = trpc.useQuery(['currency.all', { direction: 'RECEIVE' }])
  const slides = chunk(data, 5)

  return (
    <>
      <Carousel
        gap={32}
        bg='#f6f9fc'
        borderBottom='1px solid rgb(229, 229, 229)'
        px='150px'
      >
        {slides?.map((currencies, index) => (
          <Flex
            key={index}
            w='full'
            justify='space-between'
            align='center'
            h='100px'
          >
            {currencies.map((currency) => (
              <HStack key={currency.id} spacing={2}>
                <Image
                  src={currency.image}
                  alt={currency.name}
                  boxSize='30px'
                />
                <Text fontWeight='bold'>{currency.name}</Text>
              </HStack>
            ))}
          </Flex>
        ))}
      </Carousel>
    </>
  )
}

export default CurrencySlider
