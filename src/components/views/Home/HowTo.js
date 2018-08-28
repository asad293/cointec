import React from 'react'
import { Link } from 'react-router-dom'

const HowTo = () => (
  <div className="how-to container">
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
          image="/img/plc-hd.svg"
          link={{to: '/', text: 'Get started today'}} />
      </div>
      
      <div className="col-md-12 col-lg-4 mt-3">
        <Card
          title="Setup your wallet"
          description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
          image="/img/plc-hd.svg"
          link={{to: '/', text: 'Learn more about wallets'}} />
      </div>

      <div className="col-md-12 col-lg-4 mt-3">
        <Card
          title="Make an order"
          description="Create an account in seconds. All you need is an email and password. This is placeholder text to."
          image="/img/plc-hd.svg"
          link={{to: '/', text: 'Learn about payments'}} />
      </div>
    </div>
  </div>
)

const Card = ({ title, description, image, link: { to, text } }) => (
  <div className="how-to-card px-4 py-5 text-center">
    <img src={image} alt={title} />
    <h5>{title}</h5>
    <p>{description}</p>
    <Link to={to}>{text}</Link>
  </div>
)

export default HowTo