import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { Line } from 'react-chartjs-2'
import Moment from 'react-moment'
import { fetchRates, fetchAssetsList } from '../../store/actions'
import { connect } from 'react-redux'
import _ from 'lodash'

class Chart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			coinName: 'BTC',
			currentRate: 3800,
			latestRate: null,
			latestTimestamp: null,
			options: null,
			data: null,
			updatedOn: null,
			ShowCharts: props.assets.list.Receive[0].ShowCharts,
			ShowGlobal: props.assets.list.Receive[0].ShowGlobal
		}
	}

	componentDidMount() {
		this.props.fetchRates('GBPBTC')
		this.setState({
			updatedOn: new Date().getTime()
		})
	}

	render() {
		return (
			<div className="chart-wrapper">
				{this.state.options &&
				(!this.state.ShowCharts || !this.state.ShowGlobal) ? (
					<div className="show-false-msg">Chart data not available</div>
				) : (
					''
				)}
				{this.state.latestRate &&
					this.state.latestTimestamp &&
					this.state.ShowCharts &&
					this.state.ShowGlobal && (
						<div className="info-latest">
							<h6 className="rate">
								<span>{this.state.latestRate.toFixed(2)}</span> GBP/
								{this.state.coinName}
							</h6>
							{/* <Moment fromNow>{this.state.updatedOn}</Moment> */}
							<span className="updated-at d-none d-lg-block">
								Updated 20s ago
							</span>
						</div>
					)}
				{this.state.options ? (
					<div
						className={
							this.state.ShowCharts && this.state.ShowGlobal
								? 'line'
								: 'line blur-chart'
						}>
						<Line
							options={this.state.options}
							data={this.state.data}
							height={205}
						/>
					</div>
				) : (
					''
				)}
				{this.state.options &&
				this.state.ShowCharts &&
				this.state.ShowGlobal ? (
					<p className="axis-name text-center">Past 30 days</p>
				) : (
					''
				)}
			</div>
		)
	}

	componentWillReceiveProps(props) {
		if (props.router.query && props.router.query.buy) {
			const coinFullName = props.router.query.buy
			const coin = props.assets.list.Receive.find(
				coin => _.kebabCase(coin.FullName) === coinFullName
			)
			if (coin && this.state.coinName !== coin.Name) {
				this.setState(
					{
						coinName: coin.Name,
						updatedOn: new Date().getTime(),
						ShowCharts: coin.ShowCharts,
						ShowGlobal: coin.ShowGlobal
					},
					() => this.props.fetchRates(`GBP${coin ? coin.Name : 'BTC'}`)
				)
			}
		}
		if (props.chart && props.chart.data.length) {
			const coin = this.props.assets.list.Receive.find(
				coin => coin.Name === this.state.coinName
			)
			const chartData = props.chart.data //.filter((_, index) => index % 4 === 0)
			const timestamps = chartData.map(data => data && data.Timestamp)
			const rates = chartData.map(data => data && data.Rate.toFixed(2))
			const tooltip = chartData.map(data => {
				const date = String(new Date(data.Timestamp * 1000))
				return `${date.slice(4, 10)} ${date.slice(16, 21)}`
			})
			const { Rate, Timestamp } = chartData[chartData.length - 1]
			this.setState({
				options: {
					scaleBegingAtZero: false,
					tooltips: {
						shadowOffsetX: 0,
						shadowOffsetY: 4,
						shadowBlur: 20,
						shadowColor: 'rgba(0, 0, 0, 0.04)',
						mode: 'index',
						intersect: false,
						backgroundColor: 'white',
						borderColor: '#E8EAEB',
						borderWidth: 1,
						bodyFontColor: coin.Primary, //'#f7931a',
						bodyFontSize: 18,
						titleFontColor: '#5E6C78',
						titleFontSize: 14,
						footerFontColor: 'red',
						displayColors: false,
						xPadding: 12,
						yPadding: 12,
						callbacks: {
							title: ([tooltipItem], data) => tooltip[tooltipItem.index]
						}
					},
					hover: {
						mode: 'index',
						intersect: false
					},
					layout: {
						padding: {
							top: 0
						}
					},
					scales: {
						yAxes: [
							{
								gridLines: {
									drawBorder: false,
									borderDash: [1, 8],
									color: '#B0B9BD'
								},
								ticks: {
									maxTicksLimit: 5
								}
							}
						],
						xAxes: [
							{
								gridLines: {
									display: false
								},
								ticks: {
									maxRotation: 0,
									fontColor: '#A8ADB2',
									maxTicksLimit: 6,
									padding: 15,
									maxTicksLimit: 4,
									callback: value => String(new Date(value * 1000)).slice(4, 10)
								},
								offset: true
							}
						]
					},
					legend: {
						display: false
					},
					responsive: true,
					maintainAspectRatio: false
				},
				data: canvas => {
					// const context = canvas.getContext('2d')
					// const gradient = context.createLinearGradient(0, 0, 0, 500)
					// gradient.addColorStop(0, coin.Primary + '12')
					// gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
					return {
						labels: timestamps,
						datasets: [
							{
								label: '',
								borderColor: coin.Primary,
								borderWidth: 2,
								data: rates,
								lineTension: 0.1,
								pointRadius: 0,
								cubicInterpolationMode: 'default',
								backgroundColor: 'transparent'
							}
						]
					}
				},
				latestRate: Rate,
				latestTimestamp: Timestamp * 1000
			})
		}
	}
}

const mapStateToProps = ({ assets, chart }) => ({ assets, chart })
const mapDispatchToProps = { fetchRates, fetchAssetsList }
const withRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default withRedux(withRouter(Chart))
