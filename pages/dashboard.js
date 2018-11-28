import React, { Component } from 'react'
import Head from 'next/head'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { fetchOrders, fetchAssetsList } from '../store/actions'
import Cookie from 'js-cookie'
import Moment from 'react-moment'

import Nav from '../components/dashboard/Nav'
import AlertMessage from '../components/dashboard/AlertMessage'
import TransactionDetail from '../components/dashboard/TransactionDetail'
import Chart from '../components/dashboard/Chart'
import Calculator from '../components/home/Calculator'
import StickyFooter from '../components/StickyFooter'

const dev = process.env.NODE_ENV !== 'production'

class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			assetsImages: null,
			showAlert: true,
			transactionDetailModal: false,
			activeTransaction: null,
			scrolling: false
		}
	}

	componentDidMount() {
		// if (!dev) {
		const userData = localStorage.getItem('user')
		const user = userData && JSON.parse(userData)
		const sessionId = Cookie.get('CT-SESSION-ID')

		if (user && user.CtUserId && sessionId) {
			this.props.fetchOrders({ ctUser: user.CtUserId })
		} else {
			Router.push(`/login?redirectPath=${this.props.router.pathname}`)
		}
		// }
		addEventListener('resize', this.onResize)
		this.onResize()
	}

	componentWillUnmount() {
		removeEventListener('resize', this.onResize)
	}

	onResize = () => {
		const element = document.querySelector('.dashboard-page')
		const documentElement = document.documentElement

		this.setState({
			scrolling:
				element && documentElement
					? documentElement.clientHeight < element.scrollHeight
					: false
		})
	}

	render() {
		return (
			<div
				className="dashboard-page full-height"
				style={{ background: '#F7F9FA', overflowY: 'scroll' }}>
				<Head>
					<title>Dashboard | Cointec</title>
				</Head>
				<header>
					<Nav />
					<hr className="hr-header" />
					<div className="container">
						<h2 className="dashboard-heading">Dashboard</h2>
					</div>
				</header>
				{this.state.showAlert && (
					<AlertMessage onHide={() => this.setState({ showAlert: false })} />
				)}
				<div className="container dashboard-container">
					<div className="row flex-column-reverse flex-lg-row">
						<div className="col-12 col-lg-chart mt-4 mt-lg-0">
							<div className="content-wrapper">
								<Chart />
							</div>
						</div>
						<div className="col-12 col-lg-calc hero-calculator">
							<div className="content-wrapper calculator-wrapper">
								<Calculator />
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<div className="content-wrapper mt-4 p-0 h-auto">
								<TransactionTable
									orders={this.props.order.orders}
									assets={this.state.assetsImages}
									onSelect={transaction =>
										this.setState({
											activeTransaction: transaction,
											transactionDetailModal: true
										})
									}
								/>
							</div>
						</div>
					</div>
				</div>
				<StickyFooter className="bg-white" fixed={!this.state.scrolling} />
				{this.state.transactionDetailModal && (
					<TransactionDetail
						transaction={this.state.activeTransaction}
						onClose={() =>
							this.setState({
								activeTransaction: null,
								transactionDetailModal: false
							})
						}
					/>
				)}
			</div>
		)
	}

	componentWillReceiveProps(props) {
		const assetsImages = {}
		props.assets.list.Receive.forEach(asset => {
			assetsImages[asset.Name] = asset.Image
		})
		props.assets.list.Send.forEach(asset => {
			assetsImages[asset.Name] = asset.Image
		})
		this.setState({ assetsImages }, () => {
			if (this.state.assetsImages) this.onResize()
		})
	}
}

const TransactionTable = ({ orders, assets, onSelect }) => (
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
			<tr className="tr-empty">
				<td />
			</tr>
			{orders ? (
				orders.TransactionHistory.slice(0, orders.HomepageDisplayLimit).map(
					(order, index) => (
						<tr
							key={order.ctTransactionId}
							className={index === 0 ? 'no-border' : ''}
							onClick={() => onSelect(order)}>
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
					)
				)
			) : (
				<tr className="no-result">
					<td colSpan="5">No results</td>
				</tr>
			)}
			<tr className="tr-empty">
				<td />
			</tr>
			{/* <tr>
				<td>
					<img src="/static/images/union-jack.svg" />
					<i className="far fa-long-arrow-right fa-lg d-none d-md-inline" />
					<img
						className="d-none d-md-inline"
						src="/static/images/coins/ETC.svg"
					/>
					<span className="d-inline d-md-none pl-3">+0.25458745 BTC</span>
				</td>
				<td className="d-none d-md-table-cell">0.25458745 BTC</td>
				<td className="d-none d-lg-table-cell">200 GBP</td>
				<td className="d-none d-md-table-cell">12 Nov 14:00PM</td>
				<td className="transaction-status">Processing</td>
			</tr> */}
		</tbody>
	</table>
)

export default connect(
	({ order, assets }) => ({ order, assets }),
	{ fetchOrders, fetchAssetsList }
)(withRouter(Dashboard))
