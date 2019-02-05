import React from 'react'
import cn from 'classnames'
import { Field, reduxForm } from 'redux-form'

const ResetPasswordForm = ({ handleSubmit, loading }) => (
	<form className="als-content" onSubmit={handleSubmit} noValidate>
		<Field
			name="password"
			label="New password"
			type="password"
			placeholder="••••••••"
			validate={[passwordLength, passwordLetter, passwordNumber]}
			component={renderField}
		/>

		<Field
			name="newPassword"
			label="Confirm new password"
			type="password"
			placeholder="••••••••"
			validate={[passwordLength, passwordLetter, passwordNumber]}
			component={renderField}
		/>

		<button type="submit" className="btn btn-primary" disabled={loading}>
			{loading ? (
				<div>
					<i className="fas fa-spinner fa-spin" />
				</div>
			) : (
				<span>Reset password</span>
			)}
		</button>
	</form>
)

const renderField = ({
	input,
	label,
	placeholder,
	autoComplete,
	type,
	meta: { touched, error }
}) => (
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

// Validators
const passwordLength = value =>
	!value || value.length < 8
		? 'Password must consist of 8 or more character'
		: undefined
const passwordLetter = value =>
	!/[a-zA-Z]/.test(value)
		? 'Password must contain at least 1 letter'
		: undefined
const passwordNumber = value =>
	!/[0-9]/.test(value) ? 'Password must contain at least 1 number' : undefined

export default reduxForm({
	form: 'ResetPasswordForm',
	validate: values => {
		const errors = {}
		if (values.password !== values.newPassword) {
			errors.newPassword = 'Confirm password does not match'
		}
		return errors
	}
})(ResetPasswordForm)
