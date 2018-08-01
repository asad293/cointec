import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Routes from './core/Routes'
import SubscribeModal from './modals/SubscribeModal'
import AddBankAccount from './Calculator/AddBankAccount'

class App extends Component {
    render() {
        return (
            <div>
                <Routes />
                <AddBankAccount />
                <SubscribeModal />
            </div>
        )
    }
}

export default withRouter(App)