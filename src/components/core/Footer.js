import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
import faMedium from '@fortawesome/fontawesome-free-brands/faMedium'
import faInstagram from '@fortawesome/fontawesome-free-brands/faInstagram'
import faRedditAlien from '@fortawesome/fontawesome-free-brands/faRedditAlien'

class Footer extends Component {
    render() {
        return (
            <footer className="pt-5" style={{ backgroundColor: this.props.backgroundColor }}>
                <div className="container">

                    <div className="row">

                        <div className="col-12 col-md-3 col-lg-4 text-center text-md-left">
                            <img src="/img/footer-logo.svg" alt="Cointec Logo" className="mb-1" />
                            <div className="col-12 mt-3 pr-0 d-flex flex-row justify-content-center justify-content-md-start pl-4 pl-md-0">
                                <a href="https://twitter.com/cointec">
                                    <FontAwesomeIcon icon={faTwitter} className="mr-4" />
                                </a>
                                <a href="https://www.instagram.com/cointec">
                                    <FontAwesomeIcon icon={faInstagram} className="mr-4" />
                                </a>
                                <a href="https://medium.com/@Cointec">
                                    <FontAwesomeIcon icon={faMedium} className="mr-4" />
                                </a>

                                {/*
                                <img src="/img/twitter.svg" alt="" className="mr-4" />
                                <img src="/img/twitter.svg" alt="" className="mr-4" />
                                <img src="/img/twitter.svg" alt="" className="mr-4" />
                                */}
                            </div>
                        </div>

                        <div className="col-12 col-md-9 col-lg-6">
                            <div className="row text-center text-md-left mt-2 mb-3">

                                <div className="col-12 col-md-4 mt-5 mt-md-0">
                                    <h5 className="menu-heading">Information</h5>
                                    <Link to='/'>
                                        Home
                                    </Link>

                                    <Link to='/learn'>
                                        {/* Support */}
                                        Learn
                                    </Link>

                                    <Link to='/'>
                                        {/* Development */}
                                        Charts
                                    </Link>
                                </div>

                                <div className="col-12 col-md-4 mt-5 mt-md-0">
                                    {/* <h5 className="mb-4">Follow us</h5> */}
                                    <h5 className="menu-heading">Support</h5>
                                    <a href="https://intercom.help/cointec-test">Helpdesk</a>
                                    <a href="#livechat">Live chat</a>
                                    {/* <a href="https://twitter.com/cointec" className="cta-text mb-2">
                                        Twitter
                                    </a>

                                    <a href="https://www.instagram.com/cointec" className="cta-text mb-2">
                                        Instagram
                                    </a>

                                    <a href="https://medium.com/@Cointec" className="cta-text mb-2">
                                        Medium
                                    </a> */}
                                </div>

                                <div className="col-12 col-md-4 mt-5 mt-md-0">
                                    <h5 className="menu-heading">Legal</h5>
                                    <Link to='/privacy'>
                                        Privacy Policy
                                    </Link>

                                    <Link to='/terms'>
                                        Terms of Service
                                    </Link>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
                <hr />
                <div className="container text-center text-md-left">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <p>
                                &copy; Cointec ltd 2018
                            </p>
                        </div>
                        <div className="col-12 col-md-8">
                            <p className="px-2 px-sm-5 px-md-0">
                                Cointec Ltd is a company registered in England and Wales (No. 08804411)
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

Footer.propTypes = {
    backgroundColor: PropTypes.string
}

Footer.defaultProps = {
    backgroundColor: '#F7F9FA'//'#F6F9FC'
}

export default Footer