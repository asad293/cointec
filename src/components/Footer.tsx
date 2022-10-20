import {
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { BsInstagram, BsMedium, BsTwitter } from 'react-icons/bs'
import NavLink from './NavLink'

const Footer = () => {
  const siteNav = [
    {
      title: 'Information',
      links: [
        { name: 'Home', url: '/' },
        { name: 'Learn', url: '/' },
        { name: 'Charts', url: '/' },
      ],
    },
    {
      title: 'Learn',
      links: [
        { name: 'Basics', url: '/' },
        { name: 'Wallets', url: '/' },
        { name: 'Blockchain', url: '/' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', url: '/' },
        { name: 'Terms of use', url: '/' },
        { name: 'AML/KYC', url: '/' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Helpdesk', url: '/' },
        { name: 'Live Chat', url: '/' },
      ],
    },
  ]

  return (
    <Box borderTop='1px solid #D5DCE0'>
      <Container as='footer' maxW='container.md'>
        <Flex pt='66px' pb='43px' justify='space-between'>
          <Stack spacing='6'>
            <Image src='footer-logo.svg' alt='cointec' w='104px' />
            <HStack spacing='5'>
              <BsTwitter />
              <BsInstagram />
              <BsMedium />
            </HStack>
          </Stack>

          {siteNav.map((nav) => (
            <LinkStack key={nav.title} title={nav.title} links={nav.links} />
          ))}
        </Flex>
      </Container>

      <Divider />

      <Container maxW='container.md'>
        <Flex justify='space-between' py='14px'>
          <Text fontSize='sm'>© Cointec ltd 2022</Text>
          <Text fontSize='sm'>
            Cointec Ltd is a company registered in England and Wales (No.
            0880XXXX)
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}

const LinkStack = ({
  title = '',
  links = [
    { name: 'Home', url: '/' },
    { name: 'Learn', url: '/' },
    { name: 'Charts', url: '/' },
  ],
}) => (
  <Stack spacing='3'>
    <Text fontWeight='semibold'>{title}</Text>
    <Stack>
      {links.map((link) => (
        <NavLink key={link.name} href='/' variant='footer'>
          {link.name}
        </NavLink>
      ))}
    </Stack>
  </Stack>
)

export default Footer
