import React, { Component } from 'react'

class PrivacyPolicy extends Component {
    render() {
        return (
            <div className="py-5">
                <div className="container pb-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8 col-md-12 privacy">
                            <h5 className="last-updated">Last updated: 22nd December, 2017</h5>
                            
                            <p>By using our website(s) or other services in any capacity you agree to the terms below, outlining the handling of personal information, as well as to our general terms and condition.</p>
                            <p>Cointec Ltd is a registered data controller, registration number <b>ZA304564</b> with the Information Commissioner’s Office. You can <a href="#">view our registration here.</a></p>
                            <p>Cointec Ltd, hereafter referred to as “we”, “the platform” or simply “Cointec”, is legally required to process personal information in accordance with the Data Protection Act 1998 and to also inform parties interacting with the platform of the manner in which their personal information is processed.</p>
                            
                            <h6>1. Personal information collected</h6>
                            <p>Cointec intends to collect the minimum information required to provide our services.</p>

                            <h6 className="sub-heading">Client information</h6>
                            <p>Upon visiting our website or other platforms we collect your IP address, information about the type of browser you are using, which pages you visit and your geolocation.</p>
                            <h6 className="sub-heading">Account information</h6>
                            <p>To open an account we will collect your full name, e-mail address and mobile number. This information may also be used internally to send announcements, surveys, newsletters and marketing material.</p>
                            <h6 className="sub-heading">Identification information</h6>
                            <p>In order to verify your identity and comply with AML legislation and KYC regulation we will collect any information contained in IDs or proof of address. This can include, but is not limited to, your address, date of birth and governmental issued verification numbers.</p>
                            <h6 className="sub-heading">Payment information</h6>
                            <p>We may collect information about debit/credit card numbers and bank accounts used on our platform.</p>
                            <h6 className="sub-heading">Trade information</h6>
                            <p>To detect fraud and track platform usage we will collect information about the time, size, price, frequency and type of orders.</p>
                            <h6 className="sub-heading">Sensitive information</h6>
                            <p>Cointec will never collect information on your ethnic origin, race, political opinions, or religious beliefs. In some circumstances, such as when applying for a increase in your trading limit, we may ask for details and or proof of your employment status or means of income.</p>

                            <h6>2. Disclosure of personal information</h6>
                            <p>Cointec is committed to maintaining the privacy of all users and will only share your personal information with third parties under the following circumstances:</p>
                            <ul>
                                <li>To fulfil a legal obligation or to comply with other regulatory, governmental or judicial requirements.</li>
                                <li>To use automated mass e-mail services we may share your first name and e-mail address.</li>
                                <li>To match orders with brokers and or other counterparties we may share your payment details.</li>
                                <li>To enable information with identity verification services and credit bureau to verify your identity in line with AML / KYC regulations we may share your identification.</li>
                                <li>To prevent fraudulent transactions we may share both trade and client information with payment service providers.</li>
                            </ul>

                            <h6>3. Storage of personal information</h6>
                            <p>Data containing personal information is stored securely on our servers in an encrypted state where necessary. Where appropriate, data will only be decrypted offline.</p>
                            <p>Some of your personal information may be held outside the EEA by our partners whom are deemed to provide to provide an adequate level of data .protection. Said information will be minimal and anonymized.</p>
                            <p>In accordance with the legislation presented below we are required to keep a record of your personal information for a period of five years from the date of your final transaction or account closure.</p>
                            <ul>
                                <li>UK Money Laundering, Terrorist Financing and Transfer of Funds Regulations 2017</li>
                                <li>Money Laundering Regulations 2007 (SI 2007 No. 2157)</li>
                            </ul>
                            <p>Subject to a small administrative fee, you may request the information held about you by Cointec at any time.</p>

                            <h6>4. Updates to our Privacy Policy</h6>
                            <p>We may modify this Privacy Policy. The “Last updated” timestamp at the top of this Privacy Policy indicates when this Privacy Policy was last revised. You will be notified by e-mail whenever an updated version of this privacy policy is issued.</p>

                            <h6>5. Contact</h6>
                            <p>For any related enquires please contact us at <a href="mailto:support@cointec.co.uk">support@cointec.co.uk</a> or at:</p>
                            <p>
                                Kemp House<br />
                                152-160 City Road<br />
                                London<br />
                                EC1V 2NX
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PrivacyPolicy