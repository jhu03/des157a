// open IIFE
(function() {

    'use strict';
    console.log('reading js');

    const start = document.querySelector('#start');
    start.addEventListener('click', function () {
        document.querySelector('#intro').style.display = 'none';
        document.querySelector('#input').style.display = 'block';
    })

    const home = document.querySelector('#home');
    home.addEventListener('click', function () {
        document.querySelector('#intro').style.display = 'flex';
        document.querySelector('#input').style.display = 'none';
    })

// close IIFE
}())