import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class GettingStarted extends Component {
  render() {
    return (
      <div className="py-5">
        <div className="container pb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8 col-md-12 getting-started">
              <h5 className="heading-top">Learn the essentials</h5>

              <p>
                The Luno Learning Portal is an excellent starting point. Here,
                we've gathered useful info about the basics of digital currency
                to help Luno newcomers and complete beginners satisfy their
                curiosity and orientate themselves about the digital currency
                phenomenon.
              </p>

              <div className="query-container">
                <div className="query">
                  <img src="/img/entity.svg" alt="digital currency" />
                  <h4 className="query-heading">What are digital currencies?</h4>
                  <p>
                    The Luno Learning Portal is an excellent starting point. Here,
                    we've gathered useful info about the basics of digital currency
                    to help Luno newcomers and complete beginners satisfy their
                    curiosity and orientate themselves about the digital currency
                    phenomenon. Each article can be read in isolation and explains
                    one concept about digital currency. After reading the Learning
                    Portal, you should feel more comfortable with digital currency
                    and hopefully better equipped to join the conversation.
                  </p>
                </div>

                <div className="query">
                  <img src="/img/wallet-gs.svg" alt="wallet" />
                  <h4 className="query-heading">How to store digital currency</h4>
                  <p>
                    The Luno Learning Portal is an excellent starting point. Here,
                    we've gathered useful info about the basics of digital currency
                    to help Luno newcomers and complete beginners satisfy their
                    curiosity and orientate themselves about the digital currency
                    phenomenon. Each article can be read in isolation and explains
                    one concept about digital currency. After reading the Learning
                    Portal, you should feel more comfortable with digital currency
                    and hopefully better equipped to join the conversation.
                  </p>
                </div>

                <div className="query">
                  <img src="/img/lock-gs.svg" alt="lock" />
                  <h4 className="query-heading">How to keep your digital currency safe</h4>
                  <p>
                    The Luno Learning Portal is an excellent starting point. Here,
                    we've gathered useful info about the basics of digital currency
                    to help Luno newcomers and complete beginners satisfy their
                    curiosity and orientate themselves about the digital currency
                    phenomenon. Each article can be read in isolation and explains
                    one concept about digital currency. After reading the Learning
                    Portal, you should feel more comfortable with digital currency
                    and hopefully better equipped to join the conversation.
                  </p>
                </div>

                <div className="query">
                  <img src="/img/transfer.svg" alt="transfer" />
                  <h4 className="query-heading">Sending and receiving digital currency</h4>
                  <p>
                    The Luno Learning Portal is an excellent starting point. Here,
                    we've gathered useful info about the basics of digital currency
                    to help Luno newcomers and complete beginners satisfy their
                    curiosity and orientate themselves about the digital currency
                    phenomenon. Each article can be read in isolation and explains
                    one concept about digital currency. After reading the Learning
                    Portal, you should feel more comfortable with digital currency
                    and hopefully better equipped to join the conversation.
                  </p>
                </div>

                <div className="query">
                  <img src="/img/currency.svg" alt="currency" />
                  <h4 className="query-heading">How are digital currency prices set?</h4>
                  <p>
                    The Luno Learning Portal is an excellent starting point. Here,
                    we've gathered useful info about the basics of digital currency
                    to help Luno newcomers and complete beginners satisfy their
                    curiosity and orientate themselves about the digital currency
                    phenomenon. Each article can be read in isolation and explains
                    one concept about digital currency. After reading the Learning
                    Portal, you should feel more comfortable with digital currency
                    and hopefully better equipped to join the conversation.
                  </p>
                </div>

              </div>

              <div className="info-terms">
                See <Link to='/terminology'>terminology</Link> for a list of digital currency related terms and explanations
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GettingStarted