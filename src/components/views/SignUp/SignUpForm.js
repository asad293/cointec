import React from 'react'
import cn from 'classnames'
import { Field, reduxForm } from 'redux-form'
import PasswordToggle from '../../core/PasswordToggle'

const SignUpForm = ({ handleSubmit, maskPassword, toggleMask, loading }) => (
	<form className="signup-form" onSubmit={handleSubmit} noValidate>
		<Field
			name="emailAddress"
			type="email"
			label="Email"
			placeholder="email@cointec.co.uk"
			autoComplete="email"
			validate={emailAddress}
			component={renderEmailField}
		/>
		
		<Field
			name="password"
			label="Password"
			placeholder="••••••••"
			validate={password}
			mask={maskPassword}
			toggleMask={toggleMask}
			component={renderPasswordField}
		/>

		<button
			type="submit"
			className="btn btn-primary"
			disabled={loading}>
			{loading
				? <div><i className="fas fa-spinner fa-spin" /></div>
				: <span>Create an account</span>}
		</button>
	</form>
)

const renderEmailField = ({ input, label, placeholder, autoComplete, type, meta: { touched, error }}) => (
	<div className={cn('form-group', touched && error ? 'invalid' : null)}>
		<label>{touched && error ? error : label}</label>
		<input
			{...input}
			type={type}
			className="form-control"
			placeholder={placeholder}
			autoComplete={autoComplete ? autoComplete : 'off'}
		/>
	</div>
)

const renderPasswordField = ({ input, label, placeholder, mask, toggleMask, meta: { touched, error, valid, pristine }}) => (
	<div className={cn('form-group', touched && error ? 'invalid' : !pristine && valid ? 'valid' : null)}>
		<label htmlFor="password">{touched && error ? error : label}</label>
		<div className="password-validation position-relative">
			<input
				id="password"
				{...input}
				type={mask ? 'text' : 'password'}
				className="form-control password"
				placeholder={placeholder}
				autoComplete="off"
			/>

			<PasswordToggle
				visible={mask}
				onToggle={toggleMask}
			/>

			<div className="typing-validator">8 or more character</div>
		</div>
	</div>
)

// Validators
const emailAddress = value => {
	const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return !regex.test(value) ? 'Please enter a valid email' : undefined
}
const password = value => !value || value.length < 8 ? 'Please enter a valid password' : undefined

export default reduxForm({
	form: 'SignUpForm'
})(SignUpForm)