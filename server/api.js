const express = require('express')
const router = express.Router()
const axios = require('axios')
// const https = require('https')
//
// router.get('/api/blogs', (request, response) => {
// 	const userId =
// 		'17d6bedfe7c2168d9bf69c2978436ce65ecdb5a91e29b45456d71f53a7562315f'
// 	// const userId =
// 	// 	'183900d0891b3b7afd61b62c3e049fbd5707faa503e1d131fec1777d0e44a8b9f'
// 	const requestParams = {
// 		host: 'api.medium.com',
// 		port: 443,
// 		method: 'GET',
// 		path: `/v1/users/${userId}/publications`
// 	}
// 	const req = https
// 		.request(requestParams, res => {
// 			const body = []

// 			res.setEncoding('utf-8')
// 			res.on('data', data => {
// 				body.push(data)
// 			})
// 			res.on('end', () => {
// 				let payload
// 				const responseText = body.join('')
// 				try {
// 					payload = JSON.parse(responseText)
// 				} catch (err) {
// 					response.status(statusCode).send({
// 						Message: 'Failed to parse response',
// 						Code: -1
// 					})
// 					return
// 				}

// 				const statusCode = res.statusCode
// 				const statusType = Math.floor(res.statusCode / 100)

// 				if (statusType == 4 || statusType == 5) {
// 					const err = payload.errors[0]
// 					response.status(statusCode).send({
// 						Message: err.message,
// 						Code: err.code
// 					})
// 				} else if (statusType == 2) {
// 					response.status(statusCode).send({
// 						Publications: payload.data || payload
// 					})
// 				} else {
// 					response.status(statusCode).send({
// 						Message: 'Unexpected response',
// 						Code: -1
// 					})
// 				}
// 			})
// 		})
// 		.on('error', err => {
// 			response.status(422).send({
// 				Message: err.message,
// 				Code: -1
// 			})
// 		})

// 	req.setHeader('Content-Type', 'application/json')
// 	req.setHeader(
// 		'Authorization',
// 		'Bearer 2e156ae2127db11a4fc3d2f6cda30e52039c88897224e4059becb6fc520d67bd1'
// 		// 'Bearer 23f15557a27c759477d011eaad8eab2e8cbe4f51761ecc959e66e02d7bbe9d40d'
// 	)
// 	req.setHeader('Accept', 'application/json')
// 	req.setHeader('Accept-Charset', 'utf-8')

// 	req.setTimeout(5000, () => {
// 		req.abort()
// 	})
// 	req.end()
// })

router.get('/api/blogs', (request, response) => {
	// https://blog.sendwyre.com
	axios.get('https://medium.com/s/cointalk?format=json').then(res => {
		const { Post, User, Collection, Sequence } = JSON.parse(
			res.data.split('</x>')[1]
		).payload.references
		const posts = Object.keys(Post).map(id => {
			const user = User[Post[id].creatorId]
			const collection = Collection && Collection[Post[id].homeCollectionId]
			const sequence = Sequence && Sequence[Post[id].sequenceId]
			const domain = collection
				? collection.domain
				: `medium.com/s/${sequence.slug}`
			return {
				title: Post[id].title,
				snippet: Post[id].content.subtitle,
				link: `https://${domain}/${Post[id].uniqueSlug}`,
				image: `https://cdn-images-1.medium.com/fit/c/340/217/${
					Post[id].virtuals.previewImage.imageId
				}`,
				user: {
					name: user.name,
					image: `https://cdn-images-1.medium.com/fit/c/52/52/${user.imageId}`,
					link: collection
						? `https://${domain}/@${user.username}`
						: `https://medium.com/@${user.username}`
				},
				publishedAt: Post[id].firstPublishedAt
			}
		})
		response.status(200).send({
			posts
		})
	})
})

module.exports = router
