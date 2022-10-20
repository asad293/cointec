import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Link,
  Text,
} from '@chakra-ui/react'
import Card from 'components/Card'
import NextLink from 'next/link'

const GetStarted = () => {
  const steps = [
    {
      title: 'Create an account',
      description: `Create an account in seconds. All you need is an email and password. This is placeholder text to.`,
      link: 'Get started now',
      image: '/screen.svg',
    },
    {
      title: 'Setup your wallet',
      description: `Create an account in seconds. All you need is an email and password. This is placeholder text to.`,
      link: 'Wallet selector',
      image: '/screen.svg',
    },
    {
      title: 'Make an order',
      description: `Create an account in seconds. All you need is an email and password. This is placeholder text to.`,
      link: 'Create your first order',
      image: '/screen.svg',
    },
  ]
  return (
    <Box bg='#f6f9fc' mt='200px' py='80px'>
      <Center>
        <Heading>Get started in minutes</Heading>
      </Center>

      <Center mt='40px'>
        <HStack spacing='10'>
          {steps.map((step, idx) => (
            <Step key={idx} {...step} />
          ))}
        </HStack>
      </Center>
    </Box>
  )
}

const Step = ({
  title,
  description,
  link,
  image,
}: {
  title: string
  description: string
  link: string
  image: string
}) => {
  return (
    <Card w='350px' h='360px' p='10' textAlign='center'>
      <Center>
        <Image src={image} alt={title} />
      </Center>

      <Heading size='md' mt='28px'>
        {title}
      </Heading>
      <Text color='#667075' mt='4'>
        {description}
      </Text>

      <NextLink href='/learn' passHref>
        <Link color='#0459c4' fontWeight='semibold' mt='12px' display='block'>
          {link}
        </Link>
      </NextLink>
    </Card>
  )
}

export default GetStarted
