import React, { Component } from 'react'

class UserReviews extends Component {
    render() {
        return (
            <div className="bg-gradient bg-light-gradient py-2 py-md-5">
                <div className="hear-user-wrapper ">
                    <div className="container">

                        <div className="row">
                            <div className="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto text-center">
                                <h2 className="mb-5 users-title">
                                    Hear from our users.
                                </h2>

                                <p className="cta-text d-none d-md-flex  mb-5">
                                    Our platform is built with a focus on customer experience, that’s why users love us. Hear what they are saying!
                                </p>
                            </div>
                        </div>


                        <div className="owl-carousel owl-theme">

                            <div className="col-md-4 item">
                                <div className="cta-card">
                                    I’ve used many other websites to buy Bitcoins but Cointec makes it so easy and smooth to purchase. Sample dummy text placed here.

                                    <div className="card-user d-flex align-items-center mt-4">
                                        <img src="/img/avatar.png" alt="" className="user-avatar" />
                                        <div className="user-full-name text-primary ml-3">
                                            Anna Smith
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-4 item">
                                <div className="cta-card">
                                    I’ve used many other websites to buy Bitcoins but Cointec makes it so easy and smooth to purchase. Sample dummy text placed here.

                                    <div className="card-user d-flex align-items-center mt-4">
                                        <img src="/img/avatar.png" alt="" className="user-avatar" />
                                        <div className="user-full-name text-primary ml-3">
                                            Anna Smith
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-4 item">
                                <div className="cta-card">
                                    I’ve used many other websites to buy Bitcoins but Cointec makes it so easy and smooth to purchase. Sample dummy text placed here.

                                    <div className="card-user d-flex align-items-center mt-4">
                                        <img src="/img/avatar.png" alt="" className="user-avatar" />
                                        <div className="user-full-name text-primary ml-3">
                                            Anna Smith
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserReviews