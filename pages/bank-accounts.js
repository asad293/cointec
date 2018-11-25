import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { fetchAccounts } from '../store/actions'
import Cookie from 'js-cookie'

import Nav from '../components/dashboard/Nav'
import AlertMessage from '../components/dashboard/AlertMessage'
import TabsGroup from '../components/account-settings/TabsGroup'
import SettingsMenu from '../components/account-settings/SettingsMenu'
import AddBankAccount from '../components/account-settings/AddBankAccount'
import StickyFooter from '../components/StickyFooter'

const colors = [
	'#7433FF',
	'#0779C6',
	'#E83860',
	'#AA3939',
	'#729C34',
	'#363377',
	'#AA8E39',
	'#E76900',
	'#850297',
	'#00A643'
]

class BankAccounts extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showAlert: true,
			addBankAccountModal: false,
			editAccount: null
		}
	}

	componentDidMount() {
		const userData = localStorage.getItem('user')
		const user = userData && JSON.parse(userData)
		const sessionId = Cookie.get('CT-SESSION-ID')
		if (user && user.CtUserId && sessionId) {
			this.props.fetchAccounts(user.CtUserId)
		} else {
			Router.push(`/login?redirectPath=${this.props.router.pathname}`)
		}
	}

	render() {
		return (
			<div
				className="settings-page dashboard-page full-height"
				style={{ background: '#F7F9FA', overflowY: 'auto' }}>
				<Head>
					<title>Bank Accounts | Cointec</title>
				</Head>
				<header>
					<Nav />
					<hr className="hr-header" />
					<div className="container">
						<h2 className="dashboard-heading">Account settings</h2>
					</div>
				</header>
				{this.state.showAlert && (
					<AlertMessage onHide={() => this.setState({ showAlert: false })} />
				)}
				<div className="container dashboard-container">
					<div className="row">
						<div className="col">
							<div className="content-wrapper p-0 h-auto">
								<TabsGroup />
								<SettingsMenu title="Bank accounts" />
								<div className="bank-accounts">
									<div className="d-flex justify-content-between">
										<h6 className="heading d-none d-md-flex">
											Saved bank accounts
										</h6>
										<h6 className="heading d-flex d-md-none">Bank accounts</h6>
										<a
											className="add-account-link"
											onClick={() =>
												this.setState({ addBankAccountModal: true })
											}>
											Add bank account
											<i className="fas fa-plus-circle" />
										</a>
									</div>
									<div className="accounts-list row">
										{this.props.accounts.list &&
											this.props.accounts.list.map((account, index) => (
												<div
													className="col-12 col-xl-4 col-md-6"
													key={account.id}>
													<AccountCard
														AccountOwner={account.AccountOwner}
														AccountNumber={account.AccountNumber}
														SortCode={account.SortCode}
														color={colors[index % colors.length]}
														onEdit={() =>
															this.setState({
																addBankAccountModal: true,
																editAccount: account
															})
														}
													/>
												</div>
											))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<StickyFooter className="bg-white" />
				{this.state.addBankAccountModal && (
					<AddBankAccount
						editAccount={this.state.editAccount}
						onClose={() =>
							this.setState({ addBankAccountModal: false, editAccount: null })
						}
					/>
				)}
			</div>
		)
	}
}

const AccountCard = ({
	AccountOwner,
	AccountNumber,
	SortCode,
	color,
	onEdit
}) => (
	<div className="account-card" style={{ background: color }}>
		<div className="row">
			<div className="col">
				<h6 className="field-label">Account name</h6>
				<p className="field-value">{AccountOwner}</p>
				{/* <p className="field-value">Primary account</p> */}
			</div>
			<div className="col-3 text-right">
				<a className="edit-account-link" onClick={onEdit}>
					Edit
				</a>
			</div>
		</div>
		<br />
		<div className="row">
			<div className="col-7">
				<h6 className="field-label">Account number</h6>
				<p className="field-value">{AccountNumber}</p>
				{/* <p className="field-value">33456546</p> */}
			</div>
			<div className="col-5 text-right">
				<h6 className="field-label">Sort code</h6>
				<p className="field-value">{SortCode}</p>
				{/* <p className="field-value">11-22-33</p> */}
			</div>
		</div>
	</div>
)

export default connect(
	({ accounts }) => ({ accounts }),
	{ fetchAccounts }
)(withRouter(BankAccounts))
