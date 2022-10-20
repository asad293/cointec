import { defineStyleConfig, extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
}

const colors = {
  brand: {
    200: '#0575e6',
    500: '#0459c4',
    700: '#022080',
  },
  text: {
    light: 'rgba(255, 255, 255, 0.8)',
  },
}

const fonts = {
  heading: `'Open Sans', sans-serif`,
  body: `'Open Sans', sans-serif`,
}

const breakpoints = {
  xs: '540px',
  sm: '720px',
  md: '960px',
  lg: '1140px',
  xl: '80em',
  '2xl': '96em',
}

const sizes = {
  container: breakpoints,
}

const Link = defineStyleConfig({
  baseStyle: {},
  variants: {
    header: {
      color: 'text.light',
      _hover: { color: 'white', textDecor: 'none' },
    },
    footer: {
      color: '#667075',
    },
  },
})

const components = { Link }

export const theme = extendTheme({
  config,
  colors,
  fonts,
  breakpoints,
  sizes,
  components,
})
