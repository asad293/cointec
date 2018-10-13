import Document, { Head, Main, NextScript } from 'next/document'

const title = 'Say hello to a new kind of money'
const description = 'Buy 20 digital currencies using Bank Transfer or Bitcoin.'
const URL = 'https://www.cointec.co.uk'
const image = 'http://www.cointec.co.uk/img/png/ct-square.png'

// prettier-ignore
export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
  }

	render() {
		return (
			<html>
				<Head>
					<meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

					<meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png?v=WGLKXP2GJR" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png?v=WGLKXP2GJR" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png?v=WGLKXP2GJR" />
          <link rel="manifest" href="/static/favicon/site.webmanifest?v=WGLKXP2GJR" />
          <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg?v=WGLKXP2GJR" color="#045cc7" />
          <link rel="shortcut icon" href="/static/favicon/favicon.ico?v=WGLKXP2GJR" />
          <meta name="msapplication-TileColor" content="#045cc7" />
          <meta name="theme-color" content="#045cc7" />
          
					<meta name="description" content={description} />
          <meta itemProp="name" content={title} />
					<meta itemProp="description" content={description} />
					<meta itemProp="image" content={image} />
					<meta property="og:url" content={URL} />
					<meta property="og:type" content="website" />
					<meta property="og:title" content={title} />
					<meta property="og:description" content={description} />
					<meta property="og:image" content={image} />
					<meta property="og:image:width" content="1200" />
					<meta property="og:image:height" content="630" />
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:title" content={title} />
					<meta name="twitter:description" content={description} />
					<meta name="twitter:site" content={URL} />
					<meta name="twitter:image" content={image} />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}
