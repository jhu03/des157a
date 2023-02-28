(function(){

    'use strict';
    console.log('reading js');

    const friends = document.querySelectorAll('#container img');
    const groupGif = document.querySelector('#f img')
    const selection = document.querySelectorAll('#container div');
    const caption = document.querySelectorAll('#container figcaption');
    const descriptions = document.querySelectorAll('.description1 p');
    const modal = document.querySelector('#modal');
    

    // hover animation for each image except for center image
    // function zoom() {
        friends.forEach(function(img){
            img.addEventListener('mouseover', function(event){
                if (img !== groupGif) {
                    img.classList.add('zoom');
                //    highlight(img); 
                }
                
                
            })  
            img.addEventListener('mouseout', function(){
                img.classList.remove('zoom');
            })  
            // highlight(img)
        })
    // }

    
    // function highlight(img){
    caption.forEach(function(caption){

            if (friends.className = 'zoom'){
                caption.className = 'btn';
            } else {
                caption.classList.remove('btn');
            }     
    
    })
    // }   



    

    // overlay appears on click, function for image change and description change is called
    selection.forEach(function(div){
        div.addEventListener('click', function(event){
            event.preventDefault();
            randomFont();
            modal.classList.add('showing');
            modal.classList.remove('hidden');

            next.className = 'delay';

            // image changes depending on the id of the div that is clicked on
            changeImg(div.id);
        })
    })

    
    // opens info overlay
    const intro = document.querySelector('#intro');
    const info = document.querySelector('#i button');

    info.addEventListener('click', function(event){
        event.preventDefault();
        intro.classList.add('showing');
        intro.classList.remove('hidden');

        groupGif.className = 'hidden';
    })

    // exits info overlay
    const meet = document.querySelector('#meet');

    meet.addEventListener('click', function(event){
        event.preventDefault();
        intro.classList.add('hidden');
        intro.classList.remove('remove');
        groupGif.classList.remove('hidden');
    })

    
    // function for changing the image for each person and calling functions for changing person's name and descriptions
    let current = 0;
    function changeImg(person) {
        const theImg = document.querySelector('#mainimg img');

        switch (person) {
            case 'a': 
                modal.classList.add('hidden');
                modal.classList.remove('showing');
                break;
            case 'i': 
                modal.classList.add('hidden');
                modal.classList.remove('showing');
                break;
            case 'joanna': 
                theImg.src = 'images/me.gif';
                theImg.width = '355';
                personAdj(joanna);
                name('Joanna');
                current = 0;
                break;
            case 'char': 
                theImg.src = 'images/char.gif';
                theImg.width = '370';
                personAdj(char);
                name('Charlene');
                current = 1;
                break;
            case 'judy': 
                theImg.src = 'images/judit.gif'; 
                theImg.width = '320';
                personAdj(judy);
                name('Judy');
                current = 2;
                break;
            case 'kazim': 
                theImg.src = 'images/kazim.gif'; 
                theImg.width = '320';
                personAdj(kazim);
                name('Kazim');
                current = 3;
                break;
            case 'f': 
                 modal.classList.add('hidden');
                modal.classList.remove('showing');  
                break;
            case 'g': 
                modal.classList.add('hidden');
                modal.classList.remove('showing');
                break;
            case 'anthony': 
                theImg.src = 'images/ant.gif';
                theImg.width = '325'; 
                personAdj(anthony);
                name('Anthony');
                current = 4;
                break;
            case 'alana': 
                theImg.src = 'images/llama.gif'; 
                theImg.width = '350';
                personAdj(alana);
                name('Alana');
                current = 5;
                break;
            case 'alex': 
                theImg.src = 'images/alex.gif'; 
                theImg.width = '325'; 
                personAdj(alex);
                name('Alex');
                current = 6;
                break;
            case 'thi': 
                theImg.src = 'images/thi.gif'; 
                theImg.width = '255';
                personAdj(thi);
                name('Thi');
                current = 7;
                break;
            }
    }

    // function for back button on click and Esc
    const back = document.querySelector('#back');

    back.addEventListener('click', function(event){
        event.preventDefault();
        modal.classList.add('hidden');
        modal.classList.remove('showing');
        
        // overlay.classList.add('hidden');
        next.classList.remove('delay');
    })

    document.addEventListener('keydown', function(event){
            if (event.key === 'Escape'){
                modal.classList.add('hidden');
                modal.classList.remove('showing');
                
                // event listener for closing info overlay
                intro.classList.add('hidden');
                intro.classList.remove('showing');
                groupGif.classList.remove('hidden');

                next.classList.remove('delay');
            }
    })

    // overlay closes when user clicks outside of overlay window
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.classList.add('hidden');
            modal.classList.remove('showing');
            next.classList.remove('delay');
        }

        // event listener for closing info overlay
        if (event.target == intro) {
            // overlay.classList.add('hidden');
            intro.classList.add('hidden');
            intro.classList.remove('showing');
            groupGif.classList.remove('hidden');
        }
    })

    
   
    // function for changing the descriptions for each person by replacing the inner HTML
    // i is used to call the index in the description array, which each description being one item in the array. the i-counter increases by 1 to move onto the next description after one description is put into the HTML
    // function paramater is called in the switch case above
    function personAdj(person){
        let i =0 ;
        descriptions.forEach(function(p){
            p.innerHTML = person[i];
            i++;
    })
    }

    // function for replacing the name on the overlay screen. Name parameter is called in the switch case above
    function name(name) {
        const person = document.querySelector('span');
        person.innerHTML = name;
    }

    // random font weight and size for person descriptions
    function randomFont() {
        descriptions.forEach(function(p){
        function weight(min,max) {
            min = Math.ceil(min);
            max = Math.floor(max);
    
            // multiply by 100 because the weight are written in 00's
            return Math.floor(Math.random() * (max - min + 1) + min) * 100;
        }

        function size(min,max) {
            // remove the +1 so the raw parameters are taken
            return (Math.random() * (max - min) + min);
        }

        p.style.fontWeight = weight(4,7);
        p.style.fontSize = size(0.8,1.3) + 'em';
    })
    }

    // arrays for descriptions of each person. each description is its own item
    const joanna = [
        'heh nerd', 
        'chill, always wondering "why?"', 
        'Master of the two finger stab', 
        'woman of few words, and smart',
        'attentive creator',
        'Super social master chef',
        'The observant watcher',
        'searching for cereal'
    ];

    const judy = [
        '80% cat, 20% nerd', 
        'hackerman puzzler',
        'stronk coder cat', 
        'Big Brain Biggusus', 
        'master hacker and coder',
        'The tech lead',
        'Hacker cat master chef',
        '"my hobbies are too expensive"'
    ];

    const char = [
        'The artist',
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
        'fake nurse',
        'Mom',
        'voice of concern',
        'data storage capacity unlimited, dying', 
        'diligent doctor'
    ];

    const anthony = [
        'when you least expect it', 
        '“the snack that smiles back”', 
        'Happy to be here',
        'the man, myth, legend himself',
        'marvel-ous planner',
        'Aladdin and his magic carpet',
        'wandering brit with iconic lines',
        'Yessir man gamer'
    ];

    const alana = [
        'llama', 
        'golden retriever energy', 
        'taller than me', 
        'innocent llama, very sweet',
        'curious engineer',
        '“judddyyyyyyy”',
        'Secret drunk serial killer',
        'The encouraging mint'
    ];

    const alex = [
        'poggers gamer', 
        'the original meme™ "wowie"', 
        'smart, likes dragons, amusing',
        'poofed', 
        'cool funny guy, puppy-like',
        'white pants slippery shoes',
        'The player',
        'Big brain gamer man'
    ];

    const kazim = [
        'Kitkat, tall', 
        'mammoth mammoth',
        'Jesus', 
        'old man only eats beige',
        'Abraham Lincoln loves chicken',
        'Stanford', 
        'Sleeping KitKat snowman',
        'The zoomer'
    ];


    // next button function
    const next = document.querySelector('#next');
    const nameList = ['joanna', 'char', 'judy', 'kazim', 'anthony', 'alana', 'alex', 'thi']
    const descriptionList = [joanna, char, judy, kazim, anthony, alana, alex, thi]

    
    next.addEventListener('click', function(){
        current++;
        if (current > (nameList.length-1)) {
            current = 0;
        } 
        name(nameList[current]);
        personAdj(descriptionList[current]);
        changeImg(nameList[current])
        randomFont();

        next.className = 'delay';
        
    })

}());