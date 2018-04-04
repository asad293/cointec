import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Header from '../core/Header'
import Navbar from '../core/Navbar'
import BetaBand from './Home/BetaBand'
import Features from './Home/Features'
import TrustInfo from './Home/TrustInfo'
import UserReviews from './Home/UserReviews'
import StartBuying from './Home/StartBuying'
import CurrentDevelopment from './Home/CurrentDevelopment'
import Footer from '../core/Footer'

class App extends Component {
    render() {
        return (
            <div>
                <Header>
                    <Navbar />
                    

                    {/* Mobile Beta Band */}
                    <BetaBand />
                    

                    {/* Hero Section */}
                    <div className="container">
                        <div className="hero-wrapper">
                            <div className="row">

                                <div className="col-md-6 hero-text-main hero-text text-white d-flex flex-column justify-content-center">
                                    <h1 className="hero-title">
                                        Get Bitcoins. <strong>Fast.</strong>
                                    </h1>

                                    <h2 className="hero-intro">
                                        Cointec lets you buy Bitcoins instantly using Bank Transfer.

                                        Try our calculator for instant quotes.
                                    </h2>

                                    <div className="coming-soon d-none d-lg-flex">
                                        <a href="#currentdev" className="beta-wrapper">
                                            <div className="beta-pill">Beta</div>
                                            <div className="more-features">
                                                More features coming soon <i className="ml-1 d-flex mdi mdi-chevron-right"></i>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <div className="d-none d-lg-flex col-1"></div>

                                <div className="col-md-6 col-lg-5 hero-calculator">
                                    <div className="calculator-wrapper">
                                        <div className="online-indicator">
                                            <div className="status-icon online">
                                                <div className="dot"></div>
                                            </div>
                                            <div className="status-label">Online</div>
                                        </div>
                                        <div className="calculator-body">
                                            {/* Calculator Here */}
                                        </div>
                                        <div className="calculator-step-indicator">
                                            <ul>
                                                <li className="active"></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* Hero Section End */}

                </Header>
                
                <Features />
                <TrustInfo />
                <UserReviews />
                <StartBuying />
                <CurrentDevelopment />

                <Footer />
            </div>
        )
    }
}

export default App