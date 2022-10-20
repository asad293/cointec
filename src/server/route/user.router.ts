import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import { baseUrl } from 'config'
import { createUserSchema } from 'schema/user.schema'
import { createRouter } from 'server/createRouter'
import { encode } from 'utils/base64'
import { sendLoginEmail } from 'utils/mailer'
import { z } from 'zod'

export const userRouter = createRouter()
  .mutation('register', {
    input: createUserSchema,

    async resolve({ ctx, input }) {
      const { email, name } = input

      try {
        const user = await ctx.prisma.user.create({
          data: {
            email,
            name,
          },
        })

        return user
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new trpc.TRPCError({
              code: 'CONFLICT',
              message: 'User already exists',
            })
          }
        }

        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
        })
      }
    },
  })

  .mutation('login', {
    input: z.object({ email: z.string().email() }),

    async resolve({ ctx, input }) {
      const { email } = input

      const user = await ctx.prisma.user.findUnique({
        where: { email },
      })

      return user
    },
  })

  .mutation('request-otp', {
    input: z.object({ email: z.string().email(), redirect: z.string() }),

    async resolve({ ctx, input }) {
      const { email, redirect } = input

      const user = await ctx.prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }

      const token = await ctx.prisma.loginToken.create({
        data: {
          redirect,
          user: {
            connect: { id: user.id },
          },
        },
      })

      await sendLoginEmail({
        token: encode(`${token.id}:${user.email}`),
        email,
        url: baseUrl,
      })

      return true
    },
  })

  .query('verify-otp', {
    input: z.object({
      token: z.string(),
    }),

    resolve: () => {},
  })
