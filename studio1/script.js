// open IIFE
(function() {

    'use strict';
    console.log('reading js');

    // grabbing form input
    // function inputGrab () {
    //     let name = document.querySelector('#personName').value;
    //     let time = document.querySelector('#time').value;
    //     let event2 = document.querySelector('#event').value;
    //     let eventNoun = document.querySelector('#eventNoun').value;
    //     let personVerb = document.querySelector('#personVerb').value;
    //     let personAdj = document.querySelector('#personAdj').value;
    //     let food = document.querySelector('#food').value;
    //     let item = document.querySelector('#item').value;
    //     let person2 = document.querySelector('#person2').value;
    //     let person2Verb = document.querySelector('#person2Verb').value;
    //     let person2Noun = document.querySelector('#person2Noun').value;

    //     return name, time, event2;
    // };

    const start = document.querySelector('#start');
    start.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('#intro').className = 'hidden';
        document.querySelector('#input').className = 'showing';
        document.querySelector('#form1').className = 'fadeFast';
        
        document.body.style.backgroundColor = 'white';
    })

    const back1 = document.querySelector('#backIntro');
    back1.addEventListener('click', function () {

        document.querySelector('#intro').className = 'showing';
        document.querySelector('#input').className = 'hidden';
        document.querySelector('#form1').className = 'hidden';

        document.body.style.backgroundColor = '#333';
    })


    const next = document.querySelector('#next');
    next.addEventListener('click', function (event) {
        event.preventDefault();
        const name = document.querySelector('#personName').value;
        const time = document.querySelector('#time').value;
        const event2 = document.querySelector('#event').value;
        const eventNoun = document.querySelector('#eventNoun').value;

        // alerts for empty inputs
        if (name == '') {
            alert("Please provide a name")
            document.querySelector('#personName').focus();

            // testing individual alerts that show up in the html
            // popup = 'Please provide a noun';
            // const whee = document.querySelector('#whee')
            // whee.innerHTML = `${popup}`;
            // document.querySelector('#personName').focus();

        } else if (time =='') {
            alert("Please provide a time")
            document.querySelector('#time').focus();
        } else if (event2 =='') {
            alert("Please provide an event")
            document.querySelector('#event').focus();
        } else if (eventNoun == ''){
            alert("Please provide a noun")
            document.querySelector('#eventNoun').focus();
        } else {
            document.querySelector('#form1').className = 'hidden';
            document.querySelector('#form2').className = 'fadeFast'; 
    
            document.querySelector('#next').className = 'hidden';
            document.querySelector('#backIntro').className = 'hidden';
            document.querySelector('#backInput').className = 'displayForm';
            document.querySelector('#next2').className = 'displayForm';
        }
        
    })

    const back2 = document.querySelector('#backInput');
    back2.addEventListener('click', function () {
        // document.querySelector('#intro').className = 'hidden';
        // document.querySelector('#input').className = 'showing';
        document.querySelector('#form1').className = 'displayForm';
        document.querySelector('#output').className = 'hidden';
        document.querySelector('#form2').className = 'hidden';
        

        document.querySelector('#next').className = 'displayForm';
        document.querySelector('#backIntro').className = 'displayForm';
        document.querySelector('#backInput').className = 'hidden';
        document.querySelector('#next2').className = 'hidden';

    })

    const next2 = document.querySelector('#next2');
    next2.addEventListener('click', function (event) {
        event.preventDefault();

        const personVerb = document.querySelector('#personVerb').value;
        const personAdj = document.querySelector('#personAdj').value;
        const food = document.querySelector('#food').value;
        const item = document.querySelector('#item').value;

        // alerts for empty inputs
        if (personVerb == '') {
            alert("Please provide a verb")
            document.querySelector('#personVerb').focus();
        } else if (personAdj =='') {
            alert("Please provide an adjective")
            document.querySelector('#personAdj').focus();
        } else if (food =='') {
            alert("Please provide a food item")
            document.querySelector('#food').focus();
        } else if (item == ''){
            alert("Please provide a object")
            document.querySelector('#item').focus();
        } else {
        document.querySelector('#form2').className = 'hidden'; 
        document.querySelector('#form3').className = 'fadeFast';   

        console.log("test");
        document.querySelector('#next2').className = 'hidden';
        document.querySelector('#backInput').className = 'hidden';
        document.querySelector('#backSubmit').className = 'displayForm';
        document.querySelector('#submit').className = 'displayForm';
        }
    })

    const back3 = document.querySelector('#backSubmit');
    back3.addEventListener('click', function () {
        document.querySelector('#form3').className = 'hidden';
        document.querySelector('#form2').className = 'displayForm';
        

        document.querySelector('#next2').className = 'displayForm';
        document.querySelector('#backInput').className = 'displayForm';
        document.querySelector('#submit').className = 'hidden';
        document.querySelector('#backSubmit').className = 'hidden';
    })


    const restart = document.querySelector('#restart');
    restart.addEventListener('click', function(event){
        event.preventDefault();

        document.querySelector('#intro').className = 'showing';
        document.querySelector('#input').className = 'hidden';
        document.querySelector('#output').className = 'hidden';

        document.body.style.backgroundColor = '#333';
    })


    // MAD LIBS: putting in user inputs
    const submit = document.querySelector('#form');
    submit.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.querySelector('#personName').value;
        const time = document.querySelector('#time').value;
        const event2 = document.querySelector('#event').value;
        const eventNoun = document.querySelector('#eventNoun').value;
        const personVerb = document.querySelector('#personVerb').value;
        const personAdj = document.querySelector('#personAdj').value;
        const food = document.querySelector('#food').value;
        const item = document.querySelector('#item').value;
        const person2 = document.querySelector('#person2').value;
        const person2Verb = document.querySelector('#person2Verb').value;
        const person2Noun = document.querySelector('#person2Noun').value;

        // alerts for empty inputs
        if (person2 == '') {
            alert("Please provide another name")
            document.querySelector('#person2').focus();
        } else if (person2Verb =='') {
            alert("Please provide a verb")
            document.querySelector('#person2Verb').focus();
        } else if (person2Noun =='') {
            alert("Please provide another noun")
            document.querySelector('#person2Noun').focus();
        } else {
            document.querySelector('#input').className = 'hidden';
            document.querySelector('#output').className = 'showing';
            document.querySelector('#form3').className = 'hidden';
        }

        // sender variable replacements
        const sender1 = document.querySelector('#sender1')
        const sender2 = document.querySelector('#sender2');
        const sender3 = document.querySelector('#sender3');
        const sender4 = document.querySelector('#sender4');
        const sender5 = document.querySelector('#sender5');
        const sender6 = document.querySelector('#sender6');
        const sender7 = document.querySelector('#sender7');
        const contact = document.querySelector('#contact');
       
        // receiver variable replacements
        const receiver1 = document.querySelector('#receiver1')
        const receiver2 = document.querySelector('#receiver2');
        const receiver3 = document.querySelector('#receiver3');
        const receiver4 = document.querySelector('#receiver4');

        // subtituting user inputs into HTML
        contact.innerHTML = `${name}`
        sender1.innerHTML = `<u>${name}</u> hiiii`;
        receiver1.innerHTML = `?? it’s <u>${time}</u>, where are you?`
        sender2.innerHTML = `IM at <u>${event2}</u>`
        sender3.innerHTML = `Eheheh there’s so many <u>${eventNoun}</u> heree`;
        receiver2.innerHTML = `<u>${eventNoun}</u>? at <u>${event2}</u>??`;
        sender4.innerHTML = `Have I ever tellu how much I <u>${personVerb}</u> yu? yure so <u>${personAdj}</u>`
        sender5.innerHTML = `I want <u>${food}</u>`;
        receiver3.innerHTML = `go get some <u>${food}</u>`;
        sender6.innerHTML = `Canniii i give u a <u>${item}</u>`;
        receiver4.innerHTML = `Where did you get a <u>${item}</u> from`;
        sender7.innerHTML = `i tolD <u>${person2}</u> abtou the tiem you <u>${person2Verb}</u> a <u>${person2Noun}</u>`;


        // animations
        // researt button glow
        const text = document.querySelector('#outputText1');
        const text2 = document.querySelector('#outputText2');
        const phone = document.querySelector('#phone');

        text.classList.add('fade');
        text.addEventListener('animationend', function(){
            text2.className = 'fade';
        })

        text2.addEventListener('animationend',function(){
            phone.className = 'moveUp';
        })

        phone.addEventListener('animationend', function(){
            restart.className = 'fadeLong';
            
            restart.addEventListener('animationend',function(){
                restart.className = 'glow';
            })
            restart.addEventListener('mouseover', function(){
                restart.textContent = "Heck yea, let's go";
                restart.classList.remove('glow');
            })
            restart.addEventListener('mouseout', function(){
                restart.textContent = 'Another round?';
                restart.classList.add('glow');
            })
        })
        
    })


    

// close IIFE
}())