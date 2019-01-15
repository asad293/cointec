import React, { Component } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { fetchAssetsList, setCurrentAsset } from '../../store/actions'
import _ from 'lodash'

class CurrencySlider extends Component {
	constructor() {
		super()
		this.state = {
			sliderActive: false
		}
	}
	componentDidMount() {
		$('.currency-carousel').slick({
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 5,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						infinite: true,
						slidesToShow: 3,
						slidesToScroll: 3
					}
				},
				{
					breakpoint: 480,
					settings: {
						infinite: true,
						slidesToShow: 2,
						slidesToScroll: 2
					}
				}
			]
		})
		this.setState({
			sliderActive: true
		})
	}

	render() {
		return (
			<div className="bg-gradient bg-mid-gradient d-none d-md-block">
				<div className="currency-slider container">
					<div className="row">
						<div className="col px-0">
							<div
								className="currency-carousel"
								style={{ opacity: this.state.sliderActive ? 1 : 0 }}>
								{this.props.assets.list.Receive.map(asset => (
									<Link
										as={`/buy-${_.kebabCase(asset.FullName)}`}
										href={`/?buy=${_.kebabCase(asset.FullName)}`}
										key={asset.Name}>
										<a
											className="currency-item"
											onClick={() => this.props.setCurrentAsset(asset.Name)}>
											<img src={asset.Image} alt={asset.Name} />
											<label className="m-0">
												{// document.documentElement.clientWidth > 992
												// ?
												asset.FullName.length < 20
													? asset.FullName
													: asset.Name
												// : asset.Name
												}
											</label>
										</a>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
				<hr className="m-0" style={{ borderTop: '1px solid #E5E5E5' }} />
			</div>
		)
	}
}

export default connect(
	({ assets }) => ({ assets }),
	{ fetchAssetsList, setCurrentAsset }
)(CurrencySlider)
