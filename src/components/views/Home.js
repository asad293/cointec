import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Header from '../core/Header'
import Navbar from '../core/Navbar'
// import BetaBand from './Home/BetaBand'
// import Features from './Home/Features'
import HowTo from './Home/HowTo'
import DigitalCurrencies from './Home/DigitalCurrencies'
// import TrustInfo from './Home/TrustInfo'
// import UserReviews from './Home/UserReviews'
import Security from './Home/Security'
import Subscribe from './Home/Subscribe'
// import CurrentDevelopment from './Home/CurrentDevelopment'
import Tracking from './Home/Tracking'
import Footer from '../core/Footer'
import SimpleCalculator from '../SimpleCalculator'
import CurrencySlider from './Home/CurrencySlider'

class Home extends Component {
    render() {
        let homeText = this.props.location.pathname === '/buy-augur' ? 'buy Augur' : 'buy digital currency';
        return (
            <div>
                <Header background="gradient">
                    <Navbar />
                    <hr className="m-0" style={{borderTop: '1px solid rgba(255, 255, 255, 0.08)'}} />
                    

                    {/* Mobile Beta Band */}
                    {/* <BetaBand /> */}
                    

                    {/* Hero Section */}
                    <div className="container">
                        <div className="hero-wrapper">
                            <div className="row">

                                <div className="col-12 col-lg-6 hero-text-main hero-text text-white d-flex flex-column ">
                                    <h1 className="hero-title">
                                        Say hello to a new
                                        <br/>
                                        kind of money.
                                    </h1>

                                    <h2 className="hero-intro">
                                        Buy 20 digital currencies using Bank Transfer or Bitcoin.<br className="d-none d-md-inline" />
                                        Create an account and get started in minutes.
                                    </h2>
                                    {/* <h2 className="hero-intro">
                                        Buy 20 digital currencies using Bank Transfer or Bitcoin.

                                        Try our calculator for live exchange rates.
                                    </h2> */}

                                    <div className="my-3 my-md-0">
                                        <Link to='/getting-started'>New to digital currencies? Learn more</Link>
                                    </div>
                                    {/* <div className="coming-soon d-none d-lg-flex">
                                        <a href="#currentdev" className="beta-wrapper">
                                            <div className="beta-pill">Beta</div>
                                            <div className="more-features">
                                                More features coming soon <i className="ml-1 d-flex mdi mdi-chevron-right"></i>
                                            </div>
                                        </a>
                                    </div> */}
                                </div>

                                <div className="d-none d-lg-flex col-lg-1 col-xl-2"></div>

                                <div className="col-12 col-lg-5 col-xl-4 hero-calculator pl-xl-0 pt-lg-3">
                                    <div className="calculator-wrapper">
                                        {/* <div className="online-indicator">
                                            <div className="status-icon online">
                                                <div className="dot"></div>
                                            </div>
                                            <div className="status-label">Online</div>
                                        </div> */}
                                        <SimpleCalculator location={this.props.location}/>
                                    {/* 
                                        <div className="calculator-body">
                                            
                                        </div> 
                                        <div className="calculator-step-indicator">
                                            <ul>
                                                <li className="active"></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                    */}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* Hero Section End */}

                </Header>
                
                {/* <Features /> */}
                <CurrencySlider />
                <HowTo />
                {/* <TrustInfo /> */}
                {/* <UserReviews /> */}
                <DigitalCurrencies />
                <Tracking />
                <Security />
                <Subscribe />
                {/* <CurrentDevelopment /> */}

                <Footer />
            </div>
        )
    }
}

export default Home