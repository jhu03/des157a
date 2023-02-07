// open IIFE
(function() {

    'use strict';
    console.log('reading js');

    const start = document.querySelector('#start');
    start.addEventListener('click', function () {
        document.querySelector('#intro').className = 'hidden';
        document.querySelector('#input').className = 'showing';
        document.querySelector('#form2').className = 'hidden';
    })

    const home = document.querySelector('#home');
    home.addEventListener('click', function () {
        document.querySelector('#intro').className = 'showing';
        document.querySelector('#input').className = 'hidden';
    })

    const next = document.querySelector('#next');
    next.addEventListener('click', function () {
        // document.querySelector('#intro').className = 'hidden';
        // document.querySelector('#input').className = 'showing';
        document.querySelector('#form1').className = 'hidden';
        // document.querySelector('#form2').className = 'showing';

    })

// close IIFE
}())