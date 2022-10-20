import { z } from 'zod'

const typeSchema = z.enum(['fiat', 'crypto'])
const directionSchema = z.enum(['SEND', 'RECEIVE'])

export const createCurrencySchema = z.object({
  name: z.string(),
  image: z.string(),
  type: typeSchema,
  directions: z.array(directionSchema),
  tags: z.array(z.string()),
})

export const updateCurrencySchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  image: z.string().optional(),
  type: typeSchema.optional(),
  directions: z.array(directionSchema).optional(),
  tags: z.array(z.string()).optional(),
})

export const allCurrenciesSchema = z
  .object({ direction: directionSchema.nullish() })
  .nullish()
