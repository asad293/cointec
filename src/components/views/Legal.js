import React, { Component } from 'react'
import { Route } from 'react-router'
import { NavLink } from 'react-router-dom'

import Header from '../core/Header'
import Navbar from '../core/Navbar'
import Footer from '../core/Footer'

class Legal extends Component {
    render() {
        return (
            <div>
                <Header>
                    <Navbar />


                    {/* Hero Section */}
                    <div className="container">
                        <div className="hero-wrapper hero-wrapper-inner">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="legal-heading">Legal</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Hero Section End */}

                </Header>

                <div className="tabs-bar">
                    <div className="tabs d-flex justify-content-center">
                        <NavLink className="tab" to="/privacy" activeClassName="active">Privacy Policy</NavLink>
                        <NavLink className="tab" to="/terms" activeClassName="active">Terms & Conditions</NavLink>
                    </div>
                </div>

                {this.props.children}

                <Footer />
            </div>
        )
    }
}

export default Legal