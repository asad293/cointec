import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { NavLink } from 'react-router-dom'

import Header from '../core/Header'
import Navbar from '../core/Navbar'
import Footer from '../core/Footer'

import GettingStarted from "../views/GettingStarted";
import Terminology from "../views/Terminology";

class Learn extends Component {
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
                                    <h1 className="legal-heading">Digital currency 101</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Hero Section End */}

                </Header>

                <div className="tabs-bar">
                    <div className="tabs d-flex justify-content-center">
                        <NavLink className="tab" to="/getting-started" activeClassName="active">Getting Started</NavLink>
                        <NavLink className="tab" to="/terminology" activeClassName="active">Terminology</NavLink>
                    </div>
                </div>

                <Switch>
                    <Route path="/getting-started" component={GettingStarted} />
                    <Route path="/terminology" component={Terminology} />
                </Switch>

                <Footer />
            </div>
        )
    }
}

export default Learn