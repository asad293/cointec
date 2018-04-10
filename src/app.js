﻿//  This must be here to be read by Webpack
const css = require('./app.scss');

//  Load 3rd Party Javascript Files - From Node Modules
import 'bootstrap';
import 'bxslider';
//import '@fancyapps/fancybox';

//  Load Custom "local" Javascript code
//require('./js/search.js');


//  jQuery Ready Function
$(document).ready(function () {
    $('.bxslider').bxSlider();

    $('.owl-carousel').owlCarousel({
        loop:true,
        //nav:true,
        responsive:{
            0:{
                items:1
            },
            992:{
                items:3
            }
        
        }
    })
});

//  General - Example of Global Function
// window.MyFunction = function () {
//     alert("Hello from my function");
// }

//  ES6 Syntax Example
//  Simple string substitution
//var name = "Brendan";
//console.log(`Yo, ${name}!`);



