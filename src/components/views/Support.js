import React, { Component } from 'react'

import Header from '../core/Header'
import Navbar from '../core/Navbar'
import Footer from '../core/Footer'
import { Accordion, Panel } from '../core/Accordion'

class Support extends Component {
    constructor() {
        super()
        this.state = {
            faqs: [
                {
                    question: 'What is Cointec?',
                    answer: 'Cointec is the trading name of Cointec LTD, a UK start up specialized in making digital currency accessible to everyone.<br><br>We connect buyers to only the most trusted and responsive brokers around the country to deliver a fast and reliable experience.<br><br>Our platform is built by early cryptocurrency enthusiasts with experience also in the technology and payments industries.'
                },
                {
                    question: 'Who can order?',
                    answer: 'Cointec is the trading name of Cointec LTD, a UK start up specialized in making digital currency accessible to everyone.<br><br>We connect buyers to only the most trusted and responsive brokers around the country to deliver a fast and reliable experience.<br><br>Our platform is built by early cryptocurrency enthusiasts with experience also in the technology and payments industries.'
                },
                {
                    question: 'What payment methods do you accept?',
                    answer: 'In order to make sure brokers received funds and release coins immediately we only allow users to send Bank-transfers with faster-payments enabled bank accounts.<br><br>Faster Payments is the UK’s 24/7 Real Time Payment System that allows individuals and businesses to make near instant payments.<br><br>Today the majority of UK bank accounts that offer online-banking make use of Faster Payments.<br><br>You can check if your bank account is enabled on the official website.'
                },
                {
                    question: 'Do you store any Bitcoins on your platform?',
                    answer: 'No, for security reasons, we don\'t store any currencies of any form at all.<br><br>We are a Peer-To-Peer platform that connects you to a professional digital asset vendor. Once you order with cryptomonster, the trade is between two professional individuals on our platform. Our job is to ensure that the platform runs smoothly, all vendors are monitored & the growth of our platform continues.<br><br>Using Peer-To-Peer methodology, your funds aren\'t \'stored\' anywhere during transit and therefore cannot be stolen. Funds are proccessed once an order is fully paid for to the individual Vendor, not before, and subsequently sent to the destination wallet you provide immediately there after.'
                },
                {
                    question: 'How do I increase my order limit?',
                    answer: 'Cointec is currently in Beta testing where the maximum daily limit for all verified users is £250. Once the stable version is released, your order limit will be determined by xyz.'
                },
                {
                    question: 'Help! My order has been cancelled',
                    answer: 'Your order was cancelled because we did not receive your payment within the 5 minute window after you pressed the ‘I have made payment’ button. Any funds received after the 5 minute window will be returned to the same account within 1-2 business days. If you believe your order was cancelled for another reason, please contact support.'
                },
                {
                    question: 'How do I create a Bitcoin wallet',
                    answer: 'In order to buy Bitcoins on our platform you must already have an external Bitcoin wallet. We recommend using hardware wallets such as Ledger Nano S and TREZOR as these provide the most security.'
                },
                {
                    question: 'What cryptocurrencies can I buy on Cointec?',
                    answer: 'Cointec is currently in Beta testing where users can only buy Bitcoins. However, we plan to offer multiple cryptocurrencies as part of the stable release.'
                },
                {
                    question: 'How do I buy Bitcoins?',
                    answer: `Buying Bitcoins on Cointec is easy. Follow the steps below to get started.<br><br>
                        1. Create an accout<br>
                        2. Get verified by telling us a little about yourself<br>
                        3. Use our calculator on the home page to start buying
                    `
                },
                {
                    question: 'What forms of ID are acceptable?',
                    answer: `<ul>
                        <li>Passport</li>
                        <li>Full driving licence (photocard)</li>
                        <li>Provisional driving license (photocard)</li>
                    </ul>
                    <p>IDs must be in date at the time of upload. For passports please upload the entire photo page, for all other forms of ID a scan of just the front is acceptable.</p>
                    `
                },
                {
                    question: 'What documents are accepted as proof of address?',
                    answer: `<ul>
                        <li>Council tax bill</li>
                        <li>TV license</li>
                        <li>TV provider bill</li>
                        <li>Internet provider bill</li>
                        <li>Utility bill</li>
                        <li>Mortgage statement</li>
                        <li>Mobile Phone bill</li>
                        <li>Bank statement</li>
                    </ul>
                    <p>All documetns must be dated with the last 3 months. If docments are digital formats (e.g. PDF bank statements) they must be the original downloaded file.</p>
                    `
                },
                {
                    question: 'How do I take an ID selfie?',
                    answer: `<ul>
                        <li>Face the camera</li>
                        <li>Hold a valid ID and ensure it is visible</li>
                        <li>Hold a note with the following in writing, “Cointec” followed by your name and current date. Ensure the note is visible</li>
                    </ul>`
                },
                {
                    question: 'What fees can I expect to pay?',
                    answer: 'You will only ever deal with a competitive exchange rate, with no fees involved. We take our commission from the brokers who sell on our platform.'
                },
                {
                    question: 'How long can will it take to receive my Bitcoins?',
                    answer: 'Once we have recieved your payment, your Bitcoins will be sent instantly to your external wallet. The time it takes for the Bitcoins to show up in your wallet will depend on how the fast the transaction gets confirmed. You can check your transaction\'s confirmation status and other payment details on any blockchain explorer.'
                },
            ]
        }
    }
    
    render() {
        return (
            <div>
                <Header>
                    <Navbar />
                    

                    {/* Hero Section */}
                    <div className="container">
                        <div className="hero-wrapper">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="support-heading">FAQ's and support</h1>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <form className="row d-flex justify-content-center">
                                        <div className="search-bar mb-2 d-md-block col-md-8">
                                            <input type="text" className="py-2" placeholder="Type your question here" />
                                            <img src="./img/search.svg" alt="search" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Hero Section End */}

                </Header>

                <div className="bg-gradient bg-mid-gradient support-content">
                    <div className="container mb-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8 col-md-12">
                                <Accordion>
                                    {
                                        this.state.faqs.map((faq, index) => <Panel id={index} 
                                            key={index} 
                                            heading={faq.question} 
                                            body={faq.answer} />)
                                    }
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer backgroundColor={'white'} />
            </div>
        )
    }
}

export default Support