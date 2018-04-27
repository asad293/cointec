import React, { Component } from 'react'
import { formValueSelector, Field, reduxForm } from 'redux-form'
import cn from 'classnames'
import './style.css'

class ReviewForm extends Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount() {

    }

    handleClick(e) {
        console.log(e)
        this.props.callback()
    }

    render() {
        var titles = {
            0:  {
                'title': 'You Receieve',
                'value': '1.43BTC',
            },
            1:  {
                'title': 'Exchange Rate',
                'value': '1.43BTC'
            },
            2: {
                'title': 'You Pay',
                'value': '1.43BTC'
            }
        }
        var titleList = Object.values(titles).map(function(key) {
            return (
                <div className="row">
                    <div className="col-md-6">
                        <h5>{key.title}</h5>
                    </div>
                    <div className="col-md-6">
                        <h5>{key.value}</h5>
                    </div>
                </div>
            )
        })

        return(
            <form>
                <div className="wrapper">
                    <div className="row">
                        <div className="col-md-12">
                            <span onClick = {this.handleClick}className="back glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
                            <h4 className="inline-headers ml-sm">Review and confirm order</h4>
                        </div>
                    </div>
                    <hr />
                    { titleList }
                    
                    <div className = "row flex-center">
                            <div className="col-md-6">
                                <h5>Send from</h5>
                            </div>
                            <div className="col-md-6">
                                <Field name="Send from" component="select">
                                    <option value="ff0000">XXX</option>
                                    <option value="00ff00">XX2</option>
                                    <option value="0000ff">XX3</option>
                                    <option value="0000ff">Add a new bank</option>
                                </Field>
                            </div>
                    </div>
                    <div className = "row">
                        <div className = "col-md-12">
                            <h5>External wallet address</h5>
                        </div>
                        <div className = "col-md-12">
                            <label>abcsdasd123sasf</label>
                        </div>
                    </div>
                    <div className = "row bt-margin">
                        <div className = "col-md-12">
                            <button type="submit" className={cn('btn-block btn-lg')}>Continue</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default ReviewForm