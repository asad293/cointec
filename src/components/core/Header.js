import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <header className="bg-gradient bg-primary-gradient">
                {this.props.children}
            </header>
        )
    }
}

export default Header