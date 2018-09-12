import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from '../core/Header'
import ResetPasswordForm from './ResetPassword/ResetPasswordForm'

import { resetPassword } from '../../Redux/actions'

class ResetPassword extends Component {
	constructor() {
		super()
		this.state = {
			maskPassword: false,
			maskConfirmPassword: false,
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.toggleMask = this.toggleMask.bind(this)
		this.toggleMaskConfirm = this.toggleMaskConfirm.bind(this)
	}

	handleSubmit(values) {
		this.props.resetPassword(values)
	}

	toggleMask() {
		this.setState({
			maskPassword: !this.state.maskPassword
		})
	}

	toggleMaskConfirm() {
		this.setState({
			maskConfirmPassword: !this.state.maskConfirmPassword
		})
	}

	render() {
		const { loading } = this.props.auth

		return (
			<div className="signin-page">
				<Header background="gradient">
					<div className="sg-logo text-center position-relative">
						<Link to='/'>
							<img src="/img/logo-white.svg" alt="logo" />
						</Link>
					</div>
				</Header>
				<section className="form-wrapper">
					<div className="form-heading-wrapper">
						<h5 className="form-heading">Reset password</h5>
					</div>
					<hr />

					<ResetPasswordForm
						loading={loading}
						maskPassword={this.state.maskPassword}
						maskConfirmPassword={this.state.maskConfirmPassword}
						toggleMask={this.toggleMask}
						toggleMaskConfirm={this.toggleMaskConfirm}
						onSubmit={this.handleSubmit}
					/>
				</section>
			</div>
		)
	}
	// render() {
	//     const { form, passwordVisible, confirmPasswordVisible } = this.props.resetPasswordStore

	//     const labelPassword = form.isValid('password') ? 'New Password' : 'Please enter a valid password'
	//     const labelConfirmPassword = form.isValid('confirmPassword') ? 'Confirm New Password' : 'Please enter a valid password'

	//     return (
	//         <FormWrapper>
	//             <div className="container">
	//                 <div className="row">
	//                     <div className="col-12 col-xl-4 form-section">
	//                         <Link to='/'>
	//                             <img src="/img/logo-color.svg" alt="Cointec Logo" className="mb-5" />
	//                         </Link>

	//                         <h1 className="page-title">Reset password</h1>

	//                         <form className="als-content" onSubmit={this.handleSubmit.bind(this)} noValidate>
	//                             <div className={'form-group ' + (!form.isValid('password') ? 'invalid' : '')}>
	//                                 <label htmlFor="password">{labelPassword}</label>
	//                                 <div className="position-relative">
	//                                     <input type={passwordVisible ? 'text' : 'password'}
	//                                         name="password"
	//                                         className="form-control password"
	//                                         placeholder="••••••••"
	//                                         value={form.data.password}
	//                                         onBlur={this.validate.bind(this)}
	//                                         onChange={this.handleInputChange.bind(this)} />

	//                                     <div className="validation-box">
	//                                         <h5 className="validation-heading">Password must contain:</h5>
	//                                         <ul className="validation-rules">
	//                                             <li className={!form.check('password', 'minLength') ? 'passed' : ''}>At least 8 characters</li>
	//                                             <li className={!form.check('password', 'containUpper') ? 'passed' : ''}>At least 1 capital letter</li>
	//                                             <li className={!form.check('password', 'containNumber') ? 'passed' : ''}>At least 1 number</li>
	//                                         </ul>
	//                                     </div>

	//                                     <PasswordToggle visible={passwordVisible} onToggle={this.togglePassword.bind(this)} />
	//                                 </div>
	//                             </div>

	//                             <div className={'form-group ' + (!form.isValid('confirmPassword') ? 'invalid' : '')}>
	//                                 <label htmlFor="password">{labelConfirmPassword}</label>
	//                                 <div className="position-relative">
	//                                     <input type={confirmPasswordVisible ? 'text' : 'password'}
	//                                         name="confirmPassword"
	//                                         className="form-control password"
	//                                         placeholder="••••••••"
	//                                         value={form.data.confirmPassword}
	//                                         onBlur={this.validate.bind(this)}
	//                                         onChange={this.handleInputChange.bind(this)} />

	//                                     <div className="validation-box">
	//                                         <ul className="validation-rules">
	//                                             <li className={!form.check('confirmPassword') ? 'passed' : ''}>Passwords must match</li>
	//                                         </ul>
	//                                     </div>

	//                                     <PasswordToggle visible={confirmPasswordVisible} onToggle={this.toggleConfirmPassword.bind(this)} />
	//                                 </div>
	//                             </div>

	//                             <button type="submit" className="btn btn-primary">Confirm</button>
	//                         </form>
	//                     </div>

	//                     <Greetings
	//                         heading="Reset password."
	//                         messageText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu lobortis est. Nullam quis augue eu." />
	//                 </div>
	//             </div>
	//         </FormWrapper>
	//     )
	// }
}

export default connect(({auth}) => ({auth}), { resetPassword })(ResetPassword)
