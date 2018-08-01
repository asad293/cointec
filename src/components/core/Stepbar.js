import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-custom navbar-expand-lg navbar-dark px-0 py-3 py-md-3">
          <Link className="navbar-brand" to='/'>
            <img src="/img/Logo.svg" className="img-fluid mx-auto d-block" alt="Logo" />
          </Link>

          {/* <button className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <img
              className="currency-symbol"
              src="/img/menu-icon.svg"
              alt="Menu Icon" />
          </button> */}

          <div className="multistep-wrapper">
            <ul className="multistep-bar">
              <li className="active"><label>Amount</label></li>
              <li><label>Summary</label></li>
              <li><label>Payment</label></li>
            </ul>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav w-100 justify-content-end align-items-lg-center">
              <li className="nav-item">
                <Link className="nav-link" to='/'>
                  <i className="far fa-times"></i>
                </Link>
              </li>                       
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar