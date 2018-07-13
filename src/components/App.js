import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Routes from './core/Routes'
import SubscribeModal from './modals/SubscribeModal';

class App extends Component {
    render() {
        return (
            <div>
                <Routes />
                <SubscribeModal />
            </div>
        )
    }
}

export default withRouter(App)