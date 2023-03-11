(function(){

    'use strict';
    console.log('reading js');

    // The error may be on Line 143, which is in the block generation function.

    const intro = document.querySelector('#intro');
    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const score = document.querySelector('#score');
    const blockImg = ['images/base.png', 'images/orange.png','images/yellow.png', 'images/purple.png', 'images/pink.png']
    const actionArea = document.getElementById('actions');

    const gameData = {
        dice: ['images/1die.jpg', 'images/2die.jpg', 'images/3die.jpg', 'images/4die.jpg', 'images/5die.jpg', 'images/6die.jpg'],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        numBlocks: [0, 0], // keeps track of number of blocks for each player
        index: 0,
        gameEnd: 20
    };


    startGame.addEventListener('click', function(){
        // randomly set game index here...
        gameData.index = Math.round(Math.random());
        console.log('index:' + gameData.index);

        gameControl.className = 'showing';
        gameControl.innerHTML = '<button id="quit"> Wanna Quit?</button>';
        intro.classList.add('hidden');
        intro.classList.remove('showing');

        document.querySelector('#quit').addEventListener('click', function(){
            location.reload();
        });

        setUpTurn();    
    })


    function setUpTurn() {
        actionArea.innerHTML = '<button id="roll"> Roll the Dice </button>';
        document.getElementById('roll').addEventListener('click', function(){
            throwDice();
        })
        gameDivider(); // turns on overlay screen for one player
        actions(); // changes game control position
    }
    

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 4) + 1;
        gameData.roll2 = Math.floor(Math.random() * 4) + 1; 

        gameData.rollSum = gameData.roll1 + gameData.roll2;

        // for testing block generation
        console.log("roll 1 " + gameData.roll1);
        console.log("roll 2 " + gameData.roll2);
        console.log("sum " + gameData.rollSum);

        // if two 1's are rolled...
        if (gameData.rollSum === 2) {
            actionArea.innerHTML += '<p>Oh snap! Snake eyes!</p>';
            gameData.score[gameData.index] = 0;

            // empties blocks from screen and resets nubmer of blocks
            document.querySelector(`#blocks${gameData.index + 1}`).innerHTML = ''; 
            gameData.numBlocks[gameData.index] = 0;

            // switch player by looking that true/false of statement
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);

            // show current score
            setTimeout(setUpTurn, 2000);
            showCurrentWinningScore();  
        } 

        // if either die is a 1...
        else if (gameData.roll1 === 1 || gameData.roll2 === 1){
            // switch player by looking that true/false of statement
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);

            actionArea.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`;

            setTimeout(setUpTurn, 2000);
        }

        // if neither die is a 1...
        else {

            gameData.score[gameData.index] += gameData.rollSum;
            blockGen(); // generates blocks based on rolls
            backgroundMove(); // moves the background based on number of blocks rolled

            actionArea.innerHTML = '<button id="rollagain">Roll Again</button> or <button id="pass">Pass</button>';

            document.getElementById('rollagain').addEventListener('click', function(){
                throwDice();
            })

            document.getElementById('pass').addEventListener('click', function(){
                const pass = new Audio ('sounds/scrape.mp3');

                pass.play();
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            })
            
            // check winning condition
            checkWinningCondition();
        }
    }


    //blocks generator
    function blockGen (){

        const blocks = document.querySelector(`#blocks${gameData.index + 1}`);

        const blockPlace = new Audio('sounds/blockPlace.mp3');
               
        // create blocks; loops for every number in a roll
        for (let i=0; i < gameData.rollSum; i++) {

            // makes sure the first block placed is the same for both players
            if (gameData.numBlocks[gameData.index] === 0) {
                blocks.innerHTML += `<div id="block${gameData.numBlocks[gameData.index]}" class="blocks appear"><img src=${blockImg[0]}></div>`;

            } else {
                blocks.innerHTML += `<div id="block${gameData.numBlocks[gameData.index]}" class="blocks appear"><img src="${blockImg[randomNum(1,blockImg.length-1)]}" width="168" height="88" alt="tower block"></div>`;

                // random location of block placement
                document.getElementById(`block${gameData.numBlocks[gameData.index]}`).style.left = `${randomNum(25, 45)}%`;
            }

            // POSSIBLE ERROR: the style doesn't get applied to every block generated and I'm not sure why. It only happens for Player 2 and often when Player 1 passes their turn to Player 2. 
            document.getElementById(`block${gameData.numBlocks[gameData.index]}`).style.bottom = `${gameData.numBlocks[gameData.index] * 88}px`;

            // checking if the line above runs
            console.log('styled');

            // let blockNum = document.getElementById(`block${gameData.numBlocks[gameData.index]}`);

            // blockNum.addEventListener('animationstart', function(){
            //     blockNum.classList.remove('appear');
            // });

            blockPlace.play();
            gameData.numBlocks[gameData.index] += 1;

            console.log(`Player ${gameData.index + 1} numBlock ${gameData.numBlocks[gameData.index]}`)
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
            dividerOverlay.classList.add('hidden');
            dividerOverlay.classList.remove('showing');
            document.querySelector('#quit').classList.add('hidden');

        } else {
            //show current score
            showCurrentWinningScore();
        }
    }

    function showCurrentWinningScore() {
        const score1 = document.querySelector('#score1 p');
        const score2 = document.querySelector('#score2 p');

        console.log("player 1: " + gameData.score[0]);
        console.log("player 2: " + gameData.score[1]);

        score1.innerHTML = `<strong> ${gameData.score[0]}</strong>`;
        score2.innerHTML = `<strong> ${gameData.score[1]}</strong>`;
    }


    // function for changing action button positions
    function actions() {
        if (gameData.index === 1 ) {
            actionArea.style.gridColumn = "4 / span 1";
        } else {
            actionArea.style.gridColumn = "2 / span 1";
        }
    }


    // function for switching the game divider screen on player turn
    function gameDivider() {
        const dividerOverlay1 = document.querySelector('#gameDivider1');
        const dividerOverlay2 = document.querySelector('#gameDivider2');

        if (gameData.index == 0) {
            dividerOverlay2.classList.add('showing');
            dividerOverlay2.classList.remove('hidden');

            dividerOverlay1.classList.add('hidden');
            dividerOverlay1.classList.remove('showing');
        } else {
            dividerOverlay1.classList.add('showing');
            dividerOverlay1.classList.remove('hidden');

            dividerOverlay2.classList.add('hidden');
            dividerOverlay2.classList.remove('showing');
        }
    }


    // function for moving background and stuff
    let position = 1;

    function backgroundMove() {
        const backgroundImage = document.querySelector(`#game${gameData.index+1}`);
        const blocks = document.querySelector(`#blocks${gameData.index + 1}`);

        // moving the screen and blocks if there are 6 blocks. This only works once when there are 6 blocks
        if (gameData.numBlocks[gameData.index] %6) {
            backgroundImage.style.backgroundPositionY = `${position * 80}%`;
            blocks.style.transform = `translateY(${gameData.numBlocks[gameData.index]%6} * 352px)`;

            position++;
        }
    }


    // random number generator for tower image and block position
    function randomNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}());