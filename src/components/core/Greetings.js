import React, { Component } from 'react'

class Greetings extends Component {
    render() {
        const { heading, messageText } = this.props

        return (
            <div className="col-6 greetings d-none d-xl-block">
                <div className="content-wrapper">
                    <h1 className="heading">{heading}</h1>
                    <p className="message-text">{messageText}</p>
                </div>
            </div>
        )
    }
}

export default Greetings