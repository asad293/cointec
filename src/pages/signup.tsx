import type { NextPage } from 'next'

import { Box, Button, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { trpc } from 'utils/trpc'
import { CreateUserInput } from 'schema/user.schema'
import { useRouter } from 'next/router'

const SignUp: NextPage = () => {
  const { handleSubmit, register } = useForm<CreateUserInput>()
  const router = useRouter()

  const { mutate, error } = trpc.useMutation(['user.register'], {
    onSuccess: () => {
      router.push('/')
    },
  })

  const onSubmit = (values: CreateUserInput) => {
    mutate(values)
  }

  return (
    <>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="tom.doe.@example.com"
          {...register('email')}
        />
        <Input type="text" placeholder="Tom" {...register('name')} />

        <Button type="submit">Create an account</Button>
      </Box>

      <Link href="/login">
        <a>Login</a>
      </Link>
    </>
  )
}

export default SignUp
