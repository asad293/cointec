import React, { Component } from 'react'

import Header from '../core/Header'
import Navbar from '../core/Navbar'
import Footer from '../core/Footer'
import Sidebar from './Legal/Sidebar'

class Terms extends Component {
	render() {
		return (
			<div className="learn-page">
				<Header background="gradient">
					<Navbar />
					<hr className="hr-header m-0" />

					{/* Hero Section */}
					<div className="container">
						<div className="hero-wrapper hero-wrapper-inner">
							<div className="row">
								<div className="col-md-12">
									<h1 className="learn-heading dc-basics-heading">
										Terms and conditions
									</h1>
								</div>
							</div>
						</div>
					</div>
					{/* Hero Section End */}
				</Header>

				<section className="page-content dc-glossary container">
					<div className="row">
						<div className="col-12 col-lg-8">
							<div className="privacy-policy-wrapper">
								<h5 className="last-updated">Last updated: 13 Aug 2018</h5>
								<p>
									By using our website(s) or other services in any capacity you
									agree to the terms below, outlining the handling of personal
									information, as well as to our general terms and condition.
								</p>
								<p>
									Cointec Ltd is a registered data controller, registration
									number ZA304564 with the Information Commissioner’s Office.
									You can view our registration here.
								</p>
								<p className="pb-1">
									Cointec Ltd, hereafter referred to as “we”, “the platform” or
									simply “Cointec”, is legally required to process your (the
									data subject’s) personal information in accordance with Data
									Protection Act 2018 and the European Union’s General Data
									Protection Act.
								</p>
								<h6 className="mt-4 mb-2">YOUR DATA</h6>
								<p className="mb-4">
									User Privacy is of the utmost importance and we aim to be as
									transparent as possible. This policy sets out what data we
									collect from and about you, how we use it and what control
									your have over your data, with regards to viewing, exporting,
									updating, and erasing it.
								</p>
								<h6 className="pt-3">1. INFORMATION COLLECTED AND HOW WE USE IT</h6>
								<p>
									Cointec intends to collect the minimum information required to
									provide our services. As you interact with the platform we may
									collect personal information from you directly or about you,
									from third-party sources.
								</p>
								<h6 className="sub-heading">Client information</h6>
								<p>
									Upon visiting and using the platform we may collect the
									following information about you automatically:
								</p>
								<ul>
									<li>
										Log Information, including your browser type, access times,
										IP address, pages viewed and your geolocation.
									</li>
									<li>
										Device Information, including your device’s hardware model,
										operating system and version.
									</li>
								</ul>
								<p>
									We collect this information to analyse our user demographic
									and to monitor suspicious activity.
								</p>

								<h6 className="sub-heading">Account information</h6>
								<p>
									To provide account services we collect your e-mail address and
									may use this along with your mobile number to share Cointec
									marketing material and updates.
								</p>
								<h6 className="sub-heading">Identity information</h6>
								<p>
									We will collect your full name, date of birth, residence and
									address and may collect any information contained in IDs or
									proof of address provided such as governmental issued
									verification numbers. We share this information with
									third-party identity verification services to verify your
									identity in line with AML legislation and KYC regulation.
								</p>
								<h6 className="sub-heading">Payment information</h6>
								<p>
									We collect your name, account number and sort-code and may
									share these bank details with trade counterparties to fulfil
									orders and to refund orders. We use your sort-code to identify
									your banking provider and account type. Our payment service
									partners may collect debit/credit details on our behalf to
									process card payments.
								</p>
								<p>
									To detect fraud and track platform usage we will collect
									information about the time, size, price, frequency and type of
									orders. This data is analysed internally and may also be
									shared with payment service providers for fraud detection
									purposes.
								</p>
								<h6 className="sub-heading">Sensitive information</h6>
								<p className="mb-4">
									Cointec will never collect information on your ethnic origin,
									race, political opinions, or religious beliefs. In some
									circumstances, such as when applying for an increase in your
									trading limit, we may ask for details and or proof of your
									employment status or means of income to carry out due
									diligence on the source of funds used to trade.
								</p>

								<h6 className="pt-3">2. STORAGE OF PERSONAL INFORMATION</h6>
								<p>
									Data containing personal information is stored securely on our
									servers in an encrypted state where necessary. Where
									appropriate, data will only be decrypted offline.
								</p>
								<p>
									In accordance with the legislation presented below we are
									required to keep a record of your personal information, copies
									of identity documents and details of transactions for a period
									of five years from the date of your final transaction or
									account closure.
								</p>

								<ul className="mb-4">
									<li>
										UK Money Laundering, Terrorist Financing and Transfer of
										Funds Regulations 2017
									</li>
									<li>Money Laundering Regulations 2007 (SI 2007 No. 2157)</li>
								</ul>

								<h6 className="pt-3">3. CONTROL OVER YOUR DATA</h6>
								<h6 className="sub-heading">Accessing your data</h6>
								<p>
									You may request at any time, via e-mail or our website
									dashboard to receive an electronic copy of all the personal
									information held about you.
								</p>

								<h6 className="sub-heading">Updating your data</h6>
								<p>
									You may request at any time, via e-mail or our website
									dashboard to update the personal information held about you by
									us.
								</p>

								<h6 className="sub-heading">Exporting your data</h6>
								<p>
									You may request at any time, via e-mail or our website
									dashboard to receive an electronic copy of all the personal
									information held about you.
								</p>

								<h6 className="sub-heading">Restricting access to your data</h6>
								<p>
									You may manage, via the website dashboard, what we can use
									your personal information for, such as opting out of receiving
									specific correspondence and marketing material.
								</p>

								<h6 className="sub-heading">Erasing your data</h6>
								<p className="mb-4">
									You may withdraw consent to the use of your data by closing
									your account, via e-mail or our website dashboard. We will
									erase all personal information held about you (to the extent
									that we are permitted by law) within 14 days of your request.
								</p>

								<h6 className="pt-3">4. UPDATES TO OUR PRIVACY POLICY</h6>
								<p>
									We may modify this Privacy Policy. The “Last updated”
									timestamp at the top of this Privacy Policy indicates when
									this Privacy Policy was last revised. You will be notified by
									e-mail whenever an updated version of this privacy policy is
									issued.
								</p>

								<h6>Contact</h6>
								<p>
									For any related enquires please contact us at{' '}
									<a href="mailto:contact@cointec.co.uk">
										contact@cointec.co.uk
									</a>{' '}
									or at:
								</p>
								<p>
									Kemp House
									<br />
									152-160 City Road
									<br />
									London
									<br />
									EC1V 2NX
								</p>
							</div>
						</div>
						<div className="col-4 d-none d-lg-block">
							<Sidebar />
						</div>
					</div>
				</section>

				<Footer />
			</div>
		)
	}
}

{/* <div className="privacy-content py-5">
	<div className="container pb-5">
		<div className="row d-flex justify-content-center">
			<div className="col-lg-8 col-md-12 terms">
				<h5 className="last-updated">Last updated: July 04, 2018</h5>

				<p>
					The following is a contract between Cointec LTD, a company
					incorporated in England & Wales (reg no. 11104052), hereinafter
					referred to as “we”, “us” or “the platform” and the contractual
					party, referred to as “you”, “the user” or collectively as
					“users”.
				</p>
				<p>
					Cointec offers a service that allows users in the UK to buy,
					sell and exchange digital currencies.
				</p>

				<ol>
					<li>
						<h6>Contract</h6>
						<ol>
							<li>
								By using this website, registering an account or using any
								services offered by the platform you agree that you have
								read, understood, acknowledged and accepted all of the
								terms within this agreement.
							</li>
							<li>
								If you do not agree to the terms of use and, by extension,
								our privacy policy, you must not use our site or services.
							</li>
						</ol>
					</li>

					<li>
						<h6>General</h6>
						<ol>
							<li>
								Users must comply with the laws and regulations of the
								country in which they access our services from.
							</li>
							<li>
								Users agree to never access our website via public
								computers or networks including wi-fi or otherwise.
							</li>
							<li>
								Users take full responsibility for ensuring any hardware
								or equipment they use to access our services are free of
								viruses, keyloggers, malware or other software that could
								compromise their own security or the platform’s.
							</li>
							<li>
								The cointec logo(s) are{' '}
								<a href="https://trademarks.ipo.gov.uk/ipo-tmcase/page/Results/1/UK00003283603">
									registered
								</a>{' '}
								trademarks and the intellectual property of Cointec LTD.
							</li>
							<li>
								Users will not copy, remove, replicate or download any
								images, designs, trademarks, logos, data or code hosted on
								or connected to our platform.
							</li>
							<li>
								Users will not misuse our website or the platform by
								marketing misleadingly, spamming, hacking or attacking.
							</li>
							<li>
								Users have the right to use our services in accordance
								with the terms outlined in this agreement.
							</li>
						</ol>
					</li>

					<li>
						<h6>Registering an account</h6>
						<ol>
							<li>
								To be eligible for an account, users must be over the age
								of 18 and a UK resident. If the applicant is below the age
								of 18.
							</li>
							<li>
								Details provided by the user for the purposes of
								registering an account, or otherwise, must be real, up to
								date and accurate. Accounts created using inaccurate
								details, false identities or under names of third parties
								who have not authorized the applicant will immediately be
								terminated and the details passed on to fraud prevention
								and other relevant authorities.
							</li>
							<li>
								Each user is allowed to create and hold only one account
								under their name. Discovery of multiple accounts used by
								the same individual will result in termination of all
								accounts held.
							</li>
							<li>
								We reserve the right to deny opening of accounts and to
								close accounts without specifying why.
							</li>
						</ol>
					</li>

					<li>
						<h6>Payments</h6>
						<ol>
							<li>
								Payments must only be made from bank accounts held in the
								account user’s names. Users who add or pay from bank
								accounts not under their registered name are in violation
								of this user agreement.
							</li>
							<li>
								Bank transfers must only be made via Faster Payments using
								online-banking. Bank transfers initiated by telephone
								banking, in-branch or in any other way are considered
								violation of this user agreement.
							</li>
							<li>
								Users must only add or make payments from bank accounts
								that are enabled by Faster Payments. Users must not make
								payments from banks that prohibit digital currency
								trading, banks that obfuscate the sender’s name or banks
								that delay or batch payments, even if payments are sent
								via Faster Payments.
							</li>
							<li>
								Users must only trade using funds that they solely own.
								Users must not pay using overdrafts, loans or any form of
								credit.
							</li>
							<li>
								Bank transfers must be made with the correct reference
								provided. Transfers made without the correct references
								will nullify this user agreement and give us the right to
								cancel orders.
							</li>
							<li>
								Users must not mention any terms relating to digital
								currencies as references for bank transfers as this can
								cause complications with the banks of both counterparties
								and result in failed transfers .Any users found doing so
								will be banned from the platform and their agreement with
								the platform will be terminated.
							</li>
							<li>
								Any unexpected costs incurred by Cointec for receiving
								payments via bank transfer will be recovered from the
								user.
							</li>
							<li>
								Any losses incurred by Cointec as a result of bank’s
								recovering unauthorised funds will be passed on to the
								user.
							</li>
						</ol>
					</li>

					<li>
						<h6>Orders</h6>
						<ol>
							<li>
								Users ordering on the platform understand the financial
								risk involved in buying digital currencies. The user
								accepts that he or she is solely responsible for any
								financial losses incurred during the completion of orders
								on our platform or outside.
							</li>
							<li>
								Fulfilment of orders is not guaranteed and depends on a
								number of factors including but not limited to:
								availability of trade counterparties, availability of
								digital currency supply, market conditions and
								availability of our systems.
							</li>
							<li>
								Rates displayed in the order preview on the homepage or
								elsewhere are not guaranteed. The user accepts that there
								may be small differences between the amount of digital
								currency displayed in the confirmation and the amount
								received.
							</li>
							<li>
								If the user fails to initiate the bank transfer or digital
								currency deposit in the allotted time period after
								confirming their order, their order will be cancelled.
							</li>
							<li>
								Users accept that they are obliged to pay any orders they
								confirm. Abandoning orders after confirmation is
								considered spam and a violation of the user agreement.
							</li>
							<li>
								Once the user has made the bank transfer they must notify
								the platform immediately by clicking ‘I have made
								payment’. If users are found to delay this communication,
								we reserve the right to cancel the user’s order.
							</li>
							<li>
								Cointec will honour the rate and amount offered for an
								order if funds from the bank transfer arrive within an
								allotted time period after the user has clicked ‘I have
								made payment’. After this time period, we reserve the
								right to cancel orders and return any funds that arrive
								late or to withdraw the rate or amount offered and offer
								an updated rate or amount.
							</li>
							<li>
								Cointec will not be responsible for any incorrect wallet
								addresses provided by users, resulting in misplaced
								digital currency.
							</li>
							<li>
								Orders are considered fulfilled upon the blockchain
								transaction ID being presented to the user.{' '}
							</li>
							<li>
								Filled orders are final and cannot be refunded or reversed
								in any case.
							</li>
						</ol>
					</li>

					<li>
						<h6>Variations and termination</h6>
						<ol>
							<li>
								This agreement is legally binding and will continue until
								termination.
							</li>
							<li>
								This agreement may be terminated at any time by us
								immediately or by yourself by providing written
								confirmation to close your account or via the dashbaord.
								Any outstanding orders will be honoured within the terms
								of this agreement.
							</li>
							<li>
								This agreement is subject to changes at any time in which
								case we will provide a notice and circulate the updated
								agreement.
							</li>
						</ol>
					</li>
				</ol>

				<h6>Contact</h6>
				<p>
					For any related enquires please contact us at{' '}
					<a href="mailto:contact@cointec.co.uk">contact@cointec.co.uk</a>{' '}
					or at:
				</p>
				<p>
					Kemp House
					<br />
					152-160 City Road
					<br />
					London
					<br />
					EC1V 2NX
				</p>
			</div>
		</div>
	</div>
</div> */}

export default Terms
