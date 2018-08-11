import React, { Component } from 'react'
import PropTypes from 'prop-types';

class CompleteOrder extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="wrapper-320">
        <div className="wrapper">
          <div className="row">
            <div className="col-md-12">
              <h4 className="inline-headers">Order successful</h4>
              <span onClick={this.handleClick} className="remove glyphicon glyphicon-remove" aria-hidden="true"></span>
            </div>
          </div>
          <hr />
          <div className="row">
            <div class="complete-ring"></div>
            <div className="col-md-12">
              <p className="info text-center">Your bitcoins are on the way!</p>
              <p className="info text-center"> <a href={`https://live.blockcypher.com/btc-testnet/tx/${this.props.txnID}`}>See it on the Blockchain.</a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CompleteOrder.propTypes = {
  txnID: PropTypes.number,
}

export default CompleteOrder
