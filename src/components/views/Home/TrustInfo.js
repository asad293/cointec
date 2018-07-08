import React, { Component } from 'react'

class TrustInfo extends Component {
    render() {
        return (
            <div className="bg-gradient bg-mid-gradient py-5">

                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex flex-column justify-content-center">
                            <h2 className="mb-3 mb-md-5 brokers-title">
                                We connect you to
                                <br />
                                the most trusted brokers.
                            </h2>

                            <p className="cta-text pr-4 mb-3 mb-md-5">
                                We ensure your funds are secure by connecting you to the most trusted UK brokers. As soon as your payment arrives, your digital currency is is sent to your wallet.
                            </p>
                        </div>


                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <div className="map-wrapper py-5">
                                <img src="/img/UK.svg" alt="We connect you to the most trusted brokers" className="img-fluid" />
                                <img src="/img/lock.svg" alt="" className="lock lock1" />
                                <img src="/img/lock.svg" alt="" className="lock lock2" />
                                <img src="/img/lock.svg" alt="" className="lock lock3" />
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default TrustInfo