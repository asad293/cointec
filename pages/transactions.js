import React, { Component } from 'react'
import Head from 'next/head'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { fetchOrders, fetchAssetsList } from '../store/actions'
import Cookie from 'js-cookie'
import Moment from 'react-moment'

import Nav from '../components/dashboard/Nav'
import AlertMessage from '../components/dashboard/AlertMessage'
import StickyFooter from '../components/StickyFooter'
import Pagination from '../components/Pagination'

class Transactions extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentPage: 1,
			totalPages: 0,
			showAlert: true,
			assetsImages: null
		}
	}

	componentDidMount() {
		const userData = localStorage.getItem('user')
		const user = userData && JSON.parse(userData)
		const sessionId = Cookie.get('CT-SESSION-ID')

		if (user && user.CtUserId && sessionId) {
			this.props.fetchOrders({ ctUser: user.CtUserId })
		} else {
			Router.push(`/login?redirectPath=${this.props.router.pathname}`)
		}
	}

	render() {
		return (
			<div
				className="dashboard-page full-height"
				style={{ background: '#F7F9FA', overflowY: 'scroll' }}>
				<Head>
					<title>Transaction history | Cointec</title>
				</Head>
				<header>
					<Nav />
					<hr className="hr-header" />
					<div className="container">
						<h2 className="dashboard-heading">Transaction history</h2>
					</div>
				</header>
				{this.state.showAlert && (
					<AlertMessage onHide={() => this.setState({ showAlert: false })} />
				)}
				<div className="container dashboard-container mb-5">
					<div className="row">
						<div className="col">
							<div className="content-wrapper mb-4 p-0 h-auto">
								<TransactionTable
									currentPage={this.state.currentPage}
									orders={this.props.order.orders}
									assets={this.state.assetsImages}
								/>
							</div>
							<Pagination
								currentPage={this.state.currentPage}
								totalPages={this.state.totalPages}
								// className="d-none d-md-block"
								onChange={page => this.setState({ currentPage: page })}
							/>
						</div>
					</div>
				</div>
				<StickyFooter className="bg-white" />
			</div>
		)
	}

	componentWillReceiveProps({ order, assets }) {
		const assetsImages = {}
		assets.list.Receive.forEach(asset => {
			assetsImages[asset.Name] = asset.Image
		})
		assets.list.Send.forEach(asset => {
			assetsImages[asset.Name] = asset.Image
		})
		this.setState({
			totalPages: order.orders
				? Math.ceil(
						order.orders.TransactionHistory.length /
							order.orders.TransactionsDisplayLimit
				  )
				: 0,
			assetsImages
		})
	}
}

const TransactionTable = ({ orders, assets, currentPage }) => (
	<table className="table">
		<thead>
			<tr>
				<th>Recent activity</th>
				<th className="d-none d-md-table-cell">Receive amount</th>
				<th className="d-none d-lg-table-cell">Send amount</th>
				<th className="d-none d-md-table-cell">Timestamp</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td />
			</tr>
			{orders ? (
				orders.TransactionHistory.slice(
					(currentPage - 1) * orders.TransactionsDisplayLimit,
					(currentPage - 1) * orders.TransactionsDisplayLimit +
						orders.TransactionsDisplayLimit
				).map(order => (
					<tr key={order.ctTransactionId}>
						{assets && (
							<td>
								<img src={assets[order.sourceCurrency]} />
								<i className="far fa-long-arrow-right fa-lg d-none d-md-inline" />
								<img
									className="d-none d-md-inline"
									src={assets[order.destCurrency]}
								/>
								<span className="d-inline d-md-none pl-3">
									+{order.destAmount}
								</span>
							</td>
						)}
						<td className="d-none d-md-table-cell">{order.destAmount}</td>
						<td className="d-none d-lg-table-cell">
							{order.sourceAmount} {order.sourceCurrency}
						</td>
						<td className="d-none d-md-table-cell">
							<Moment format="DD MMM hh:mmA">{order.createdAt * 1000}</Moment>
						</td>
						<td className="transaction-status">{order.status}</td>
					</tr>
				))
			) : (
				<tr className="no-result">
					<td colSpan="5">No results</td>
				</tr>
			)}
			<tr>
				<td />
			</tr>
		</tbody>
	</table>
)

export default connect(
	({ order, assets }) => ({ order, assets }),
	{ fetchOrders, fetchAssetsList }
)(withRouter(Transactions))
