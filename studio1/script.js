// open IIFE
(function() {

    'use strict';
    console.log('reading js');

    const start = document.querySelector('#start');
    start.addEventListener('click', function () {
        event.preventDefault();
        document.querySelector('#intro').className = 'hidden';
        document.querySelector('#input').className = 'showing';
        document.querySelector('#output').className = 'hidden';
        document.body.style.backgroundColor = 'white';
        document.querySelector('#form2').className = 'hidden';
    })

    // const home = document.querySelector('#home');
    // home.addEventListener('click', function () {
    //     document.querySelector('#intro').className = 'showing';
    //     document.querySelector('#input').className = 'hidden';
    // })

    const next = document.querySelector('#next');
    next.addEventListener('click', function () {
        event.preventDefault();
        document.querySelector('#intro').className = 'hidden';
        document.querySelector('#input').className = 'showing';
        document.querySelector('#form1').className = 'hidden';
        document.querySelector('#output').className = 'hidden';
        document.querySelector('#form2').className = 'displayForm';

    })


    const submit = document.querySelector('#form');
    submit.addEventListener('submit', function (event) {
        event.preventDefault();
        document.querySelector('#intro').className = 'hidden';
        document.querySelector('#input').className = 'hidden';
        document.querySelector('#output').className = 'showing';
        document.querySelector('#form1').className = 'hidden';
        document.querySelector('#form2').className = 'hidden';
    })


// close IIFE
}())