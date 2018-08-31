import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Header from '../core/Header'
import Navbar from '../core/Navbar'
import Footer from '../core/Footer'

import { coins } from '../SimpleCalculator/exchangeables'

class DigitalCurrencyList extends Component {
	render() {
		return (
			<div className="digital-currency-page learn-page">
				<Header background="gradient">
					<Navbar />
					<hr className="hr-header m-0" />

					{/* Hero Section */}
					<div className="container">
						<div className="hero-wrapper hero-wrapper-inner">
							<div className="row">
								<div className="col-md-12">
									<h1 className="learn-heading dc-basics-heading">
										Digital currency list
									</h1>
								</div>
							</div>
						</div>
					</div>
					{/* Hero Section End */}
				</Header>

				<section className="page-content dc-glossary container">
					<div className="row mb-md-3">
            {coins.map(coin =>
              <Currency
                key={coin.name}
                image={coin.image}
                name={coin.fullName} />
            )}
          </div>
          <p className="more-on-currencies">
            Want to learn about the underlying technology behind all the digital
            currencies we offer? Check out the <Link to='/glossary-of-tokens'>glossary of tokens.</Link>
          </p>
        </section>

        <Footer />
      </div>
    )
  }
}

const Currency = ({ image, name }) => (
  <div className="col-12 col-md-6 col-lg-4">
    <div className="digital-currency">
      <img src={image} alt={name} />
      <p>{name}</p>
    </div>
  </div>
)

export default DigitalCurrencyList
