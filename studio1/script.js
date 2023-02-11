// open IIFE
(function() {

    'use strict';
    console.log('reading js');

    const start = document.querySelector('#start');
    start.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('#intro').className = 'hidden';
        document.querySelector('#input').className = 'showing';
        document.querySelector('#form1').className = 'displayForm';
        document.querySelector('#form2').className = 'hidden';
        document.querySelector('#output').className = 'hidden';

        document.querySelector('#next').className = 'displayForm';
        document.querySelector('#submit').className = 'hidden';
        
        document.body.style.backgroundColor = 'white';

    })

    const back1 = document.querySelector('#backIntro');
    back1.addEventListener('click', function () {

        document.querySelector('#intro').className = 'showing';
        document.querySelector('#input').className = 'hidden';
        document.querySelector('#output').className = 'hidden';
        document.querySelector('#form1').className = 'hidden';
        document.querySelector('#form2').className = 'hidden';

        document.body.style.backgroundColor = '#333';
    })


    const next = document.querySelector('#next');
    next.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('#intro').className = 'hidden';
        document.querySelector('#input').className = 'showing';
        document.querySelector('#form1').className = 'hidden';
        document.querySelector('#form2').className = 'displayForm';    
        document.querySelector('#output').className = 'hidden';

        document.querySelector('#next').className = 'hidden';
        document.querySelector('#backIntro').className = 'hidden';
        document.querySelector('#backInput').className = 'displayForm';
        document.querySelector('#submit').className = 'displayForm';
    })

    const back2 = document.querySelector('#backInput');
    back2.addEventListener('click', function () {
        document.querySelector('#intro').className = 'hidden';
        document.querySelector('#input').className = 'showing';
        document.querySelector('#form1').className = 'displayForm';
        document.querySelector('#output').className = 'hidden';
        document.querySelector('#form2').className = 'hidden';

        document.querySelector('#next').className = 'displayForm';
        document.querySelector('#backIntro').className = 'displayForm';
        document.querySelector('#backInput').className = 'hidden';
        document.querySelector('#submit').className = 'hidden';

    })

    const submit = document.querySelector('#form');
    submit.addEventListener('submit', function (event) {
        event.preventDefault();
        document.querySelector('#intro').className = 'hidden';
        document.querySelector('#input').className = 'hidden';
        document.querySelector('#output').className = 'showing';
        document.querySelector('#form1').className = 'hidden';
        document.querySelector('#form2').className = 'hidden';

        const name = document.querySelector('#personName').value;
        const time = document.querySelector('#time').value;
        const event2 = document.querySelector('#event').value;

        console.log(`ayo look at this ${name} ${time} ${event2}`);

        const nameput = document.querySelector('#nameInput');
        nameput.innerHTML = name;
    })


// close IIFE
}())