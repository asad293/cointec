import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import Header from '../core/Header'
import Navbar from '../core/Navbar'
import Footer from '../core/Footer'
import Sidebar from './Learn/Sidebar'

class GlossaryOfTokens extends Component {

  render() {
		return (
			<div className="learn-page">
				<Header background="gradient">
					<Navbar />
					<hr className="hr-header m-0" />

          {/* Hero Section */}
					<div className="container">
						<div className="hero-wrapper hero-wrapper-inner">
							<div className="row">
								<div className="col-md-12">
									<h1 className="learn-heading dc-basics-heading">Glossary Of Tokens</h1>
								</div>
							</div>
						</div>
					</div>
					{/* Hero Section End */}
        </Header>

        <section className="learn-breadcrumb">
          <div className="container">
            <ul>
              <li><Link to='/learn'>Learn /</Link></li>
              <li> Glossary Of Tokens</li>
            </ul>
          </div>
        </section>

        <section className="page-content dc-glossary container">
					<div className="row">
            <div className="col-12 col-lg-8">
              <div className="glossary-wrapper tokens">
                <div className="token-group">
                  <h6 className="token-heading">
                    <img src="/img/coins/BTC.svg" alt="BTC" />
                    Bitcoin
                  </h6>
                  <p className="token-description">
                    Anti-money Laundering is the principle of preventing financial criminals from
                    transforming money obtained from illegal activities into “clean” money. In
                    order to do this, businesses that provide money services take a number of
                    measures to ensure source of user funds are legitimate. Some random text.
                  </p>
                </div>
                <hr />
                
                <div className="token-group">
                  <h6 className="token-heading">
                    <img src="/img/coins/BTC.svg" alt="BTC" />
                    Bitcoin
                  </h6>
                  <p className="token-description">
                    Anti-money Laundering is the principle of preventing financial criminals from
                    transforming money obtained from illegal activities into “clean” money. In
                    order to do this, businesses that provide money services take a number of
                    measures to ensure source of user funds are legitimate. Some random text.
                  </p>
                </div>
                <hr />

                <div className="token-group">
                  <h6 className="token-heading">
                    <img src="/img/coins/BTC.svg" alt="BTC" />
                    Bitcoin
                  </h6>
                  <p className="token-description">
                    Anti-money Laundering is the principle of preventing financial criminals from
                    transforming money obtained from illegal activities into “clean” money. In
                    order to do this, businesses that provide money services take a number of
                    measures to ensure source of user funds are legitimate. Some random text.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-4 d-none d-lg-block">
              <Sidebar />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }
}

export default GlossaryOfTokens