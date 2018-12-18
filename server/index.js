const express = require('express')
const next = require('next')
const createSecureServer = require('./createSecureServer')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const secure = dev === true // set 'true' in development mode for ssl
const app = next({ dev })
const handle = app.getRequestHandler()

app
	.prepare()
	.then(() => {
		const server = express()

		server.get('/buy-*', (req, res) => {
			const query = {
				buy: req.params[0]
			}
			app.render(req, res, '/', query)
		})

		server.get('/transaction-tracker/:txnID', (req, res) => {
			app.render(req, res, '/transaction-tracker', { txnID: req.params.txnID })
		})

		server.get('/learn/:pathname', (req, res) => {
			app.render(req, res, `/${req.params.pathname}`)
		})

		server.get('/account-settings/:pathname', (req, res) => {
			app.render(req, res, `/${req.params.pathname}`)
		})

		server.get('/forgot-password/:token', (req, res) => {
			app.render(req, res, `/forgot-password`, { token: req.params.token })
		})

		server.get('/validate', (req, res) => {
			app.render(req, res, `/on-load`, {
				action: req.query.action,
				token: req.query.token
			})
		})

		server.get('/token-expired/:parameter', (req, res) => {
			app.render(req, res, `/token-expired`, {
				parameter: req.params.parameter
			})
		})

		server.get('/request-sent/:parameter', (req, res) => {
			app.render(req, res, `/alert-message`, {
				parameter: req.params.parameter
			})
		})

		server.get('/account-locked', (req, res) => {
			app.render(req, res, `/no-access`, { type: 'locked' })
		})

		server.get('/account-closed', (req, res) => {
			app.render(req, res, `/no-access`, { type: 'closed' })
		})

		server.get('*', handle)

		const appServer = secure ? createSecureServer(server) : server
		appServer.listen(port, err => {
			if (err) throw err
			const prefix = secure ? 'https' : 'http'
			console.log(`> Ready on ${prefix}://localhost:${port}`)
		})
	})
	.catch(ex => {
		console.error(ex.stack)
		process.exit(1)
	})
