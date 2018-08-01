import React, { Component } from 'react'

class ProcessingOrder extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="wrapper-320">
        <div className="wrapper">
          <div className="row">
            <div className="col-md-12">
              <h4 className="inline-headers">Processing order</h4>
              <span onClick={this.handleClick} className="remove glyphicon glyphicon-remove" aria-hidden="true"></span>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            <div className="col-md-12">
              <p className="info">This should not take longer than 5 minutes. You can also view the status of your order from the <a>transaction history</a>.</p>
            </div>
            <div className="col-md-12">
              <label className="wallet-label">{this.props.wallet}</label>
            </div>
          </div>
          <div className="row bt-margin">
            <div className="col-md-12">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProcessingOrder
