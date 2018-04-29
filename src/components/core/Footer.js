import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Footer extends Component {
    render() {
        return (
            <footer className="pt-5" style={{ backgroundColor: this.props.backgroundColor }}>
                <div className="container">

                    <div className="row">

                        <div className="col-12 col-md-3 col-lg-6">
                            <img src="./img/logo-color.svg" alt="Cointec Logo" className="mb-5" />
                        </div>

                        <div className="col-12 col-md-9 col-lg-6">
                            <div className="row">

                                <div className="col-6 col-sm-4">
                                    <h5 className="mb-4">Information</h5>
                                    <Link className="cta-text mb-2" to='/'>
                                        Home
                                    </Link>

                                    <Link className="cta-text mb-2" to='/support'>
                                        Support
                                    </Link>

                                    <Link className="cta-text mb-2" to='/'>
                                        Development
                                    </Link>
                                </div>

                                <div className="d-none d-sm-block col-sm-4">
                                    <h5 className="mb-4">Follow us</h5>
                                    <a href="#" className="cta-text mb-2">
                                        Twitter
                                    </a>

                                    <a href="#" className="cta-text mb-2">
                                        Reddit
                                    </a>

                                    <a href="#" className="cta-text mb-2">
                                        Medium
                                    </a>
                                </div>

                                <div className="col-6 col-sm-4">
                                    <h5 className="mb-4">Legal</h5>
                                    <Link className="cta-text mb-2" to='/privacy'>
                                        Privacy Policy
                                    </Link>

                                    <Link className="cta-text mb-2" to='/terms'>
                                        Terms of Service
                                    </Link>
                                </div>

                            </div>
                        </div>

                    </div>


                    <div className="row d-md-none">
                        <div className="col-12 mt-4 d-flex flex-row">
                            <a href="https://twitter.com/cointecuk">
                                <i className="fab fa-twitter mr-4"></i>
                            </a>
                            <a href="https://medium.com/@Cointec">
                                <i className="fab fa-medium-m mr-4"></i>
                            </a>
                            <a href="https://www.reddit.com/user/Cointec">
                                <i className="fab fa-reddit-alien mr-4"></i>
                            </a>

                            {/*
                            <img src="./img/twitter.svg" alt="" className="mr-4" />
                            <img src="./img/twitter.svg" alt="" className="mr-4" />
                            <img src="./img/twitter.svg" alt="" className="mr-4" />
                            */}
                        </div>
                    </div>


                    <div className="row pt-4">
                        <div className="col-sm-6">
                            <p>
                                &copy; 2018 Cointec Ltd
                            </p>
                        </div>
                        <div className="col-sm-6 text-left">
                            <p>
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
    backgroundColor: '#F6F9FC'
}

export default Footer