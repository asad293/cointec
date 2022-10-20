import type { NextPage } from 'next'

import Head from 'next/head'
import { Box, Divider } from '@chakra-ui/react'

import Header from 'components/Header'
import BgShapeBottom from 'components/home/BgShapeBottom'
import BgShapeTop from 'components/home/BgShapeTop'
import Hero from 'components/home/Hero'
import CurrencySlider from 'components/home/CurrencySlider'
import GetStarted from 'components/home/GetStarted'
import ExchangeRates from 'components/home/ExchangeRates'
import DigitalCurrencies from 'components/home/DigitalCurrencies'
import Tracking from 'components/home/Tracking'
import Security from 'components/home/Security'
import LargeBanner from 'components/home/LargeBanner'
import Footer from 'components/Footer'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Buy Digital Currency | Cointec</title>
        <meta name='description' content='Buy Digital Currency | Cointec' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Box
        bgGradient='linear(to-b, brand.700, brand.200)'
        h='550px'
        position='relative'
      >
        <Header />
        <Divider borderColor='rgba(255, 255, 255, 0.16)' />
        <Hero />
        <BgShapeTop />
        <BgShapeBottom />
      </Box>

      <CurrencySlider />
      <GetStarted />
      <ExchangeRates />
      <DigitalCurrencies />
      <Tracking />
      <Security />
      <LargeBanner />

      <Footer />
    </>
  )
}

export default Home
