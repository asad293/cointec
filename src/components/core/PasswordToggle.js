import React, { Component } from 'react'

class PasswordToggle extends Component {
    render() {
        const { visible, onToggle } = this.props
        
        return (
            <a href="javascript:void(0)" className="show-password" onClick={onToggle}>
                <i className={visible ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
            </a>
        )
    }
}

export default PasswordToggle