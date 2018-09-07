import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { coins } from '../../SimpleCalculator/exchangeables'

class CurrencySlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assets: coins
    }
  }

  componentDidMount() {
    $('.currency-carousel').slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    })
  }
  
  render() {
    return (
      <div className="bg-gradient bg-mid-gradient d-none d-md-block">
        <div className="currency-slider container">
          <div className="row">
            <div className="col px-0">
              <div className="currency-carousel">
                {
                  this.state.assets.map(asset => (
                    <Link to={`/#buy-${_.kebabCase(asset.fullName)}`} className="currency-item" key={asset.name}>
                      <img src={asset.image} alt={asset.name} />
                      <label className="m-0">{document.documentElement.clientWidth > 992 ? asset.fullName : asset.name}</label>
                    </Link>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <hr className="m-0" style={{borderTop: '1px solid #E5E5E5'}} />
      </div>
    )
  }
}

export default CurrencySlider