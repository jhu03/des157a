(function(){

    'use strict';
    console.log('reading js');

    const intro = document.querySelector('#intro');
    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const score = document.querySelector('#score');
    const blockImg = ['images/base.png', 'images/orange.png','images/yellow.png', 'images/purple.png', 'images/pink.png']

    const dividerOverlay1 = document.querySelector('#gameDivider1')
    const dividerOverlay2 = document.querySelector('#gameDivider2')

    const actionArea = document.getElementById('actions');

    const gameData = {
        dice: ['images/1die.jpg', 'images/2die.jpg', 'images/3die.jpg', 'images/4die.jpg', 'images/5die.jpg', 'images/6die.jpg'],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        numBlocks: [0, 0],
        index: 0,
        gameEnd: 20
    };

    startGame.addEventListener('click', function(){
        // randomly set game index here...
        gameData.index = Math.round(Math.random());
        console.log('index:' + gameData.index);

        // gameControl.innerHTML = '<h2>The Game Has Started</h2>';
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
        gameDivider();
        actions();
    }
    
    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 5) + 1; // using ceil could result in a zero
        gameData.roll2 = Math.floor(Math.random() * 5) + 1; 


        gameData.rollSum = gameData.roll1 + gameData.roll2;
        console.log("roll 1 " + gameData.roll1);
        console.log("roll 2 " + gameData.roll2);
        console.log("sum " + gameData.rollSum);

        // if two 1's are rolled...
        if (gameData.rollSum === 2) {

            actionArea.innerHTML += '<p>Oh snap! Snake eyes!</p>';
            gameData.score[gameData.index] = 0;

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
            blockGen();


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


        // (function myLoop(i) {
        //     setTimeout(function() {

        //         blocks.innerHTML += `<div id="block${gameData.numBlocks[gameData.index]}" class="blocks appear"></div>`;

        //         document.getElementById(`block${gameData.numBlocks[gameData.index]}`).style.bottom = `${gameData.numBlocks[gameData.index] * 25}px`;
        //         console.log('styled');
    
        //         // let blockNum = document.getElementById(`block${gameData.numBlocks[gameData.index]}`);
    
        //         // blockNum.addEventListener('animationstart', function(){
        //         //     blockNum.classList.remove('appear');
        //         // });
    
                    
    
        //         // document.getElementById(`block${numBlocks1}`).style.opacity = color(1,10);
    
    
        //         blockPlace.play();
        //         gameData.numBlocks[gameData.index] += 1;
    
        //         console.log(`Player ${gameData.index + 1} numBlock ${gameData.numBlocks[gameData.index]}`)              
        //       if (--i) myLoop(i);   
        //     }, 3000)
        //   })(gameData.rollSum);                   

        for (let i=0; i < gameData.rollSum; i++) {

            if (gameData.numBlocks[gameData.index] === 0) {
                blocks.innerHTML += `<div id="block${gameData.numBlocks[gameData.index]}" class="blocks appear"><img src=${blockImg[0]}></div>`;

            } else {
                blocks.innerHTML += `<div id="block${gameData.numBlocks[gameData.index]}" class="blocks appear"><img src=${blockImg[randomNum(1,blockImg.length-1)]}></div>`;

                document.getElementById(`block${gameData.numBlocks[gameData.index]}`).style.left = `${randomNum(45, 55)}%`;
            }

            document.getElementById(`block${gameData.numBlocks[gameData.index]}`).style.bottom = `${gameData.numBlocks[gameData.index] * 50}px`;

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

            actionArea.innerHTML = '';
            dividerOverlay.classList.add('hidden');
            dividerOverlay.classList.remove('showing');
            document.querySelector('#quit').classList.add('hidden');
            document.querySelector('#restart').addEventListener('click', function(){
                location.reload();
            });
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


    function actions() {
        if (gameData.index === 1 ) {
            actionArea.style.gridColumn = "4 / span 1";
        } else {
            actionArea.style.gridColumn = "2 / span 1";
        }
    }

    function gameDivider() {

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

    function randomNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}());