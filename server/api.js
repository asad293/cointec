const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/api/blogs', (request, response) => {
	axios.get('https://blog.sendwyre.com/?format=json').then(res => {
		const { Post, User, Collection } = JSON.parse(
			res.data.split('</x>')[1]
		).payload.references
		const posts = Object.keys(Post).map(id => {
			const user = User[Post[id].creatorId]
			const collection = Collection[Post[id].homeCollectionId]
			return {
				title: Post[id].title,
				snippet: Post[id].content.subtitle,
				link: `https://${collection.domain}/${Post[id].uniqueSlug}`,
				image: `https://cdn-images-1.medium.com/fit/c/340/217/${
					Post[id].virtuals.previewImage.imageId
				}`,
				user: {
					name: user.name,
					image: `https://cdn-images-1.medium.com/fit/c/52/52/${user.imageId}`,
					link: `https://${collection.domain}/@${user.username}`
				},
				publishedAt: Post[id].firstPublishedAt
			}
		})
		response.status(200).send({
			posts
		})
	})
})

router.get(
	'/api/validate-address/:wallet/:receiveCurrency',
	(request, response) => {
		const wallet = request.params.wallet
		const receiveCurrency = request.params.receiveCurrency
		axios
			.get(`https://shapeshift.io/validateAddress/${wallet}/${receiveCurrency}`)
			.then(res => {
				const data = res.data
				response.status(200).send({
					...data
				})
			})
			.catch(error => {
				response.status(error.response.status).send({
					...error.response
				})
			})
	}
)

module.exports = router
