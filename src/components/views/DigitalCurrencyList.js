import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Header from '../core/Header'
import Navbar from '../core/Navbar'
import Footer from '../core/Footer'

import { coins } from '../SimpleCalculator/exchangeables'

class DigitalCurrencyList extends Component {
  constructor() {
    super()
    // this.state = {
    //   coins: []
    // }
  }

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
                name={coin.name}
                fullName={coin.fullName}
                image={coin.image}
                disabled={coin.Status === 'DISABLED'} />
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

  // componentDidMount() {
  //   this.props.fetchAssets()
  // }

  // componentWillReceiveProps({ limit }) {
  //   const updatedCoins = []
  //   if (limit.assets) {
  //     Object.keys(limit.assets).forEach(assetPair => {
	// 			if (assetPair.startsWith('GBP')) {
  //         const asset = limit.assets[assetPair]
  //         const coin = coins.find(coin => assetPair.indexOf(coin.name) === 3)
  //         if (coin) {
  //           coin.Status = asset.Send.Status
  //           updatedCoins.push(coin)
	// 				}
  //       }
  //     })
  //     this.setState({
  //       coins: updatedCoins
  //     })
  //   }
  // }
}

const Currency = ({ name, fullName, image }) => (
  <div className="col-12 col-md-6 col-lg-4">
    <Link to={`/exchange/${name}`} className="digital-currency">
      <img src={image} alt={name} />
      <p>{fullName}</p>
    </Link>
  </div>
)

// const mapStateToProps = state => ({ limit: state.limit })

// export default connect(mapStateToProps, { fetchAssets })(DigitalCurrencyList)
export default DigitalCurrencyList
