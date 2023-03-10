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
        // gameData.index = Math.round(Math.random());
        gameData.index = 0;
        console.log('index:' + gameData.index);

        gameControl.className = 'showing';
        gameControl.innerHTML = '<button id="quit"> Wanna Quit?</button>';
        gameControl.innerHTML += '<button id="instructions"> How to Play</button>';
        intro.classList.add('hidden');
        intro.classList.remove('showing');

        document.querySelector('#quit').addEventListener('click', function(){
            location.reload();
        });

        document.querySelector('#instructions').addEventListener('click', function(){
            intro.classList.add('showing');
            intro.classList.remove('hidden');

            if (gameData.index == 0) {
                document.getElementById('gameDivider1}').classList.remove('showing');
                document.getElementById('gameDivider1}').classList.add('hiddenSmooth');
            } else {
                 document.getElementById('gameDivider2}').classList.remove('showing');
                document.getElementById('gameDivider2}').classList.add('hiddenSmooth');
            }

            // document.getElementById('startgame').classList.remove('showing');
            
           
        });

        setUpTurn();    
    })


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
        gameData.roll2 = 0 

        // gameData.roll2 = Math.floor(Math.random() * 3) + 2; 

        gameData.rollSum = gameData.roll1 + gameData.roll2;

        // for testing block generation
        console.log("roll 1 " + gameData.roll1);
        console.log("roll 2 " + gameData.roll2);
        console.log("sum " + gameData.rollSum);

        // if two 1's are rolled...
        // if (gameData.rollSum === 2) {
        //     actionArea.innerHTML += '<p>Oh snap! Snake eyes!</p>';
        //     gameData.score[gameData.index] = 0;

        //     // empties blocks from screen and resets nubmer of blocks
        //     document.querySelector(`#blocks${gameData.index + 1}`).innerHTML = ''; 
        //     gameData.numBlocks[gameData.index] = 0;

        //     // switch player by looking that true/false of statement
        //     gameData.index ? (gameData.index = 0) : (gameData.index = 1);

        //     // show current score
        //     setTimeout(setUpTurn, 2000);
        //     showCurrentWinningScore();  
        // } 

        // if either die is a 0...
        if (gameData.roll1 === 0){
            // switch player by looking that true/false of statement

            showRoll();
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);

            actionArea.innerHTML += `<p>Sorry, one of your rolls was a zero, switching to ${gameData.players[gameData.index]}</p>`;

            

            setTimeout(setUpTurn, 2000);
        }

        // if neither die is a 1...
        else {

            gameData.score[gameData.index] += gameData.rollSum;
            showRoll();

            create(); // generates blocks based on rolls
            
            backgroundMove(); // moves the background based on number of blocks rolled
            removeAppear();
            

            actionArea.innerHTML = '<button id="rollagain">Build again</button> or <button id="pass">Go on break</button>';

            document.getElementById('rollagain').addEventListener('click', function(){
                throwDice();
            })

            document.getElementById('pass').addEventListener('click', function(){
                const pass = new Audio ('sounds/scrape.mp3');

                pass.play();
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                // gameData.rollSum = 0;
                setUpTurn();
            })
            
            // check winning condition
            checkWinningCondition();
        }
    }


    //creates the blocks
    function create() {
         // create blocks; loops for every number in a roll
		for (let i = 0; i < gameData.rollSum; i++) {
            // if (i !== 0) {
            //     setTimeout(() => {
			// 	blockGen();
			//     }, 1000);  
            // } else {
                blockGen();

            // }
            // pauses after each block creation
		}
	}


    //blocks generator
    function blockGen (){

        const blocks = document.querySelector(`#blocks${gameData.index + 1}`);

        const blockPlace = new Audio('sounds/blockPlace.mp3');
               
        // makes sure the first block placed is the same for both players
        if (gameData.numBlocks[gameData.index] === 0) {

            blocks.innerHTML += `
                <div 
                    id="block${gameData.numBlocks[gameData.index]}" class="blocks appear" 
                    style="bottom: ${gameData.numBlocks[gameData.index] * 95}px;">

                    <img src=${blockImg[0]}>
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

        // console.log("placed " + gameData.numBlocks[gameData.index] + " blocks for player " + gameData.index);


        console.log( document.getElementById(`block${gameData.numBlocks[gameData.index]}`));


        // checking if the line above runs
        console.log('styled');

        blockPlace.play();
        gameData.numBlocks[gameData.index] += 1;

        console.log(`Player ${gameData.index + 1} numBlock ${gameData.numBlocks[gameData.index]}`)
        
    }

    function removeAppear() {
        const blocksAppeared = document.querySelectorAll('.blocks');

        blocksAppeared.forEach(function(block){
      
            setTimeout(()=>{ block.classList.remove('appear');}, 1500)
           
        })
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
        const score1 = document.querySelector('#score1 p');
        const score2 = document.querySelector('#score2 p');

        console.log("player 1: " + gameData.score[0]);
        console.log("player 2: " + gameData.score[1]);

        score1.innerHTML = `<strong> ${gameData.score[0]}</strong>`;
        score2.innerHTML = `<strong> ${gameData.score[1]}</strong>`;
    }

    function showRoll(){
        const game1Roll = document.querySelector('#game1 .currentRoll');
        const game2Roll = document.querySelector('#game2 .currentRoll');

        if (gameData.index == 0) {
            game1Roll.classList.remove('hidden');
            game1Roll.classList.add('showing');

            game1Roll.innerHTML = `<p> + ${gameData.rollSum}</p>`;
            game1Roll.style.left = `${randomNum(5, 8)}%`;
            game1Roll.style.top = `${randomNum(25, 45)}%`;

            game2Roll.innerHTML = '';
        } else {
            game2Roll.classList.remove('hidden');
            game2Roll.classList.add('showing');

            game2Roll.innerHTML = `<p> + ${gameData.rollSum}</p>`;
            game2Roll.style.left = `${randomNum(85, 90)}%`;
            game2Roll.style.top = `${randomNum(25, 45)}%`;

            game1Roll.innerHTML = '';
        }
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
            dividerOverlay2.classList.remove('hiddenSmooth');

            dividerOverlay1.classList.add('hiddenSmooth');
            dividerOverlay1.classList.remove('showing');

        } else {

            dividerOverlay1.classList.add('showing');
            dividerOverlay1.classList.remove('hiddenSmooth');

            dividerOverlay2.classList.add('hiddenSmooth');
            dividerOverlay2.classList.remove('showing');
        }
    }


    // function for moving background and stuff
    let position = 1;
    let  currentY = -1400
    const num = gameData.numBlocks[gameData.index];

    function backgroundMove() {
        
        const backgroundImage = document.querySelector(`#game${gameData.index+1}`);
        const blocks = document.querySelector(`#blocks${gameData.index + 1}`);
        const reduceHeight = -44 * `${gameData.numBlocks[gameData.index]}`;
        const recent = gameData.score[gameData.index];

        console.log(recent , gameData.rollSum )

        if (recent > 5) {
            // prevPosition *=
            
            currentY = (Math.max(5,(recent - gameData.rollSum))*88)+currentY
            blocks.style.bottom = `${reduceHeight}px`;


          backgroundImage.style.backgroundPositionY = `${currentY}px`
 console.log("CURRENT Y=", currentY)
            console.log(`${(gameData.rollSum*88) }px` )

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