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
                                Current development
                            </h2>

                            <p className="cta-text  mb-4">
                            We are working hard in bringing you all the latest and greatest features. If you’d like to see even more, <a href="mailto:contact@cointec.co.uk" target="_blank">contact us.</a>
                            </p>


                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-4">

                            <div className="cta-icon-wrapper py-4 py-md-5 pr-xl-4">

                            <div className="icon-wrapper">
                            <img src="./img/creditcard.svg" alt="Competitve rates" />
                            </div>
                               

                                <h3 className="cta-title">Multiple payment methods</h3>
                                <p className="cta-text">
                                Pay with GBP or EUR in your preferred method including credit card, bank transfer, SEPA, Sofort and more...
                                </p>
                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="cta-icon-wrapper py-4 py-md-5 pr-xl-4">
                            <div className="icon-wrapper">
                            <img src="./img/eth.svg" alt="Competitve rates" />
                            </div>

                                <h3 className="cta-title">More cryptocurrencies</h3>
                                <p className="cta-text">
                                Buy all your favorite cryptos in one place. Whether it’s Majors or Alt Coins, we’ll have you covered.
                                </p>
                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="cta-icon-wrapper py-4 py-md-5 pr-xl-4">
                            <div className="icon-wrapper">
                            <img src="./img/wallet.svg" alt="Competitve rates" />
                            </div>

                                <h3 className="cta-title">Secure wallets</h3>
                                <p className="cta-text">
                                With secure integrated wallets, you’ll be able to easily store all your coins on our platform.
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