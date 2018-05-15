import React, { Component } from 'react'

class FormWrapper extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid position-absolute">
                    <div className="row full-height">
                        <div className="col-12 col-xl-6 bg-form-section"></div>
                        <div className="col-6 bg-greetings d-none d-xl-block"></div>
                    </div>
                </div>

                {this.props.children}
            </div>
        )
    }
}

export default FormWrapper