import React, { Component } from 'react'

class Greetings extends Component {
    render() {
        const { heading, messageText } = this.props

        return (
            <div className="greetings">
                <div className="content-wrapper">
                    <h1 className="heading">{heading}</h1>
                    <p className="message-text">{messageText}</p>
                </div>
            </div>
        )
    }
}

export default Greetings