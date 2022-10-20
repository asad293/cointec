import z from 'zod'
import { createRouter } from 'server/createRouter'
import { userRouter } from './user.router'
import { currencyRouter } from './currency.router'

const helloQuerySchema = z
  .object({
    text: z.string().nullish(),
  })
  .nullish()

export const appRouter = createRouter()
  .query('hello', {
    input: helloQuerySchema,
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      }
    },
  })
  .merge('user.', userRouter)
  .merge('currency.', currencyRouter)

export type AppRouter = typeof appRouter
