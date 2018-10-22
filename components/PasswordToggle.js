import React from 'react'

const PasswordToggle = ({ visible, onToggle }) => (
	<a href="javascript:void(0)" className="show-password" onClick={onToggle}>
		<i className={visible ? 'fas fa-eye-slash' : 'fas fa-eye'} />
	</a>
)

export default PasswordToggle
