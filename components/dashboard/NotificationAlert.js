import React from 'react'

const NotificationAlert = ({ children, onHide }) => (
	<div className="alert-message alert-success">
		{/* <div className="d-none d-md-flex justify-content-center align-items-center container position-relative"> */}
		<div className="d-flex justify-content-center align-items-center container position-relative">
			{/* <p>{message || <br />}</p> */}
			{children}
			<a className="btn-hide-alert" onClick={onHide}>
				<i className="far fa-times fa-lg" />
			</a>
		</div>
		{/* <div className="d-flex d-md-none justify-content-center container position-relative">
			<p>Get verified to make GBP transactions</p>
			<a className="btn-hide-alert" onClick={onHide}>
				<i className="far fa-times fa-lg" />
			</a>
		</div> */}
	</div>
)

export default NotificationAlert
