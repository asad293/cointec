import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <header className={this.props.background === 'gradient' ? 'bg-gradient bg-primary-gradient' : 'bg-solid'}>
                {this.props.children}
            </header>
        )
    }
}

export default Header