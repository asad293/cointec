import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Panel extends Component {
    render() {
        return (
            <div className="accordion-panel">
                <h5 className="accordion-header m-0 collapsed" data-toggle="collapse" data-target={'#content-' + this.props.id}>
                    {this.props.heading}
                </h5>

                <div id={'content-' + this.props.id} className="collapse" data-parent="#accordion">
                    <div className="accordion-body" dangerouslySetInnerHTML={{__html: this.props.body}}>
                    </div>
                </div>
            </div>
        )
    }
}

Panel.propTypes = {
    id: PropTypes.any.isRequired,
    heading: PropTypes.string,
    body: PropTypes.string
}

export default Panel