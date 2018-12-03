import React, { Component } from 'react'
import { formValueSelector, Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { fetchUserDetails, saveUserDetails } from '../../store/actions'
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

	componentWillMount() {
		this.props.fetchUserDetails(this.props.ctUser)
	}

	onSubmit(values) {
		// event.preventDefault()
		console.log(values)
		this.props.saveUserDetails(this.props.ctUser, values)
		// this.props.onConfirm()
	}

	toggleManual() {
		this.setState({
			manualAddress: true
		})
	}

	render() {
		return (
			<div className="card-wrapper text-left">
				<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<div className="row">
						<div className="col-12">
							<h5 className="heading">Your profile</h5>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-md-6">
							<Field
								name="firstName"
								label="First name"
								component={this.renderField}
							/>
						</div>
						<div className="col-12 col-md-6">
							<Field
								name="lastLame"
								label="Last name"
								component={this.renderField}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-md-6">
							<Field
								name="birthDate"
								label="Date of bith"
								// type="date"
								component={this.renderField}
								placeholder="01/01/1999"
								normalize={this.normalizeBirthDate}
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
											name="postCode"
											label="Post code"
											component={this.renderField}
											className="m-0"
											placeholder="Enter post code"
										/>
									</div>
									<div className="col-12 col-md-6">
										<a
											className="btn-field"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false">
											Lookup postal code
										</a>
										<div className="lookup-dropdown-menu dropdown-menu dropdown-menu-right">
											<div className="dropdown-item">SE1 7BP</div>
										</div>
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
											name="town"
											label="Town/City"
											component={this.renderField}
											className="m-md-0"
										/>
									</div>
									<div className="col-12 col-md-6">
										<Field
											name="postCode"
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

	normalizeBirthDate(value) {
		if (!value) {
			return value
		}
		const onlyNums = value.replace(/[^\d]/g, '')

		if (onlyNums.length <= 2) {
			return onlyNums
		}
		if (onlyNums.length <= 4) {
			return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}`
		}
		return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}/${onlyNums.slice(
			4,
			8
		)}`
	}

	componentWillReceiveProps(props) {
		if (props.accounts && props.accounts.userDetails) {
			this.props.change('firstName', props.accounts.userDetails.FirstName)
			this.props.change('lastLame', props.accounts.userDetails.LastName)
		}
	}
}

const mapStateToProps = state => {
	const selector = formValueSelector('VerificationForm')
	let firstName = selector(state, 'firstName')
	let lastName = selector(state, 'lastName')
	let birthDate = selector(state, 'birthDate')
	let address1 = selector(state, 'address1')
	let address2 = selector(state, 'address2')
	let town = selector(state, 'town')
	let postCode = selector(state, 'postCode')
	return {
		accounts: state.accounts,
		firstName,
		lastName,
		birthDate,
		address1,
		address2,
		town,
		postCode
	}
}

export default reduxForm({
	form: 'VerificationForm'
})(
	connect(
		mapStateToProps,
		{ fetchUserDetails, saveUserDetails }
	)(BasicDetails)
)
