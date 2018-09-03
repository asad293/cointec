import React, { Component }  from 'react'
import ReactEcharts from 'echarts-for-react'
import Moment from 'react-moment'
import { fetchRates } from '../../../../Redux/actions'
import { connect } from 'react-redux'
import _ from 'lodash'

class Chart extends Component {
	constructor() {
		super()
		this.state = {
			currentRate: 3800,
			pointedRate: null,
			pointedTimestamp: null,
			latestRate: null,
			latestTimestamp: null, 
			options: null,
			updatedOn: null
		}
		this.MouseOver = this.MouseOver.bind(this)
		this.MouseOut = this.MouseOut.bind(this)
	}

	componentDidMount() {
		this.props.fetchRates('GBPBTC')
		this.setState({
			updatedOn: new Date().getTime()
		})
	}

	MouseOver(e) {
		this.setState({
			pointedRate: e.value,
			pointedTimestamp: Number.parseInt(e.name) * 1000
		})
	}

	MouseOut() {
		this.setState({
			pointedRate: null,
			pointedTimestamp: null
		})
	}

  render() {
		const onEvents = {
			'mouseover': this.MouseOver,
			'mouseout': this.MouseOut
		}
    return (
      <div className="chart-wrapper">
        {(this.state.latestRate && this.state.latestTimestamp) ? <div className="info-latest">
          <h6 className="rate"><span>{this.state.latestRate}</span> GBP/BTC</h6>
          <Moment fromNow>{this.state.updatedOn}</Moment>
          {/* <Moment fromNow>{this.state.latestTimestamp}</Moment> */}
        </div> : ''}
        {(this.state.pointedRate && this.state.pointedTimestamp) ? <div className="info-pointed text-right">
          <h6 className="rate"><span>{this.state.pointedRate}</span> GBP/BTC</h6>
					<Moment format="DD/MM/YYYY HH:mm">{this.state.pointedTimestamp}</Moment>
        </div> : ''}
				{this.state.options ? <ReactEcharts option={this.state.options} notMerge={true} lazyUpdate={true} onEvents={onEvents} /> : ''}
				{this.state.options ? <p className="axis-name">Past 30 days</p>: ''}
      </div>
    )
	}
	
	componentWillReceiveProps(props) {
		if (props.chart && props.chart.data.length) {
			const chartData = props.chart.data//.filter((_, index) => index % 4 === 0)
			const timestamps = chartData.map(data => data && data.Timestamp)
			const rates = chartData.map(data => data && data.Rate)
			const minRate = Math.floor(_.min(rates) / 1000) * 1000
			const maxRate = Math.ceil(_.max(rates) / 1000) * 1000
			const interval = Math.ceil(((maxRate - minRate) / 4) / 1000) * 1000
			const { Rate, Timestamp } = chartData[chartData.length - 1]
			this.setState({
				options: {
					xAxis: {
						type: 'category',
						data: timestamps,
						triggerEvent: true,
						axisPointer: {
							show: true,
							type: 'line',
							lineStyle: { opacity: 0 },
							label: { show: false }
						},
						axisLine: { show: false },
						axisLabel: { show: false },
						axisTick: { show: false }
					},
					yAxis: {
						type: 'value',
						axisLine: { show: false },
						axisTick: { show: false },
						axisLabel: { color: '#76828F' },
						interval: interval,
						min: minRate
					},
					series: [
						{
							data: rates,
							type: 'line',
							lineStyle: {
								width: 2.4,
								color: '#0459C4'
							},
							symbolSize: 8,
							showSymbol: false,
							itemStyle: {
								color: '#0459C4',
								borderWidth: 3
							}
						}
					]
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