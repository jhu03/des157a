(function(){

    'use strict';
    console.log('reading js');

    const intro = document.querySelector('#intro');
    const exit = document.querySelector('#confirmation')

    const next = document.querySelector('#next');
    const gameControl = document.getElementById('gamecontrol');
    const score = document.querySelector('#score');
    const blockImg = ['images/base.png', 'images/orange.png','images/yellow.png', 'images/purple.png', 'images/pink.png']
    const actionArea = document.getElementById('actions');

    const gameData = {
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        numBlocks: [0, 0], // keeps track of number of blocks for each player
        index: 0,
        gameEnd: 40
    };
        
    // loads in background sounds when page is opened
    const cityNoise = new Audio('sounds/city.mp3');
    window.addEventListener('load', function(){
        cityNoise.play();
        cityNoise.loop = true;
    })

    // loading page sequence
    const preloader = document.querySelector('#preloader');
    const preloaderImgs = document.querySelectorAll('#preloadBlocks img');
    const lastLoad = document.querySelector('#load6');

    preloaderImgs.forEach((img, i) => {
        setTimeout(() => {
            img.classList.add('showing');
            img.classList.remove('hidden');

            img.classList.add('appear');
        }, i * 1000);
        });
        
    // wait until the animation has completed
    lastLoad.addEventListener('animationend', function () {

        //once the animation is done, remove the preloader div.
        preloader.className = 'hiddenSmooth';
    });

    next.addEventListener('click', function(){
        document.querySelector('#intro .overlay p').innerHTML = `
            <p><strong>Players</strong>: 2</p>
            <p><strong>Goal</strong>: Be the first to built a tower of 40 blocks</p>

            <p><strong>Instructions:</strong><br> Each player builds a random number of floors based on the material they have. If they run out of materials, their turn is passed to the next player. Players are able to build again or pass their turn whenever they wish.</p> 

            <p><strong>Randomly select Player 1 and click Start!</strong></p>
        `;
        next.className = 'hidden';
        startGame.className = 'showing';
    })

    // start game sequence when "Start" is clicked
    const startGame = document.getElementById('startgame');
    startGame.addEventListener('click', function(){
        // randomly set game index here...
        gameData.index = Math.round(Math.random());
        console.log('index:' + gameData.index);

        // game controls appear on screen
        gameControl.className = 'showing';
        gameControl.innerHTML = '<button id="quit"> Quit?</button>';
        gameControl.innerHTML += '<button id="instructions"> How to Play</button>';

        startGame.remove(); // deletes original start button so a new button will show up when instructions is opened

        // hides opening instructions screen
        intro.classList.add('hidden');
        intro.classList.remove('showing');

        // opens quit confirmation page
        document.querySelector('#quit').addEventListener('click', function(){
           dividers()
            exit.classList.add('showing');
            exit.classList.remove('hidden');
        });

        // restarts game when "Quit" is clicked
        document.querySelector('#quitConfirm').addEventListener('click', function(){
            location.reload();
        });

        // game resumes
        document.querySelector('#resume').addEventListener('click', function(){
            exit.classList.add('hidden');
            exit.classList.remove('showing');

            setUpTurn();
        });

        // opens instructions, same overlay div as the opening screen
        document.querySelector('#instructions').addEventListener('click', function(){
            intro.classList.add('showing');
            intro.classList.remove('hidden');
            dividers()
            
            document.querySelector('#resume1').className = 'showing';
            document.querySelector('#source').className = 'showing';

        });

        document.querySelector('#resume1').addEventListener('click', function(){
            intro.classList.add('hidden');
            intro.classList.remove('showing');

            document.querySelector('#resume1').className = 'hidden';
            document.querySelector('#source').className = 'hidden';

        });

        setUpTurn();    
    })

    
    // ----- BASIC PIG GAME JS CODE -----

    function setUpTurn() {
        actionArea.innerHTML = '<button id="roll"> Build tower </button>';
        document.getElementById('roll').addEventListener('click', function(){
            throwDice();
        })
        gameDivider(); // turns on overlay screen for one player
        actions(); // changes game control position
    }
    

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6);
        // gameData.roll2 = Math.floor(Math.random() * 10);

        gameData.rollSum = gameData.roll1;

        // for testing block generation
        console.log("roll 1 " + gameData.roll1);
        console.log("roll 2 " + gameData.roll2);
        console.log("sum " + gameData.rollSum);

        // if die is a 0...
        if (gameData.roll1 === 0){

            showRoll(); // shows what the player rolled
            gameData.index ? (gameData.index = 0) : (gameData.index = 1); // switch player by looking that true/false of statement

            actionArea.innerHTML += `<p><strong>Out of materials!</strong> ${gameData.players[gameData.index]} can build while you find some more</p>`;

            document.querySelector(`#actions strong`).style.color = 'orange';

            setTimeout(setUpTurn, 2500); // 2.5s pause before action area is set for next player
        }

        // if neither die is a 1...
        else {

            gameData.score[gameData.index] += gameData.rollSum;
            showRoll();

            create(); // generates blocks based on rolls
            
            backgroundMove(); // moves the background based on number of blocks rolled

            actionArea.innerHTML = '<button id="rollagain">Build again</button> or <button id="pass">Go on break</button>';

            document.getElementById('rollagain').addEventListener('click', function(event){
                event.preventDefault();
                throwDice();
            })

            document.getElementById('pass').addEventListener('click', function(event){
                event.preventDefault();
                const pass = new Audio ('sounds/scrape.mp3');

                pass.play();
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            })
            
            // check winning condition
            checkWinningCondition();
        }
    }


    function checkWinningCondition() {
        if(gameData.score[gameData.index] > gameData.gameEnd) {

            const scoreCard = document.querySelector('#scoreCard');

            score.classList.add('showing');
            score.classList.remove('hidden');

            scoreCard.innerHTML += `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;
            scoreCard.innerHTML += '<button id="restart">Start a New Game?</button>';

            document.querySelector('#restart').addEventListener('click', function(){
                location.reload();
            });

            actionArea.innerHTML = '';

            const dividerOverlay = document.querySelector(`#gameDivider${gameData.index}`)
            dividerOverlay.classList.remove('overlayBg');
            document.querySelector('#quit').classList.add('hiddenSmooth');

        } else {
            //show current score
            showCurrentWinningScore();
        }
    }

    function showCurrentWinningScore() {
        const score0 = document.querySelector('#score0 p');
        const score1 = document.querySelector('#score1 p');

        console.log("player 1: " + gameData.score[0]);
        console.log("player 2: " + gameData.score[1]);

        score0.innerHTML = `<strong> ${gameData.score[0]}</strong>`;
        score1.innerHTML = `<strong> ${gameData.score[1]}</strong>`;
    }

    function showRoll(){
        const game0Roll = document.querySelector('#game0 .currentRoll');
        const game1Roll = document.querySelector('#game1 .currentRoll');

        if (gameData.index == 0) {
            game0Roll.classList.remove('hidden');
            game0Roll.classList.add('showing');
            
            game0Roll.innerHTML = `<p> +${gameData.rollSum}</p>`


            // for (let i = 0; i < gameData.rollSum; i++) {
                

            //     // if (i === gameData.rollSum) {
            //     //     game0Roll.innerHTML = `<p> +${gameData.rollSum}</p>`;
            //     //     game0Roll.style.fontSize = '2em';
            //     // }
            // }
            
            game0Roll.style.left = `${randomNum(5, 8)}%`;
            game0Roll.style.top = `${randomNum(25, 45)}%`;

            game1Roll.innerHTML = '';
        } else {
            game1Roll.classList.remove('hidden');
            game1Roll.classList.add('showing');

            game1Roll.innerHTML = `<p> +${gameData.rollSum}</p>`;
            game1Roll.style.left = `${randomNum(85, 89)}%`;
            game1Roll.style.top = `${randomNum(25, 45)}%`;

            game0Roll.innerHTML = '';
        }
    }


    // ------ TOWER GAME MODIFICATIONS ------

    //creates the blocks
    function create() {
        // loops block generation for every number in a roll
       for (let i = 0; i < gameData.rollSum; i++) {

           timeout(i); // calling setTimeout function 
       }
   }

   // setting timeout so each block is generated one at a time
   // must be set as a separate function because if the tiemeout is set within the create function, the delay will occur only for the first iteration. setTimeout is a callback function that only runs after a function is finished, so in this case, the delay only happens after the for loop is done
   // more info here: https://www.geeksforgeeks.org/how-to-add-a-delay-in-a-javascript-loop/ and https://medium.com/@axionoso/watch-out-when-using-settimeout-in-for-loop-js-75a047e27a5f
   function timeout(i) {
       setTimeout(blockGen, 750 * i);
   }

   //block generator; generates one block at a time
   function blockGen (){
       const blocks = document.querySelector(`#blocks${gameData.index}`);

       const blockPlace = new Audio('sounds/blockPlace.mp3');
              
       // makes sure the first block placed is the same for both players
       if (gameData.numBlocks[gameData.index] === 0) {

           blocks.innerHTML += `
               <div 
                   id="block${gameData.numBlocks[gameData.index]}" class="blocks appear" 
                   style="bottom: ${gameData.numBlocks[gameData.index] * 95}px;">

                   <img src=${blockImg[0]} width="168" height="88" alt="tower block">
               </div>`;

       } else {

           // random location of block placement + styling bottom placement
           blocks.innerHTML += `
               <div 
                   id="block${gameData.numBlocks[gameData.index]}" class="blocks appear" 
                   style="left: ${randomNum(25, 45)}%; 
                   bottom: ${gameData.numBlocks[gameData.index] * 88}px;">
                   
                   <img src="${blockImg[randomNum(1,blockImg.length-1)]}" width="168" height="88" alt="tower block">
               </div>`;
       }

       blockPlace.play();
       gameData.numBlocks[gameData.index] += 1;

       console.log(`Player ${gameData.index} numBlock ${gameData.numBlocks[gameData.index]}`)

       removeAppear() // "appear" class is removed immediately after block is generated
   }

   
   // removes "appear" class for each block so animation only plays when block is generated
   function removeAppear() {
       const blocksAppeared = document.querySelectorAll('.blocks');

       blocksAppeared.forEach(function(block){
           setTimeout(()=>{ block.classList.remove('appear');}, 500)
       })
   }


    // function for changing action button positions
    function actions() {
        if (gameData.index === 1 ) {
            actionArea.style.gridColumn = "4 / span 1";
        } else {
            actionArea.style.gridColumn = "2 / span 1";
        }
    }

    // removes all divider screens when an overlay is activated for Quit Game or Instructions
    function dividers() {
 
        if (gameData.index == 0) {
            document.getElementById('gameDivider1').classList.remove('showing');
            document.getElementById('gameDivider1').classList.add('hiddenSmooth');
        } else {
             document.getElementById('gameDivider0').classList.remove('showing')
            document.getElementById('gameDivider0').classList.add('hiddenSmooth')
        }
    }

    // switches position of the game divider on player turn
    function gameDivider() {
        const dividerOverlay0 = document.querySelector('#gameDivider0');
        const dividerOverlay1 = document.querySelector('#gameDivider1');

        if (gameData.index == 0) {

            dividerOverlay1.classList.add('showing');
            dividerOverlay1.classList.remove('hiddenSmooth');

            dividerOverlay0.classList.add('hiddenSmooth');
            dividerOverlay0.classList.remove('showing');

        } else {

            dividerOverlay0.classList.add('showing');
            dividerOverlay0.classList.remove('hiddenSmooth');

            dividerOverlay1.classList.add('hiddenSmooth');
            dividerOverlay1.classList.remove('showing');
        }
    }


    // moves image background and block tower depending on tower height
    let position0 = 1;
    let position1 = 1

    function backgroundMove() {
        
        const backgroundImage = document.querySelector(`#game${gameData.index} .bg`);
        
        const recent = gameData.score[gameData.index];
        const blocks = document.querySelector(`#blocks${gameData.index}`);
        let currentY = ((recent - 6) * -88);
        let towerHeight = backgroundImage.getBoundingClientRect();
        console.log(`tower height ${towerHeight.top}`)

        console.log(recent , gameData.rollSum )

        if (gameData.index == 0) {
            if (recent >= 5 && position0 <= 12) {
                blocks.style.bottom = `${currentY}px`
                backgroundImage.style.bottom = `${position0 * -15}%`
                position0++;
            }
        } else if (gameData.index == 1) {
            if (recent >= 5 && position1 <= 12) {
                blocks.style.bottom = `${currentY}px`
                backgroundImage.style.bottom = `${position1 * -15}%`
                position1++;
            }
        }

        // decreases background sound as player moves up away from the city
        if (position0 >= 6 || position1 >= 6) {
            cityNoise.volume = 0.4;
        } else if (position0 >= 9 || position1 >= 9)  {
            cityNoise.volume = 0.05;
        }
    }
    

    // random number generator for tower image and block position
    function randomNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1) + min);
    }


}());