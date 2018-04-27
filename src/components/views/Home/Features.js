import React, { Component } from 'react'

class Features extends Component {
    render() {
        return (
            <div className="container">
                <div className="row my-4">
                    <div className="col-md-4">

                        <div className="cta-icon-wrapper py-4 py-md-5  pr-4">
                            <img src="./img/Competitve_rates_icon.svg" alt="Competitve rates" />

                            <h3 className="cta-title">Competitive rates</h3>
                            <p className="cta-text">
                                You’ll find it hard to get better rates elsewhere. We operate efficiently to save you costs. Add more text here.
                            </p>
                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="cta-icon-wrapper py-4 py-md-5  pr-4">
                            <img src="./img/Competitve_rates_icon.svg" alt="Competitve rates" />

                            <h3 className="cta-title">Lightning fast delivery</h3>
                            <p className="cta-text">
                                You’ll find it hard to get better rates elsewhere. We operate efficiently to save you costs. Add more text here.
                            </p>
                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="cta-icon-wrapper py-4 py-md-5  pr-4">
                            <img src="./img/Competitve_rates_icon.svg" alt="Competitve rates" />

                            <h3 className="cta-title">Reliable support</h3>
                            <p className="cta-text">
                                You’ll find it hard to get better rates elsewhere. We operate efficiently to save you costs. Add more text here.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Features