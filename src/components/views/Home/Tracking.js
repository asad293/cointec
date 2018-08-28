import React from 'react'
import { Link } from 'react-router-dom'

const Tracking = () => (
  <div className="bg-gradient bg-mid-gradient">
    <div className="home-section container px-4">
      <div className="row flex-column-reverse flex-md-row">
        <div className="col-12 col-md-6 pr-md-0 pr-lg-5 mt-4 mt-md-0">
          <div className="d-flex justify-content-between transaction-row px-4 sent">
            <div>
              <i className="far fa-check fa-lg mr-3"></i> Digital currency sent
            </div>
            <div>17:05PM</div>
          </div>
          <div className="d-flex justify-content-between transaction-row px-4 mt-4 pro">
            <div>
              <i className="far fa-check fa-lg mr-3"></i> We received payment
            </div>
            <div>17:02PM</div>
          </div>
          <div className="d-flex justify-content-between transaction-row px-4 mt-4 pro">
            <div>
              <i className="far fa-check fa-lg mr-3"></i> You sent payment
            </div>
            <div>17:00PM</div>
          </div>
          <div className="text-center mt-4 mt-md-0">
            <Link to='/' className="d-md-none">Learn about blockchain</Link>
          </div>
        </div>
        <div className="col-12 col-md-6 px-4 px-md-5 text-center text-md-left">
          <h4 className="section-title mt-2 d-none d-md-block">
            Receive your digital currencies in minutes, track every step.
          </h4>
          <h4 className="section-title d-md-none">
            Receive your coins in minutes.
          </h4>
          
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris.
          </p>

          <Link to='/' className="d-none d-md-inline">Learn about blockchain</Link>
        </div>
      </div>
    </div>
  </div>
)

export default Tracking