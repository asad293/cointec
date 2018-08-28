import React from 'react'
import { Link } from 'react-router-dom'

const DigitalCurrencies = () => (
  <div className="home-section container">
    <div className="row">
      <div className="col-12 col-md-6 pr-4 text-center text-md-left">
        <h4 className="section-title d-none d-md-block">
          Choose from 20 of the most popular digital currencies.
        </h4>
        <h4 className="section-title d-md-none">
          Wide selection of currencies
        </h4>
        
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris.
        </p>

        <Link to='/' className="d-none d-md-inline">See all digital currencies</Link>
      </div>
      <div className="col-12 col-md-6 text-center mt-4 mt-md-0">
        <img className="currencies-group mb-5 mb-md-0" src="/img/currencies-group.svg" alt="currencies-group"/>
        <Link to='/' className="d-md-none">See all digital currencies</Link>
      </div>
    </div>
  </div>
)

export default DigitalCurrencies