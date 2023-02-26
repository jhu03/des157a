(function(){

    'use strict';
    console.log('reading js');

    const friends = document.querySelectorAll('#container img');
    const selection = document.querySelectorAll('#container div');
    const descriptions = document.querySelectorAll('.description1 p');
    const overlay = document.querySelector('#overlay');
    


    // hover animation for each image
    friends.forEach(function(img){
        img.addEventListener('mouseover', function(){
            img.classList.add('zoom');
        })  

        img.addEventListener('mouseout', function(){
            img.classList.remove('zoom');
        })  
    })

    // overlay appears on click, function for image and description change is called
    selection.forEach(function(div){
        div.addEventListener('click', function(){
            overlay.className = 'showing';

            const test = div.id;
            changeImg(test);
        })
    })

    // function for changing the image for each person and calling functions for changing person's name and descriptions
    function changeImg(person) {
        const theImg = document.querySelector('#mainimg img');

        switch (person) {
            case 'b': 
                theImg.src = 'images/me.gif';
                personAdj(joanna);
                name('Joanna');
                break;
            case 'c': 
                theImg.src = 'images/char.gif';
                theImg.width = '370';
                personAdj(char);
                name('Charlene');
                break;
            case 'd': 
                theImg.src = 'images/judit.gif'; 
                theImg.width = '325';
                personAdj(judy);
                name('Judy');
                break;
            case 'e': 
                theImg.src = 'images/kazim.gif'; 
                theImg.width = '325';
                personAdj(kazim);
                name('Kazim');
                break;
            case 'h': 
                theImg.src = 'images/ant.gif';
                theImg.width = '325'; 
                personAdj(anthony);
                name('Anthony');
                break;
            case 'i': 
                theImg.src = 'images/llama.gif'; 
                theImg.width = '360';
                personAdj(alana);
                name('Alana');
                break;
            case 'j': 
                theImg.src = 'images/kazim.gif'; 
                personAdj(alex);
                name('Alex');
                break;
            case 'k': 
                theImg.src = 'images/thismol.gif'; 
                theImg.width = '260';
                personAdj(thi);
                name('Thi');
                break;
            }
    }

    // function for back button on click and Esc
    const back = document.querySelector('#back');

    back.addEventListener('click', function(){
        overlay.className = 'hidden';
    })

    document.addEventListener('keydown', function(event){
        if (event.key == 'Escape'){
            overlay.className = 'hidden';
        }
    })

    // random font weight and size for person descriptions
    descriptions.forEach(function(p){
        function weight(min,max) {
            min = Math.ceil(min);
            max = Math.floor(max);
    
            return Math.floor(Math.random() * (max - min + 1) + min) * 100;
        }

        function size(min,max) {
            return (Math.random() * (max - min + 1) + min);
        }

        p.style.fontWeight = weight(4,7);
        p.style.fontSize = size(0.71,0.72) + 'em';
    })

    // arrays for descriptions of each person
    const joanna = [
        'heh nerd', 
        'chill, always wondering "why?"', 
        'Master of the two finger stab', 
        'woman of few words, and smart',
        'attentive creator',
        'Super social master chef'
    ];

    const judy = [
        'sheesh, whatanerd AND a chef', 
        'hackerman puzzler',
        'stronk coder cat', 
        'Big Brain Biggusus', 
        'master hacker and coder',
        'Hacker cat master chef',
        'my hobbies are too expensive'
    ];

    const char = [
        'talented animator, feather collector', 
        'meme collector + THE artist', 
        'kickable', 
        'Artista and orchestra',
        'memeful artist',
        'dead inside, master artist',
        'Op artist'
    ];

    const thi = [
        'Doggo mom ', 
        'the responsible one', 
        'Big brain nurse doctor',
        'data storage capacity unlimited, logical, dying', 
        'voice of concern',
        'fake nurse',
        'diligent doctor'
    ];

    const anthony = [
        'when you least expect it', 
        '“the snack that smiles back”', 
        'wandering brit with iconic lines',
        'the man, myth, legend himself',
        'marvel-ous planner',
        'Aladdin and his magic carpet',
        'Yessir man gamer'
    ];

    const alana = [
        'llama', 
        'golden retriever energy', 
        'taller than me', 
        'innocent llama, very sweet',
        'curious engineer',
        '“judddyyyyyyy”',
        'Secret drunk serial killer'
    ];

    const alex = [
        'poggers gamer', 
        'the original meme™ "wowie"', 
        'smart, likes dragons, amusing',
        'poofed', 
        'cool funny guy, puppy-like',
        'white pants slippery shoes',
        'Big brain gamer man'
    ];

    const kazim = [
        'Kitkat, tall', 
        'mammoth mammoth',
        'Jesus', 
        'old man only eats beige',
        'Abraham Lincoln loves chicken',
        'Stanford', 
        'Sleeping KitKat snowman'
    ];
   
    // function for changing the descriptions for each person by replacing the inner HTML
    // i is used to call the index in the description array. the if statement is used as an counter to increase the index number
    function personAdj(person){
        let i =0 ;
        descriptions.forEach(function(p){
        if (i == i) {
            p.innerHTML = person[i];
            i++;
        }
    })
    }

    // function for replacing the name on the overlay screen
    function name(name) {
        const person = document.querySelector('span');
        person.innerHTML = name;
        console.log(name);
    }
    
    const next = document.querySelector('#next button');

    next.addEventListener('click', function(){

    })

    //attempt at randomize button
    const list = ['joanna', 'judy', 'char', 'thi', 'anthony', 'alana', 'alex', 'kazim']

    function randomPerson(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const randomize = document.querySelector('#g button');
    randomize.addEventListener('click', function(){
        console.log(list[randomPerson(0,7)]);
    });

}());