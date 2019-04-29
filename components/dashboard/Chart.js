import React, { Component } from "react";
import { withRouter } from "next/router";
import { Line } from "react-chartjs-2";
import Moment from "react-moment";
import {
	fetchRates,
	fetchAssetsList,
	changeTimeInterval
} from "../../store/actions";
import { connect } from "react-redux";
import _ from "lodash";

class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			coinName: "BTC",
			currentRate: 3800,
			latestRate: null,
			latestTimestamp: null,
			options: null,
			data: null,
			updatedOn: null,
			ShowCharts: props.assets.list.Receive[0].ShowCharts,
			ShowGlobal: props.assets.list.Receive[0].ShowGlobal,
			TDClass: "TD-interval chart-time-interval interval-selected",
			SDClass: "SD-interval chart-time-interval",
			ODClass: "OD-interval chart-time-interval"
		};
		this.onScroll = this.onScroll.bind(this);
		this.updateTimeInterval = this.updateTimeInterval.bind(this);
	}

	componentDidMount() {
		this.props.fetchRates("GBPBTC");
		this.setState({
			updatedOn: new Date().getTime()
		});

		document
			.querySelector(".dashboard-page")
			.addEventListener("scroll", this.onScroll);
	}

	componentWillUnmount() {
		document
			.querySelector(".dashboard-page")
			.removeEventListener("scroll", this.onScroll);
	}

	onScroll() {
		const tooltip = document.querySelector("#chartjs-tooltip");
		if (tooltip) {
			// remove chart tooltip when unmounted
			if (tooltip.remove) {
				tooltip.remove();
			} else {
				tooltip.parentNode.removeChild(tooltip);
			}
		}
	}

	updateTimeInterval(val) {
		if (val == "30D") {
			this.setState({
				TDClass: "TD-interval chart-time-interval interval-selected",
				SDClass: "SD-interval chart-time-interval",
				ODClass: "OD-interval chart-time-interval"
			})
		} else if (val == "7D") {
			this.setState({
				TDClass: "TD-interval chart-time-interval",
				SDClass: "SD-interval chart-time-interval interval-selected",
				ODClass: "OD-interval chart-time-interval"
			})
		} else if (val == "1D") {
			this.setState({
				TDClass: "TD-interval chart-time-interval",
				SDClass: "SD-interval chart-time-interval",
				ODClass: "OD-interval chart-time-interval interval-selected"
			})
		}
		this.props.changeTimeInterval(val);
	}

	render() {
		return (
			<div className="chart-wrapper">
				{this.state.options &&
					(!this.state.ShowCharts || !this.state.ShowGlobal) ? (
						<div className="show-false-msg-dashboard">
							Chart data not available
          </div>
					) : (
						""
					)}
				{this.state.latestRate &&
					this.state.latestTimestamp &&
					this.state.ShowCharts &&
					this.state.ShowGlobal && (
						<div className="info-latest">
							<h6 className="rate">
								GBP/
                {this.state.coinName}
							</h6>
							<div className="check-click-outside">
								<div className="chart-time-interval-homepage">
									<span className={this.state.TDClass} onClick={() => this.updateTimeInterval("30D")}>&nbsp;30D&nbsp;</span>
									|
                  <span className={this.state.SDClass} onClick={() => this.updateTimeInterval("7D")}>&nbsp;7D&nbsp;</span>
									|
                  <span className={this.state.ODClass} onClick={() => this.updateTimeInterval("1D")}>&nbsp;1D&nbsp;</span>
								</div>
							</div>
							<span className="updated-at">
								{/* <Moment fromNow>{this.state.updatedOn}</Moment> */}
							</span>
						</div>
					)}
				{this.state.options ? (
					<div
						className={
							this.state.ShowCharts && this.state.ShowGlobal
								? "line"
								: "line blur-chart"
						}
					>
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
				) : (
						""
					)}
			</div>
		);
	}

	componentWillReceiveProps(props) {
		if (props.assets.currentAsset) {
			const coin = props.assets.list.Receive.find(
				coin => coin.Name === props.assets.currentAsset
			);
			if (coin && this.state.coinName !== coin.Name) {
				this.setState(
					{
						coinName: coin.Name,
						updatedOn: new Date().getTime(),
						ShowCharts: coin.ShowCharts,
						ShowGlobal: coin.ShowGlobal
					},
					() => this.props.fetchRates(`GBP${coin ? coin.Name : "BTC"}`)
				);
			}
		}
		if (props.chart && props.chart.data.ThirtyDay.length) {
			const coin = this.props.assets.list.Receive.find(
				coin => coin.Name === this.state.coinName
			);

			let chartData = props.chart.data.ThirtyDay;
			if (props.chart.intervalValue == "1D") {
				chartData = props.chart.data.OneDay;
			} else if (props.chart.intervalValue == "7D") {
				chartData = props.chart.data.SevenDay;
			}

			const timestamps = chartData.map(data => data && data.Timestamp);
			const rates = chartData.map(data => data && data.Rate.toFixed(2));
			const tooltip = chartData.map(data => {
				const date = String(new Date(data.Timestamp * 1000));
				return `${date.slice(8, 10)} ${date.slice(4, 7)} ${date.slice(16, 21)}`;
			});
			const { Rate, Timestamp } = chartData[chartData.length - 1];
			this.setState({
				options: {
					scaleBegingAtZero: false,
					tooltips: {
						shadowOffsetX: 0,
						shadowOffsetY: 6,
						shadowBlur: 8,
						shadowColor: "rgba(0, 0, 0, 0.13)",
						mode: "index",
						intersect: false,
						backgroundColor: "white",
						borderColor: "#E8EAEB",
						borderWidth: 1,
						cornerRadius: 3,
						bodyFontColor: "#667075",
						bodyFontSize: 14,
						bodyFontStyle: "bold",
						titleFontColor: "#1A1D1F",
						titleFontSize: 14,
						titleFontStyle: "bold",
						footerFontColor: "red",
						displayColors: false,
						xPadding: 16,
						yPadding: 16,
						enabled: false,

						custom: function (tooltipModel) {
							// Tooltip Element
							var tooltipEl = document.getElementById("chartjs-tooltip");

							if (document && document.documentElement.clientWidth < 992) {
								return;
							}

							// Create element on first render
							if (!tooltipEl) {
								tooltipEl = document.createElement("div");
								tooltipEl.id = "chartjs-tooltip";
								tooltipEl.innerHTML = "<table></table>";
								document.body.appendChild(tooltipEl);
							}

							// Hide if no tooltip
							if (tooltipModel.opacity === 0) {
								tooltipEl.style.opacity = 0;
								return;
							}

							// Set caret Position
							tooltipEl.classList.remove("above", "below", "no-transform");
							if (tooltipModel.yAlign) {
								tooltipEl.classList.add(tooltipModel.yAlign);
							} else {
								tooltipEl.classList.add("no-transform");
							}

							function getBody(bodyItem) {
								return bodyItem.lines;
							}

							// Set Text
							if (tooltipModel.body) {
								var titleLines = tooltipModel.title || [];
								var bodyLines = tooltipModel.body.map(getBody);

								var innerHtml = "<thead>";

								titleLines.forEach(function (title) {
									const style = `
									font-weight: 600;
									line-height: 10px;
									font-size: 14px;
									color: #1A1D1F;
									padding-bottom:12px;`;
									innerHtml +=
										'<tr><th style="' + style + '">' + title + "</th></tr>";
								});
								innerHtml += "</thead><tbody>";

								bodyLines.forEach(function (body, i) {
									var colors = tooltipModel.labelColors[i];
									var style = "background:" + colors.backgroundColor;
									style += "; border-color:" + colors.borderColor;
									style += "; border-width: 2px";
									var span = '<span style="' + style + '"></span>';
									innerHtml +=
										'<tr><td style="line-height:10px;font-weight: 600;font-size: 14px;color: #667075;">' +
										span +
										body +
										"</td></tr>";
								});
								innerHtml += "</tbody>";

								var tableRoot = tooltipEl.querySelector("table");
								tableRoot.innerHTML = innerHtml;
							}

							// `this` will be the overall tooltip
							var position = this._chart.canvas.getBoundingClientRect();

							// Display, position, and set styles for font
							tooltipEl.style.opacity = 1;
							tooltipEl.style.position = "absolute";
							tooltipEl.style.backgroundColor = "white";
							tooltipEl.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.13)";
							tooltipEl.style.borderRadius = "3px";
							tooltipEl.style.left =
								position.left + window.pageXOffset + tooltipModel.caretX + "px";
							tooltipEl.style.top =
								position.top + window.pageYOffset + tooltipModel.caretY + "px";
							tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
							tooltipEl.style.fontSize = tooltipModel.bodyFontSize + "px";
							tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
							tooltipEl.style.padding =
								tooltipModel.yPadding + "px " + tooltipModel.xPadding + "px";
							tooltipEl.style.pointerEvents = "none";
						},
						callbacks: {
							title: ([tooltipItem], data) => tooltip[tooltipItem.index],
							label: (tooltipItem, data) =>
								rates[tooltipItem.index] + ` GBP/${coin.Name}`
						}
					},
					hover: {
						mode:
							document && document.documentElement.clientWidth > 992
								? "index"
								: "none",
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
									color: "#B0B9BD"
								},
								ticks: {
									maxTicksLimit:
										document && document.documentElement.clientWidth > 767
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
									fontColor: "#667075",
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
					return {
						labels: timestamps,
						datasets: [
							{
								label: "",
								borderColor: coin.Primary,
								borderWidth: 2,
								data: rates,
								lineTension: 0.1,
								pointRadius: 0,
								cubicInterpolationMode: "default",
								backgroundColor: "transparent" //gradient
							}
						]
					};
				},
				latestRate: Rate,
				latestTimestamp: Timestamp * 1000
			});
		}
	}
}

const mapStateToProps = ({ assets, chart }) => ({ assets, chart });
const mapDispatchToProps = { fetchRates, fetchAssetsList, changeTimeInterval };
const withRedux = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default withRedux(withRouter(Chart));
