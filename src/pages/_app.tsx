import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/500.css'
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/800.css'

import type { AppProps } from 'next/app'
import type { AppRouter } from 'server/route/app.router'

import superjson from 'superjson'
import { withTRPC } from '@trpc/next'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { ChakraProvider } from '@chakra-ui/react'
import { url } from 'config'
import { theme } from 'theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ]

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: { staleTime: 60 },
        },
      },
      headers() {
        if (ctx?.req) {
          return { ...ctx.req.headers, 'x-ssr': '1' }
        }
        return {}
      },
      links,
      transformer: superjson,
    }
  },
  ssr: true,
})(MyApp)
