import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAssetsList } from '../../store/actions'
import cn from 'classnames'

class AddWallet extends Component {
	constructor() {
		super()
		this.state = {
			closed: false
		}
		this.onClose = this.onClose.bind(this)
		this.onClickOutside = this.onClickOutside.bind(this)
	}

	onClose() {
		this.setState(
			{
				closed: true
			},
			() => {
				setTimeout(() => {
					this.props.onClose()
				}, 300)
			}
		)
	}

	componentDidMount() {
		setTimeout(() => {
			addEventListener('click', this.onClickOutside)
		}, 500)
	}

	componentWillUnmount() {
		removeEventListener('click', this.onClickOutside)
	}

	onClickOutside = event => {
		const select = event.path.find(
			node => node.className === 'modal-dialog modal-add-wallet'
		)
		if (!select) {
			this.onClose()
		}
	}

	render() {
		return (
			<div
				className="modal fade show"
				id="abandon-order-modal"
				role="dialog"
				data-backdrop="false"
				style={{ display: 'block' }}>
				<div
					className="modal-dialog modal-add-wallet"
					role="document"
					style={{ transform: this.state.closed ? 'translateY(-120%)' : '' }}>
					<div className="modal-content">
						<div className="modal-header">
							<img src="/static/images/meta-mask.svg" />
							<button type="button" className="close" onClick={this.onClose}>
								<i className="far fa-times fa-sm" />
							</button>
						</div>
						<div className="modal-body">
							<div className="search-coin">
								<input type="text" placeholder="Search supported coins" />
								<i className="far fa-search" />
							</div>
							<div className="coin-list">
								{this.props.assets.list &&
									this.props.assets.list.Receive.map(asset => (
										<div className="list-item">
											<img src={`${asset.Image}`} alt={asset.Name} />
											{asset.FullName}
										</div>
									))}
							</div>

							<div className="blockchain-tracker">Create wallet</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	componentWillReceiveProps(props) {
		console.log(props.assets)
	}
}

export default connect(
	({ assets }) => ({ assets }),
	{ fetchAssetsList }
)(AddWallet)
