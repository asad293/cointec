import React, { Component } from 'react'

class Features extends Component {
    render() {
        return (
            <div className="container">
                <div className="row my-4">
                    <div className="col-md-4">

                        <div className="cta-icon-wrapper py-4 py-md-5  pr-4">
                            <img src="/img/chart-down.svg" alt="Competitve rates" />

                            <h3 className="cta-title">Competitive rates</h3>
                            <p className="cta-text">
                            No extra fees. Ever. We promise.  Just guaranteed exchange rates that you’ll find hard to beat. 
                            </p>
                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="cta-icon-wrapper py-4 py-md-5  pr-4">
                            <img src="/img/stopwatch.svg" alt="Lightning fast delivery" />

                            <h3 className="cta-title">Lightning fast delivery</h3>
                            <p className="cta-text">
                            Your coins are sent as soon as we receive payment so you can watch them move across the blockchain. 
                            </p>
                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="cta-icon-wrapper py-4 py-md-5  pr-4">
                            <img src="/img/help.svg" alt="Reliable support" />

                            <h3 className="cta-title">Reliable support</h3>
                            <p className="cta-text">
                            Here 24/7 to answer your questions. The markets never sleep, so why should we?
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Features