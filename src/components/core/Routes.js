import React, { Component } from 'react'
import { Route, Switch } from 'react-router'

import Home from '../views/Home'
import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'
import ForgotPassword from '../views/ForgotPassword'
import ActivationLinkSent from '../views/ActivationLinkSent'
import ResetLinkSent from '../views/ResetLinkSent'
import ResetPassword from '../views/ResetPassword'
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
                <Route exact path="/login" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/forgot-password/:token?" component={ForgotPassword} />
                <Route exact path="/activation-link-sent" component={ActivationLinkSent} />
                <Route exact path="/reset-link-sent" component={ResetLinkSent} />
                <Route exact path="/reset-password" component={ResetPassword} />
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