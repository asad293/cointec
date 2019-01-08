import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { updatePassword } from '../../store/actions'
import cn from 'classnames'

class UpdatePassword extends Component {
	constructor() {
		super()
		this.state = {}
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
			this.props.onClose()
		}
	}

	onSubmit(values) {
		this.props
			.updatePassword({
				ctUser: this.props.ctUser,
				password: values.password,
				newPassword: values.newPassword
			})
			.then(res => {
				console.log(res)
				this.props.onPasswordUpdated()
				this.onClose()
			})
		// this.props.onClose()
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
							<h5 className="modal-heading text-left">Update password</h5>
							<hr />
							<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
								<div className="row">
									<div className="col-12">
										<Field
											name="password"
											label="Current password"
											type="password"
											placeholder="••••••••"
											className="mt-4"
											validate={password}
											component={this.renderField}
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-12">
										<Field
											name="newPassword"
											label="New password"
											type="password"
											placeholder="••••••••"
											validate={password}
											component={this.renderField}
										/>
									</div>
								</div>
								<div className="row mt-4">
									{this.props.accounts.error && (
										<div className="col-md-12 mb-2 text-danger">
											{/* {this.props.accounts.error.response.data.Message} */}
											Incorrect current password
										</div>
									)}
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
											<span>Update password</span>
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
	{ updatePassword }
)(
	reduxForm({
		form: 'UpdatePasswordForm'
	})(UpdatePassword)
)
