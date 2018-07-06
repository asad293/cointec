import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-custom navbar-expand-lg navbar-dark px-0 py-3 py-md-4">
                    <Link className="navbar-brand" to='/'>
                        <img src="/img/Logo.svg" className="img-fluid mx-auto d-block" alt="Logo" />
                    </Link>

                    <button className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                        {/* <span className="navbar-toggler-icon"></span> */}
                        <img
                            className="currency-symbol"
                            src="/img/menu-icon.svg"
                            alt="Menu Icon"
                          />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav w-100 justify-content-end align-items-lg-center">
                            <li className="nav-item">
                                <Link className="nav-link" to='/'>
                                    Home<span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to='/'>Features</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" to='/#livechat'>Support</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/getting-started'>Learn</Link>
                            </li>
                            {/*<li className="nav-item">
                                <Link className="nav-link" to='/login'>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to='/signup'>Sign up &nbsp;<img src="/img/arrow-right.svg" alt="Sign up" /></Link>
                            </li>*/}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar