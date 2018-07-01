import React, { Component } from 'react'
import { Route, Switch } from 'react-router'

import Home from '../views/Home'
import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'
import ForgotPassword from '../views/ForgotPassword'
import LinkSent from '../views/LinkSent'
import ResetPassword from '../views/ResetPassword'
import Support from '../views/Support'
import Legal from '../views/Legal'
import Learn from '../views/Learn';

class Routes extends Component {
    componentWillUpdate() {
        window.scrollTo(0,0)

        if (window.location.hash === '#livechat') {
            Intercom('show');
        }
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/reset-link-expired/:token?" component={ForgotPassword} />
                <Route exact path="/link-sent/:type" component={LinkSent} />
                <Route exact path="/reset-password" component={ResetPassword} />
                <Route exact path="/support" component={Support} />
                <Route exact path="/privacy" component={Legal} />
                <Route exact path="/terms" component={Legal} />
                <Route exact path="/getting-started" component={Learn} />
                <Route exact path="/terminology" component={Learn} />
            </Switch>
        )
    }
}

export default Routes