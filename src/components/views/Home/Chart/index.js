import React, { Component }  from 'react'
import ReactEcharts from 'echarts-for-react'

const options = {
	xAxis: {
		type: 'category',
		data: [
      1535707601000,
      1535707602000,
      1535707603000,
      1535707604000,
      1535707605000,
      1535707606000,
      1535707607000,
      1535707608000,
      1535707609000,
      1535707610000,
      1535707611000,
      1535707612000,
      1535707613000,
      1535707614000,
      1535707615000,
      1535707616000,
    ],
		axisPointer: {
			show: true,
			type: 'line',
			lineStyle: {
				opacity: 0
			},
			label: {
				show: false
			}
		},
		axisLine: {
			show: false
		},
		axisLabel: {
			show: false
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		type: 'value',
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
    },
    minInterval: 1000,
    min: 2000
	},
	series: [
		{
			data: [4600, 4800, 4301, 3634, 3290, 3330, 3320, 3200, 2820, 2662, 2901, 2934, 2900, 2855, 3290, 3300],
			type: 'line',
			lineStyle: {
				width: 2.4,
				color: '#0459C4'
			},
			symbolSize: 4,
			showSymbol: false,
			itemStyle: {
				color: '#0459C4',
				borderWidth: 3
			}
		}
	]
}

class Chart extends Component {
  render() {
    return (
      <div className="chart-wrapper">
        <div className="info-latest">
          <h6 className="rate">3,800 GBP/BTC</h6>
          <p className="updated-at">Updated 1hr ago</p>
        </div>
        <ReactEcharts option={options} notMerge={true} lazyUpdate={true} />
      </div>
    )
  }
}

export default Chart