import React from 'react'
import Link from 'next/link'

const GetStarted = () => (
	<div className="get-started container">
		<div className="row">
			<div className="col-12 text-center">
				<h4 className="section-title">Get started in three simple steps</h4>
			</div>
		</div>

		<div className="row">
			<div className="col-md-12 col-lg-4 mt-3">
				<Card
					title="Create an account"
					description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
					image="/static/images/plc-hd.svg"
					link={{ href: '/', text: 'Get started today' }}
				/>
			</div>

			<div className="col-md-12 col-lg-4 mt-3">
				<Card
					title="Setup your wallet"
					description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
					image="/static/images/plc-hd.svg"
					link={{ href: '/', text: 'Learn more about wallets' }}
				/>
			</div>

			<div className="col-md-12 col-lg-4 mt-3">
				<Card
					title="Make an order"
					description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
					image="/static/images/plc-hd.svg"
					link={{ href: '/', text: 'Learn about payments' }}
				/>
			</div>
		</div>
	</div>
)

const Card = ({ title, description, image, link: { href, text } }) => (
	<div className="get-started-card px-4 py-5 text-center">
		<img src={image} alt={title} />
		<h5>{title}</h5>
		<p>{description}</p>
		<Link href={href}>
			<a>{text}</a>
		</Link>
	</div>
)

export default GetStarted
