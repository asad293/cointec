import React, { Component } from 'react'
import { formValueSelector, Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import cn from 'classnames'
import _ from 'lodash'

import FileInput from '../FileInput'

class ProofOfAddress extends Component {
	constructor(props) {
		super(props)
		this.state = {
			uploading: false,
			file: null,
			progress: 0,
			error: false,
			timeout: null,
			uploaded: false
		}

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		const [file] = event.target.files
		if (file) {
			if (file.size > 26214400) {
				if (this.state.timeout) clearTimeout(this.state.timeout)
				const timeout = setTimeout(() => {
					this.setState({
						error: false,
						uploaded: true
					})
				}, 3000)
				this.setState({
					error: true,
					uploading: false,
					uploaded: false,
					file,
					timeout
				})
			} else {
				if (this.state.timeout) clearTimeout(this.state.timeout)
				const timeout = setTimeout(() => {
					this.setState({
						progress: 100
					})
					setTimeout(() => {
						this.props.onConfirm()
					}, 350)
				}, 1000)
				this.setState({
					error: false,
					uploading: true,
					uploaded: false,
					file,
					progress: 20,
					timeout
				})
			}
		}
		console.log(file)
	}

	render() {
		return (
			<div className="card-wrapper text-left">
				<div className="row">
					<div className="col-12">
						<h6 className="heading">Valid documents</h6>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<ul className="document-list">
							<li>
								<i className="fas fa-check-circle fa-xs" />
								Passport
							</li>
							<li>
								<i className="fas fa-check-circle fa-xs" />
								Full driving licence (photocard)
							</li>
							<li>
								<i className="fas fa-check-circle fa-xs" />
								Provisional driving license (photocard)
							</li>
							<li>
								<i className="fas fa-check-circle fa-xs" />
								Passport
							</li>
							<li>
								<i className="fas fa-check-circle fa-xs" />
								Full driving licence (photocard)
							</li>
							<li>
								<i className="fas fa-check-circle fa-xs" />
								Provisional driving license (photocard)
							</li>
							<li>
								<i className="fas fa-check-circle fa-xs" />
								Passport
							</li>
							<li>
								<i className="fas fa-check-circle fa-xs" />
								Full driving licence (photocard)
							</li>
						</ul>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<p className="upload-info">
							IDs must be in date at the time of upload. For passports, upload
							the entire photo page, for all other forms of ID a scan of just
							the front is acceptable.
						</p>
					</div>
				</div>
				{this.state.error && (
					<div className="row">
						<div className="col-12">
							<p className="error-message">Max file size is 25mb</p>
						</div>
					</div>
				)}
				{this.state.uploaded && (
					<div className="row">
						<div className="col-12">
							<p className="uploaded-message">
								Uploaded{' '}
								<span className="filename">{this.state.file.name}</span>
							</p>
						</div>
					</div>
				)}
				{this.state.uploading && (
					<div className="row">
						<div className="col-12">
							<p className="uploading-message">
								Uploading{' '}
								<span className="filename">{this.state.file.name}</span>
							</p>
							<div className="uploading-progress">
								<div
									className="progress"
									style={{ width: `${this.state.progress}%` }}
								/>
							</div>
						</div>
					</div>
				)}
				<div className="row">
					<div className="col-md-12">
						<FileInput
							type="submit"
							className={cn('btn btn-block btn-lg', 'btn-primary')}
							onChange={this.handleChange}
							disabled={this.state.uploading}>
							Upload proof of address
						</FileInput>
					</div>
				</div>
			</div>
		)
	}
}

export default reduxForm({
	form: 'VerificationForm'
})(ProofOfAddress)
