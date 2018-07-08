import React, { Component } from 'react'

class CurrentDevelopment extends Component {
    render() {
        return (
            <div className="py-5 mt-md-5 mb-md-2 bg-gradient-current-dev">
                <div className="container">


                    <div className="row">
                        <div className="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto text-md-center">
                            <a name="currentdev"></a>
                            <h2 className="mb-3 mb-md-5 current-dev-title">
                                Current developments
                            </h2>

                            <p className="cta-text  mb-4">
                            We are working hard in bringing you all the latest features.<br/><a href="mailto:contact@cointec.co.uk" target="_blank">Tell us</a> what you would like to see.
                            </p>


                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-4">

                            <div className="cta-icon-wrapper py-4 py-md-5 pr-xl-4">

                            <div className="icon-wrapper">
                            <img src="/img/creditcard.svg" alt="Competitve rates" />
                            </div>
                               

                                <h3 className="cta-title">Multiple payment methods</h3>
                                <p className="cta-text">
                                Pay with GBP or EUR in your preferred method including credit card, local bank transfer and more.
                                </p>
                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="cta-icon-wrapper py-4 py-md-5 pr-xl-4">
                            <div className="icon-wrapper">
                            <img src="/img/eth.svg" alt="Competitve rates" />
                            </div>

                                <h3 className="cta-title">Additional currencies</h3>
                                <p className="cta-text">
                                Access a wider range of digital currencies, including exotics and those trending.
                                </p>
                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="cta-icon-wrapper py-4 py-md-5 pr-xl-4">
                            <div className="icon-wrapper">
                            <img src="/img/wallet.svg" alt="Competitve rates" />
                            </div>

                                <h3 className="cta-title">Secure wallets</h3>
                                <p className="cta-text">
                                With integrated wallets, you’ll be <br/> able to store your digital currency securely on our platform.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CurrentDevelopment