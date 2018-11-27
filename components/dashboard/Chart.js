import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { Line } from 'react-chartjs-2'
import Moment from 'react-moment'
import { fetchRates, fetchAssetsList } from '../../store/actions'
import { connect } from 'react-redux'
import _ from 'lodash'

class Chart extends Component {
	constructor() {
		super()
		this.state = {
			coinName: 'BTC',
			currentRate: 3800,
			latestRate: null,
			latestTimestamp: null,
			options: null,
			data: null,
			updatedOn: null
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
				{this.state.latestRate && this.state.latestTimestamp && (
					<div className="info-latest">
						<h6 className="rate">
							<span>{this.state.latestRate.toFixed(2)}</span> GBP/
							{this.state.coinName}
						</h6>
						<span className="updated-at">
							Updated 20s ago
							{/* <Moment fromNow>{this.state.updatedOn}</Moment> */}
						</span>
					</div>
				)}
				{this.state.options && (
					<div className="line">
						<Line
							options={this.state.options}
							data={this.state.data}
							height={
								document && document.documentElement.clientWidth > 768
									? 230
									: 144
							}
						/>
					</div>
				)}
			</div>
		)
	}

	componentWillReceiveProps(props) {
		if (props.assets.currentAsset) {
			const coin = props.assets.list.Receive.find(
				coin => coin.Name === props.assets.currentAsset
			)
			if (coin && this.state.coinName !== coin.Name) {
				this.setState(
					{
						coinName: coin.Name,
						updatedOn: new Date().getTime()
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
			const rates = chartData.map(data => data && data.Rate.toFixed(0))
			const tooltip = chartData.map(data => {
				const date = String(new Date(data.Timestamp * 1000))
				return `${date.slice(8, 10)} ${date.slice(4, 7)} ${date.slice(16, 21)}`
			})
			const { Rate, Timestamp } = chartData[chartData.length - 1]
			this.setState({
				options: {
					scaleBegingAtZero: false,
					tooltips: {
						shadowOffsetX: 0,
						shadowOffsetY: 6,
						shadowBlur: 8,
						shadowColor: 'rgba(0, 0, 0, 0.13)',
						mode: 'index',
						intersect: false,
						backgroundColor: 'white',
						borderColor: '#E8EAEB',
						borderWidth: 1,
						cornerRadius: 3,
						bodyFontColor: '#667075',
						bodyFontSize: 14,
						bodyFontStyle: 'bold',
						titleFontColor: '#1A1D1F',
						titleFontSize: 14,
						titleFontStyle: 'bold',
						footerFontColor: 'red',
						displayColors: false,
						xPadding: 12,
						yPadding: 12,
						callbacks: {
							title: ([tooltipItem], data) => tooltip[tooltipItem.index],
							label: (tooltipItem, data) =>
								rates[tooltipItem.index] + ` GBP/${coin.Name}`
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
									maxTicksLimit:
										document && document.documentElement.clientWidth > 768
											? 5
											: 3
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
									fontColor: '#667075',
									maxTicksLimit: 6,
									padding: 15,
									maxTicksLimit: 4,
									// autoSkip: true,
									// autoSkipPadding: 150,
									// labelOffset: 15,
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
								backgroundColor: 'transparent' //gradient
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
