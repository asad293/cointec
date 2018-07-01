import React, { Component } from 'react'

class Subscribe extends Component {
  render() {
    return (
      <div className="bg-gradient bg-primary-gradient-up py-2 py-md-2">

        <div className="start-buying-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8 col-lg-6 mx-auto text-center">

                <h2 className="start-buying-title mb-5 text-white">
                  Subscribe for <strong>early access.</strong>
                </h2>

                <div className="form-group mb-2">
                  <button
                    className="btn btn-success py-2 px-4 col-sm-4"
                    data-toggle="modal"
                    data-target="#subscribe-modal">
                    Subscribe
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Subscribe