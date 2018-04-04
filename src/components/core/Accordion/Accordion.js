import React, { Component } from 'react'

class Accordion extends Component {
    render() {
        return (
            <div id="accordion" className="accordion">
                {this.props.children}
            </div>
        )
    }
}

export default Accordion