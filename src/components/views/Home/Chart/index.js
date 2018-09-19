import React, { Component }  from 'react'
import { Line } from 'react-chartjs-2'
import Moment from 'react-moment'
import { fetchRates } from '../../../../Redux/actions'
import { connect } from 'react-redux'
import _ from 'lodash'

class Chart extends Component {
	constructor() {
		super()
		this.state = {
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
        {(this.state.latestRate && this.state.latestTimestamp) ? <div className="info-latest">
          <h6 className="rate"><span>{this.state.latestRate}</span> GBP/BTC</h6>
          <Moment fromNow>{this.state.updatedOn}</Moment>
        </div> : ''}
				{this.state.options ? <div className="line"><Line options={this.state.options} data={this.state.data} /></div> : ''}
				{this.state.options ? <p className="axis-name">Past 30 days</p>: ''}
      </div>
    )
	}
	
	componentWillReceiveProps(props) {
		if (props.chart && props.chart.data.length) {
			const chartData = props.chart.data//.filter((_, index) => index % 4 === 0)
			const timestamps = chartData.map(data => data && data.Timestamp)
			const rates = chartData.map(data => data && data.Rate)
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
						bodyFontColor: '#f7931a',
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
									drawBorder: false
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
									display: false
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
					const context = canvas.getContext('2d')
					const gradient = context.createLinearGradient(0, 0, 0, 500)
					gradient.addColorStop(0, 'rgba(247, 147, 26, 0.07)')
					gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
					return {
						labels: timestamps,
						datasets: [
							{
								label: '',
								borderColor: '#f7931a',//'rgb(41, 190, 6)',
								borderWidth: 2,
								data: rates,
								lineTension: 0.1,
								pointRadius: 0,
								cubicInterpolationMode: 'default',
								backgroundColor: gradient
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

const mapStateToProps = (state) => {
  return {
    chart: state.chart
  }
}

export default connect(mapStateToProps, { fetchRates })(Chart)