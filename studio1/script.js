// open IIFE
(function() {

    'use strict';
    console.log('reading js');

    const start = document.querySelector('#start');
    start.addEventListener('click', function () {
        document.querySelector('#intro').className = 'hidden';
        document.querySelector('#input').className = 'showing';
        document.querySelector('#output').className = 'hidden';
        document.body.style.backgroundColor = 'white';
        // document.querySelector('#form2').className = 'hidden';
    })

    // const home = document.querySelector('#home');
    // home.addEventListener('click', function () {
    //     document.querySelector('#intro').className = 'showing';
    //     document.querySelector('#input').className = 'hidden';
    // })

    // const next = document.querySelector('#next');
    // next.addEventListener('click', function () {
    //     // document.querySelector('#intro').className = 'hidden';
    //     // document.querySelector('#input').className = 'showing';
    //     document.querySelector('#form1').className = 'hidden';
    //     // document.querySelector('#form2').className = 'showing';

    // })


    const submit = document.querySelector('#submit');
    submit.addEventListener('click', function () {
        document.querySelector('#intro').className = 'hidden';
        document.querySelector('#input').className = 'hidden';
        document.querySelector('#output').className = 'showing';
    })


// close IIFE
}())