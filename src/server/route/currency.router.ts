import {
  allCurrenciesSchema,
  createCurrencySchema,
  updateCurrencySchema,
} from 'schema/currency.schema'
import { createRouter } from 'server/createRouter'

export const currencyRouter = createRouter()
  .mutation('create', {
    input: createCurrencySchema,
    async resolve({ ctx, input }) {
      const { prisma } = ctx

      const currency = await prisma.currency.create({
        data: input,
      })

      return currency
    },
  })

  .mutation('update', {
    input: updateCurrencySchema,
    async resolve({ ctx, input }) {
      const { prisma } = ctx
      const { id, ...data } = input
      const currency = await prisma.currency.update({
        data,
        where: { id },
      })

      return currency
    },
  })

  .query('all', {
    input: allCurrenciesSchema,
    async resolve({ ctx, input }) {
      const { prisma } = ctx
      const args: any = {}

      if (input?.direction) {
        args.where = {
          directions: { hasSome: input.direction },
        }
      }
      const currencies = await prisma.currency.findMany(args)
      return currencies
    },
  })
