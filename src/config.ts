export const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : ''
export const url = `${baseUrl}/api/trpc`
