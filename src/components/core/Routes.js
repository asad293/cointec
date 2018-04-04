import React, { Component } from 'react'
import { Route, Switch } from 'react-router'

import Home from '../views/Home'
import Support from '../views/Support'
import Legal from '../views/Legal'
import PrivacyPolicy from '../views/PrivacyPolicy'
import Terms from '../views/Terms'

class Routes extends Component {
    componentWillUpdate() {
        window.scrollTo(0,0)
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/support" component={Support} />
                <Legal>
                    <Route path="/privacy" component={PrivacyPolicy} />
                    <Route path="/terms" component={Terms} />
                </Legal>
            </Switch>
        )
    }
}

export default Routes