import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import cn from 'classnames'

class CloseAccount extends Component {
	constructor() {
		super()
		this.state = {}
		this.onClose = this.onClose.bind(this)
		this.onClickOutside = this.onClickOutside.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onClose() {
		this.props.onClose()
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
			this.props.onClose()
		}
	}

	onSubmit(event) {
		event.preventDefault()
		this.props.onClose()
	}

	render() {
		return (
			<div
				className="modal fade show"
				id="abandon-order-modal"
				role="dialog"
				data-backdrop="false"
				style={{ display: 'block' }}>
				<div className="modal-dialog modal-account-settings" role="document">
					<div className="modal-content">
						<div className="modal-body">
							<button type="button" className="close" onClick={this.onClose}>
								<i className="far fa-times fa-xs" />
							</button>
							<h5 className="modal-heading text-left">Close your account</h5>
							<hr />
							<form onSubmit={this.onSubmit}>
								<div className="row">
									<div className="col-12">
										<p className="modal-message">
											We will send you a confirmation email with a link to close
											your account.
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
											className={cn('btn btn-block btn-lg', 'btn-danger')}>
											Permenantly close my account
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

export default reduxForm({
	form: 'CloseAccountForm'
})(CloseAccount)
