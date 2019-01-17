import React, { Component } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { fetchVerificationStatus } from '../store/actions'

import Header from '../components/Header'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

class Blog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			blogs: [
				{
					preview: '/static/images/bank-bitcoin-business.png',
					title: '[ERC-20] This is the first Cointec Blog',
					description:
						'Create an account in seconds. All you need is an email an random.'
				},
				{
					preview: '/static/images/bank-bitcoin-business.png',
					title: '[ERC-20] This is the first Cointec Blog',
					description:
						'Create an account in seconds. All you need is an email an random.'
				},
				{
					preview: '/static/images/bank-bitcoin-business.png',
					title: '[ERC-20] This is the first Cointec Blog',
					description:
						'Create an account in seconds. All you need is an email an random.'
				},
				{
					preview: '/static/images/bank-bitcoin-business.png',
					title: '[ERC-20] This is the first Cointec Blog',
					description:
						'Create an account in seconds. All you need is an email an random.'
				},
				{
					preview: '/static/images/bank-bitcoin-business.png',
					title: '[ERC-20] This is the first Cointec Blog',
					description:
						'Create an account in seconds. All you need is an email an random.'
				},
				{
					preview: '/static/images/bank-bitcoin-business.png',
					title: '[ERC-20] This is the first Cointec Blog',
					description:
						'Create an account in seconds. All you need is an email an random.'
				}
			]
		}
	}

	componentDidMount() {}

	render() {
		return (
			<div className="blog-page">
				<Head>
					<title>Cointec Blog</title>
				</Head>

				<Header background="gradient">
					<Nav />
					<hr className="hr-header" />
					<div className="container">
						<div className="hero-wrapper hero-wrapper-inner">
							<div className="row">
								<div className="col-md-12">
									<h1 className="page-heading d-md-block	d-none">
										Welcome to the Cointec Blog
									</h1>
									<h1 className="page-heading d-block	d-md-none">
										Cointec Blog
									</h1>
									<h6 className="page-sub-heading d-none d-sm-block">
										Add some text here to fill up the space.
									</h6>
								</div>
							</div>
						</div>
					</div>
				</Header>

				<section className="page-content dc-glossary container">
					<div className="row">
						<div className="col">
							<div className="content-wrapper blog-list p-0 h-auto position-relative">
								<div className="row">
									{this.state.blogs.map((blog, index) => (
										<div key={index} className="col-lg-4 col-md-6">
											<BlogItem
												preview={blog.preview}
												title={blog.title}
												description={blog.description}
											/>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				<Footer backgroundColor="#fff" />

				<style jsx global>{`
					html {
						background: #f7f9fa;
					}
					html body {
						background: none;
						box-shadow: none;
					}
				`}</style>
			</div>
		)
	}

	componentWillReceiveProps(props) {}
}

const BlogItem = ({ preview, title, description }) => (
	<div className="blog-item">
		<div className="header">
			<img src={preview} alt="Meta Mask" />
		</div>
		<div className="blog-item-body">
			<h4 className="blog-title">{title}</h4>
			<p className="blog-description">{description}</p>
		</div>
	</div>
)

export default connect(
	({ auth, verification, accounts, globals }) => ({
		auth,
		verification,
		accounts,
		globals
	}),
	{
		fetchVerificationStatus
	}
)(withRouter(Blog))
