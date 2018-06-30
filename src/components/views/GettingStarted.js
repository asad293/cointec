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
                (re-word) We've gathered useful info about the basics of digital currency to help Luno newcomers and complete beginners satisfy their curiosity and orientate themselves about the digital currency phenomenon. 

              </p>

              <div className="query-container">
                <div className="query">
                  <div className="d-flex">
                    <img src="/img/entity.svg" alt="digital currency" />
                    <h4 className="query-heading">What are digital currencies?</h4>
                  </div>
                  <p>
                    A digital currency is a form of currency that is available only in 
                    electronic form and has no physical form such as banknotes or coins. 
                    As with traditional forms of currency, digital currency can be exchanged 
                    for goods, used as a store of value and sent to others.
                  </p>
                  <p>
                    Bitcoin, the first digital currency of its kind, is considered a technological 
                    breakthrough as it was the first peer-to-peer payment system that doesn’t need 
                    to rely on a single authority to maintain it. 
                  </p>
                  <p>
                    Digital currency transactions are recorded on a publicly shared ledger (a blockchain). 
                    Each digital currency operates on its own blockchain where transactions are inspected 
                    and validated by a network of individuals.
                  </p>
                </div>

                <div className="query">
                  <div className="d-flex">
                    <img src="/img/currency.svg" alt="currency" />
                    <h4 className="query-heading">How are digital currency prices set?</h4>
                  </div>
                  <p>
                    As with of other assets such as stocks or commodities, digital currency prices change 
                    based on the constant supply and demand in the market. Put simply, if more market 
                    participants are looking to buy a digital currency at any given point in time, the 
                    price of the digital currency will increase. The opposite is also true. 
                  </p>
                  <p>
                    Unlike traditional currency markets, digital currency markets operate 24 hours a day, 
                    all year round.   
                  </p>
                </div>

                <div className="query">
                  <div className="d-flex">
                    <img src="/img/transfer.svg" alt="transfer" />
                    <h4 className="query-heading">Wallets: storing, sending and receiving digital currency</h4>
                  </div>
                  <p>
                    Digital currency is stored in electronic wallets. A wallet is simply a pair of keys: a public 
                    key and private key. The public key, also referred to as the wallet address, is used to identify 
                    a wallet. Think of the public key as your bank account number and sort-code, this is what you 
                    would share with others to let them know where to send a payment.
                  </p>
                  <p>
                    The private key is used to access the wallet and send funds. Think of this as your credit card pin – but 
                    longer and more complex. You should not share your private key with anyone else.
                  </p>
                </div>

                <div className="query">
                  <div className="d-flex">
                    <img src="/img/wallet-gs.svg" alt="wallet" />
                    <h4 className="query-heading">Types of digital currency wallets</h4>
                  </div>
                  <p>
                    There are a number of different types of wallets. The most suitable type of wallet depends on what you intend 
                    to use your digital currency for.
                  </p>
                  <p>
                    An online wallet is based on the web and removes the need for downloading any software. Online wallets are ideal 
                    for storing digital currency for short periods of time. If you do not plan on actively buying, selling or sending 
                    the funds, you should consider using a more secure option such as an offline wallet or hardware wallet. Some 
                    online wallet can be accessed using traditional password, in which case the platform hosting the wallet takes 
                    custody of your private key for convenience. An example of this would be a Blockchain.info hosted wallet. Other 
                    online wallets give you the option to custody the private key and require you to enter it in order to access the 
                    wallet. An example of this would be a <a href="https://www.myetherwallet.com">MyEtherWallet.com</a> hosted wallet. 
                  </p>
                  <p>
                    An offline wallet is a wallet, wherein the private key only exists on a device that is completely disconnected from 
                    the internet. This is the most secure method, ideal for storing digital currency for longer periods of time.
                  </p>
                  <p>
                    A hardware wallet is a dedicated piece of hardware, such as a USB drive, designed to store digital currency.
                  </p>
                </div>

                <div className="query">
                  <div className="d-flex">
                    <img src="/img/lock-gs.svg" alt="lock" />
                    <h4 className="query-heading">How to keep your digital currency safe</h4>
                  </div>
                  <p>
                    There are a number of steps you can take to improve the security of your wallet and funds.
                  </p>
                  <p>
                    Firstly, chose strong passwords with a large number of varied characters. Whilst there is no golden number, a 
                    sensible absolute minimum would be 30 characters. 
                  </p>
                  <p>
                    Whenever you’re given the option, ensure that you have enabled 2-factor authentication. This added layer of 
                    security ensures that even if you’re password is compromised by a hacker, they will not be able to access your 
                    wallet without also compromising your 2FA device. 
                  </p>
                  <p>
                    Do not leave your digital currency on an online wallet for longer than necessary. As a rule of thumb, if you 
                    don’t have a near immediate need for your digital currency, move it to an offline wallet or a hardware wallet.
                  </p>
                  <p>
                    Backup your private keys by making copies outside of your personal devices that you access regularly. You can 
                    make electronic copies on a USB drive for example or print your private and public keys on a paper wallet.
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