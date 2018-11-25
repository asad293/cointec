import React, { Component } from 'react'
import { formValueSelector, Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import cn from 'classnames'
import _ from 'lodash'

class BasicDetails extends Component {
	constructor(props) {
		super(props)
		this.state = {
			manualAddress: false
		}

		this.onSubmit = this.onSubmit.bind(this)
		this.toggleManual = this.toggleManual.bind(this)
	}

	onSubmit(event) {
		event.preventDefault()
		this.props.onConfirm()
	}

	toggleManual() {
		this.setState({
			manualAddress: true
		})
	}

	render() {
		return (
			<div className="card-wrapper text-left">
				<form onSubmit={this.onSubmit}>
					<div className="row">
						<div className="col-12">
							<h5 className="heading">Your profile</h5>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-md-6">
							<Field
								name="firstname"
								label="First name"
								component={this.renderField}
							/>
						</div>
						<div className="col-12 col-md-6">
							<Field
								name="lastname"
								label="Last name"
								component={this.renderField}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-md-6">
							<Field
								name="birthdate"
								label="Date of bith"
								type="date"
								component={this.renderField}
							/>
						</div>
					</div>
					<div className="row d-none d-md-flex">
						<div className="col-12">
							<hr />
						</div>
					</div>
					<div className="row mt-2 mt-md-0">
						<div className="col-12">
							<h5 className="heading">Your address</h5>
						</div>
					</div>
					{!this.state.manualAddress
						? [
								<div className="row" key={0}>
									<div className="col-12 col-md-6">
										<a
											className="manually-link d-block d-md-none"
											onClick={this.toggleManual}>
											Enter manually
										</a>
										<Field
											name="postcode"
											label="Post code"
											component={this.renderField}
											className="m-0"
											placeholder="Enter post code"
										/>
									</div>
									<div className="col-12 col-md-6">
										<a className="btn-field">Lookup postal code</a>
									</div>
								</div>,
								<div className="row d-none d-md-flex" key={1}>
									<div className="col-12">
										<a className="form-link" onClick={this.toggleManual}>
											Enter address manually
										</a>
									</div>
								</div>
						  ]
						: [
								<div className="row" key={0}>
									<div className="col-12 col-md-6">
										<Field
											name="address1"
											label="Address Line 1"
											component={this.renderField}
										/>
									</div>
									<div className="col-12 col-md-6">
										<Field
											name="address2"
											label="Address Line 2"
											component={this.renderField}
										/>
									</div>
								</div>,
								<div className="row" key={1}>
									<div className="col-12 col-md-6">
										<Field
											name="city"
											label="Town/City"
											component={this.renderField}
											className="m-md-0"
										/>
									</div>
									<div className="col-12 col-md-6">
										<Field
											name="postcode"
											label="Post Code"
											component={this.renderField}
											className="m-0"
										/>
									</div>
								</div>
						  ]}
					<div className="row mt-4">
						<div className="col-md-12">
							<button
								type="submit"
								className={cn(
									'btn btn-block btn-lg btn-exchange',
									'btn-success'
								)}>
								Proceed to next step
							</button>
						</div>
					</div>
				</form>
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

export default reduxForm({
	form: 'VerificationForm'
})(BasicDetails)
