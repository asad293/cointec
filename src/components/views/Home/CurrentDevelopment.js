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
                                Our platform is built with a focus on customer experience, that’s why users love us. Hear what they are saying!
                            </p>


                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-4">

                            <div className="cta-icon-wrapper py-4 py-md-5 pr-xl-4">
                                <img src="./img/Competitve_rates_icon.svg" alt="Competitve rates" />

                                <h3 className="cta-title">Multiple payment methods</h3>
                                <p className="cta-text">
                                    You’ll find it hard to get better rates elsewhere. We operate efficiently to save you costs. Add more text here.
                                </p>
                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="cta-icon-wrapper py-4 py-md-5 pr-xl-4">
                                <img src="./img/Competitve_rates_icon.svg" alt="Competitve rates" />

                                <h3 className="cta-title">More cryptocurrencies</h3>
                                <p className="cta-text">
                                    You’ll find it hard to get better rates elsewhere. We operate efficiently to save you costs. Add more text here.
                                </p>
                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="cta-icon-wrapper py-4 py-md-5 pr-xl-4">
                                <img src="./img/Competitve_rates_icon.svg" alt="Competitve rates" />

                                <h3 className="cta-title">Native mobile application</h3>
                                <p className="cta-text">
                                    You’ll find it hard to get better rates elsewhere. We operate efficiently to save you costs. Add more text here.
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