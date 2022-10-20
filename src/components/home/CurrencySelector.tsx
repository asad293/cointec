import {
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { Currency } from '@prisma/client'

type Props = {
  currency: string
  currencyOptions?: Currency[]
} & MenuButtonProps

const CurrencySelector = ({ currency, currencyOptions, ...props }: Props) => {
  const selected = currencyOptions?.find((option) => option.name === currency)
  return (
    <Menu placement='bottom-end'>
      <MenuButton {...props}>
        {selected && (
          <HStack spacing='5' justifyContent='flex-end'>
            <HStack>
              <Image src={selected.image} alt={selected.id} w='20px' h='20px' />
              <Text w='4ch' fontWeight='semibold'>
                {selected.name}
              </Text>
            </HStack>
            <Image src='/arrow-down.svg' alt={selected.id} w='12px' h='20px' />
          </HStack>
        )}
      </MenuButton>

      <MenuList>
        {currencyOptions?.map(({ id, name, image }) => (
          <MenuItem key={id}>
            <Flex justify='space-between' w='full'>
              <Image src={image} alt={id} w='20px' h='20px' />
              <Text fontWeight='semibold'>{name}</Text>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default CurrencySelector
