import React, { Component } from 'react'

class BetaBand extends Component {
    render() {
        return (
            <div className="d-flex d-lg-none mobile-beta-band hero-text py-2 mb-3">
                <div className="container">
                    <div className="coming-soon ">
                        <a href="#currentdev" className="beta-wrapper w-100">
                            <div className="beta-pill">Beta</div>
                            <div className="more-features">
                                More features coming soon
                            </div>
                            <i className="ml-auto d-flex mdi mdi-chevron-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default BetaBand