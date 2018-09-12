//  This must be here to be read by Webpack
import css from './app.scss'

//  Load 3rd Party Javascript Files - From Node Modules
// import jQuery from 'jquery';
// window.$ = window.jQuery = jQuery;
import 'bootstrap'
import 'bxslider'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import 'owl.carousel'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel'
//import '@fancyapps/fancybox';

//  Load Custom "local" Javascript code
//require('./js/search.js');
// import fontawesome from '@fortawesome/fontawesome';
// import regular from '@fortawesome/fontawesome-pro-regular';

// fontawesome.library.add(regular);

//  jQuery Ready Function
$(document).ready(function() {
	$('.bxslider').bxSlider()

	// $('.owl-carousel').owlCarousel({
	//     loop:true,
	//     //nav:true,
	//     responsive:{
	//         0:{
	//             items:1
	//         },
	//         992:{
	//             items:3
	//         }
	//     }
	// })
})

//  General - Example of Global Function
// window.MyFunction = function () {
//     alert("Hello from my function");
// }

//  ES6 Syntax Example
//  Simple string substitution
//var name = "Brendan";
//console.log(`Yo, ${name}!`);

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'

import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './Redux/reducers'
import promise from 'redux-promise'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers, {}, applyMiddleware(ReduxThunk))}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
