import React, { Component } from 'react'

class StartBuying extends Component {
    render() {
        return (
            <div className="bg-gradient bg-primary-gradient-up py-2 py-md-5">

                <div className="start-buying-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-8 col-lg-6 mx-auto text-center">
                                <h2 className="start-buying-title mb-5 text-white">
                                    Start buying <strong>Bitcoins</strong> today
                                </h2>

                                <div className="start-buying-email-wrapper">
                                    <form className="d-flex justify-content-center">
                                        <div className="form-group mb-2 d-none d-md-block col-md-8">
                                            <label htmlFor="staticEmail" className="sr-only">Email</label>
                                            <input type="email" className="form-control py-2" id="staticEmail" placeholder="Enter your email" />
                                        </div>
                                        
                                        <div className="form-group mb-2">
                                            <button type="submit" className="btn btn-success py-2 px-4">Get Started</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default StartBuying