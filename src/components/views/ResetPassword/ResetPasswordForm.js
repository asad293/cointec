import React from 'react'
import cn from 'classnames'
import { Field, reduxForm } from 'redux-form'
import PasswordToggle from '../../core/PasswordToggle'

const ResetPasswordForm = ({ handleSubmit, maskPassword, toggleMask, maskConfirmPassword, toggleMaskConfirm, loading }) => (
	<form className="als-content" onSubmit={handleSubmit} noValidate>
		<Field
			name="password"
			label="New Password"
			placeholder="••••••••"
      mask={maskPassword}
      validate={password}
			toggleMask={toggleMask}
			component={renderPasswordField}
		/>

		<Field
			name="confirmPassword"
			label="Confirm New Password"
			placeholder="••••••••"
      mask={maskConfirmPassword}
      validate={password}
			toggleMask={toggleMaskConfirm}
			component={renderPasswordField}
		/>

		<button
			type="submit"
			className="btn btn-primary"
			disabled={loading}>
			{loading
				? <div><i className="fas fa-spinner fa-spin" /></div>
				: <span>Confirm</span>}
		</button>
	</form>
)

const renderPasswordField = ({ input, label, placeholder, mask, toggleMask, meta: { touched, error }}) => (
	<div className={cn('form-group', touched && error ? 'invalid' : null)}>
		<label htmlFor="password">{touched && error ? error : label}</label>
		<div className="password-validation position-relative">
			<input
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
const password = value => !value || value.length < 8 ? 'Please enter a valid password' : undefined

export default reduxForm({
	form: 'ResetPasswordForm'
})(ResetPasswordForm)