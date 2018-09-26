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
import Learn from '../views/Learn'
import DigitalCurrencyBasics from '../views/DigitalCurrencyBasics'
import DigitalWallets from '../views/DigitalWallets'
import BlockChain from '../views/BlockChain'
import GlossaryOfTerms from '../views/GlossaryOfTerms'
import GlossaryOfTokens from '../views/GlossaryOfTokens'
import PrivacyPolicy from '../views/PrivacyPolicy'
import Exchange from '../views/Exchange'
import TransactionTracker from '../views/TransactionTracker'
import Terms from '../views/Terms'
import Security from '../views/Security'
import DigitalCurrencyList from '../views/DigitalCurrencyList'

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
                <Route exact path="/buy-*" component={Home} />
                <Route exact path="/login" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/reset-link-expired/:token?" component={ForgotPassword} />
                <Route exact path="/link-sent/:type" component={LinkSent} />
                <Route exact path="/reset-password" component={ResetPassword} />
                <Route exact path="/support" component={Support} />
                <Route exact path="/digital-currency-list" component={DigitalCurrencyList} />
                <Route exact path="/privacy" component={PrivacyPolicy} />
                <Route exact path="/terms" component={Terms} />
                <Route exact path="/learn" component={Learn} />
                <Route exact path="/security" component={Security} />
                <Route exact path="/digital-currency-basics" component={DigitalCurrencyBasics} />
                <Route exact path="/digital-wallets" component={DigitalWallets} />
                <Route exact path="/blockchain" component={BlockChain} />
                <Route exact path="/glossary-of-terms" component={GlossaryOfTerms} />
                <Route exact path="/glossary-of-tokens" component={GlossaryOfTokens} />
                {/* <Route exact path="/getting-started" component={Learn} />
                <Route exact path="/terminology" component={Learn} /> */}
                <Route exact path="/exchange/:receiveCurrency?" component={Exchange} />
                <Route exact path="/transaction-tracker/:txnID" component={TransactionTracker} />
            </Switch>
        )
    }
}

export default Routes