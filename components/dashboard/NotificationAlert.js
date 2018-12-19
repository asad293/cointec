import React from 'react'

const NotificationAlert = ({ children, onHide }) => (
	<div className="alert-message alert-success">
		<div className="d-flex justify-content-center align-items-center container position-relative">
			{children}
			<a className="btn-hide-alert" onClick={onHide}>
				<i className="far fa-times fa-lg" />
			</a>
		</div>
	</div>
)

export default NotificationAlert
