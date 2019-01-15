import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { requestData, exportData } from '../../store/actions'
import cn from 'classnames'

class RequestData extends Component {
	constructor() {
		super()
		this.state = {
			closed: false
		}
		this.onClose = this.onClose.bind(this)
		this.onClickOutside = this.onClickOutside.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
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
			node => node.className === 'modal-dialog modal-account-settings'
		)
		if (!select) {
			this.onClose()
		}
	}

	onSubmit(values) {
		if (this.props.action === 'export') {
			this.props
				.exportData({
					emailAddress: this.props.emailAddress,
					password: values.password
				})
				.then(res => {
					console.log(res)
					this.props.onRequestSent()
					this.onClose()
				})
		} else {
			this.props
				.requestData({
					emailAddress: this.props.emailAddress,
					password: values.password
				})
				.then(res => {
					console.log(res)
					this.props.onRequestSent()
					this.onClose()
				})
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
					className="modal-dialog modal-account-settings"
					role="document"
					style={{ transform: this.state.closed ? 'translateY(-120%)' : '' }}>
					<div className="modal-content">
						<div className="modal-body">
							<button type="button" className="close" onClick={this.onClose}>
								<i className="far fa-times fa-xs" />
							</button>
							<h5 className="modal-heading text-left">Data access request</h5>
							<hr />
							<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
								<div className="row">
									<div className="col-12">
										<p className="modal-message">
											A link to download your personal data will be sent to your
											email address within 3 days.
										</p>
									</div>
								</div>
								<div className="row">
									<div className="col-12">
										<Field
											name="password"
											label="Password"
											type="password"
											placeholder="••••••••"
											className="mt-0"
											validate={password}
											component={this.renderField}
										/>
									</div>
								</div>
								<div className="row mt-4">
									<div className="col-md-12">
										<button
											type="submit"
											className={cn('btn btn-block btn-lg', 'btn-primary')}
											disabled={this.props.accounts.loading}>
											{this.props.accounts.loading && (
												<div
													style={{ display: 'inline-block', marginRight: 12 }}>
													<i className="fas fa-spinner fa-spin" />
												</div>
											)}
											<span>Request data</span>
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}

	renderField({
		placeholder,
		meta: { touched, valid, error },
		label,
		input,
		className,
		type
	}) {
		return (
			<div
				className={cn(
					'field-wrapper',
					className,
					touched && !valid ? 'invalid' : null
				)}>
				<label className="field-label">
					{!touched ? label : valid ? label : error}
				</label>
				<input
					autoComplete="off"
					spellCheck={false}
					placeholder={placeholder}
					className="form-control"
					type={type}
					{...input}
				/>
			</div>
		)
	}
}

// Validators
const password = value => (!value ? 'Please enter a valid password' : undefined)

export default connect(
	({ accounts }) => ({ accounts }),
	{ requestData, exportData }
)(
	reduxForm({
		form: 'RequestDataForm'
	})(RequestData)
)
