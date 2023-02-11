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
        document.querySelector('#form3').className = 'hidden';
        document.querySelector('#output').className = 'hidden';

        document.querySelector('#next').className = 'displayForm';
        document.querySelector('#next2').className = 'hidden';
        document.querySelector('#submit').className = 'hidden';
        
        document.body.style.backgroundColor = 'white';

    })

    const back1 = document.querySelector('#backIntro');
    back1.addEventListener('click', function () {

        // document.querySelector('#intro').className = 'showing';
        document.querySelector('#input').className = 'hidden';
        document.querySelector('#output').className = 'hidden';
        document.querySelector('#form1').className = 'hidden';
        document.querySelector('#form2').className = 'hidden';
        document.querySelector('#form3').className = 'hidden';

        document.body.style.backgroundColor = '#333';
    })


    const next = document.querySelector('#next');
    next.addEventListener('click', function (event) {
        event.preventDefault();
        // document.querySelector('#intro').className = 'hidden';
        document.querySelector('#input').className = 'showing';
        document.querySelector('#form1').className = 'hidden';
        document.querySelector('#form2').className = 'displayForm'; 
        console.log('test');
        // document.querySelector('#form3').className = 'hidden';   
        // document.querySelector('#output').className = 'hidden';

        document.querySelector('#next').className = 'hidden';
        document.querySelector('#backIntro').className = 'hidden';
        document.querySelector('#backInput').className = 'displayForm';
        document.querySelector('#next2').className = 'displayForm';
        document.querySelector('#submit').className = 'hidden';
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

    const next2 = document.querySelector('#next2');
    next.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('#intro').className = 'hidden';
        document.querySelector('#input').className = 'showing';
        document.querySelector('#form1').className = 'hidden';
        document.querySelector('#form2').className = 'hidden'; 
        document.querySelector('#form3').className = 'displayForm';   
        document.querySelector('#output').className = 'hidden';

        document.querySelector('#next2').className = 'hidden';
        document.querySelector('#backIntro').className = 'hidden';
        // document.querySelector('#backInput').className = 'displayForm';
        document.querySelector('#submit').className = 'displayForm';
    })

    // MAD LIBS: putting in user inputs
    const submit = document.querySelector('#form');
    submit.addEventListener('submit', function (event) {
        event.preventDefault();
        document.querySelector('#intro').className = 'hidden';
        document.querySelector('#input').className = 'hidden';
        document.querySelector('#output').className = 'showing';
        document.querySelector('#form1').className = 'hidden';
        document.querySelector('#form2').className = 'hidden';

        // grabbing form input
        const name = document.querySelector('#personName').value;
        const time = document.querySelector('#time').value;
        const event2 = document.querySelector('#event').value;
        const eventNoun = document.querySelector('#eventNoun').value;
        const personVerb = document.querySelector('#personVerb').value;
        const personAdj = document.querySelector('#personAdj').value;
        const food = document.querySelector('#food').value;
        const item = document.querySelector('#item').value;
        const eventNounAction = document.querySelector('#eventNounAction').value;

        // sender variable replacements
        const sender1 = document.querySelector('#sender1')
        const sender2 = document.querySelector('#sender2');
        const sender3 = document.querySelector('#sender3');
        const sender4 = document.querySelector('#sender4');
        const sender5 = document.querySelector('#sender5');
        const sender6 = document.querySelector('#sender6');
        const sender7 = document.querySelector('#sender7');
        const sender8 = document.querySelector('#sender8');
        const sender9 = document.querySelector('#sender9');

        // receiver variable replacements
        const receiver1 = document.querySelector('#receiver1')
        const receiver2 = document.querySelector('#receiver2');
        const receiver3 = document.querySelector('#receiver3');
        const receiver4 = document.querySelector('#receiver4');

        sender1.innerHTML = `<u>${name}</u> hiiii`;
        receiver1.innerHTML = `?? it’s <u>${time}</u>, where are you?`
        sender2.innerHTML = `IM at <u>${event2}</u>`
        sender3.innerHTML = `eheheh there’s so many [plural noun] heree`
        
    })


// close IIFE
}())