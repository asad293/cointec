import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Subscribe extends Component {
  render() {
    return (
      <div className="bg-gradient bg-primary-gradient-up py-2 py-md-2">

        <div className="start-buying-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8 col-lg-6 mx-auto text-center">

                <h2 className="start-buying-title text-white">
                  {/* Subscribe for <strong>early access.</strong> */}
                  Get started today
                </h2>

                <div className="form-group mb-2">
                  <button
                    className="btn btn-outline-success py-2 px-4" onClick={() => this.props.history.push('/signup')}>
                    {/* data-toggle="modal"
                    data-target="#subscribe-modal"> */}
                    Create an account
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

export default withRouter(Subscribe)