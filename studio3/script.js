(function(){

    'use strict';
    console.log('reading js');

    const intro = document.querySelector('#intro');
    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game1 = document.getElementById('game1');
    const score = document.querySelector('#score');

    const actionArea = document.getElementById('actions');

    const gameData = {
        dice: ['images/1die.jpg', 'images/2die.jpg', 'images/3die.jpg', 'images/4die.jpg', 'images/5die.jpg', 'images/6die.jpg'],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 20
    };

    let numBlocks1 = 0;
    let numBlocks2 = 0

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

            if (gameData.index === 1 ) {
                numBlocks2 = 0;
            } else {
                numBlocks1 = 0;
            }

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
            blockGen();
            // check winning condition
            checkWinningCondition();
        }
    }

    function checkWinningCondition() {
        console.log("winning condition");
        if(gameData.score[gameData.index] > gameData.gameEnd) {

            const scoreCard = document.querySelector('#scoreCard');

            score.classList.add('showing');
            score.classList.remove('hidden');
            scoreCard.innerHTML += `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;
            scoreCard.innerHTML += '<button id="restart">Start a New Game?</button>';

            actionArea.innerHTML = '';
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

    //blocks generator

    function blockGen (){

        const blocks = document.querySelector(`#blocks${gameData.index + 1}`);

        const blockPlace = new Audio ('sounds/blockPlace.mp3');

        for (let i=1; i <= gameData.rollSum; i++) {
            
            if (gameData.index + 1 == 1) {
                blocks.innerHTML += `<div id="block${numBlocks1}" class="blocks"></div>`;

                document.getElementById(`block${numBlocks1}`).style.bottom = `${numBlocks1 * 25}px`;
                blockPlace.play();
                numBlocks1 += 1;
            } else {
                blocks.innerHTML += `<div id="block${numBlocks2}" class="blocks"></div>`;

                document.getElementById(`block${numBlocks2}`).style.bottom = `${numBlocks2 * 25}px`;

                blockPlace.play();
                numBlocks2 += 1;
            }
            console.log(`numblocks1 + block${numBlocks1}`)
            console.log(`numblocks2 + block${numBlocks2}`)
        }
    }

    function actions() {
        if (gameData.index === 1 ) {
            actionArea.style.gridColumn = "4 / span 1";
        } else {
            actionArea.style.gridColumn = "2 / span 1";
        }
    }

}());