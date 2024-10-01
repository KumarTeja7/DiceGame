'use strict';
let dice = document.querySelector('.dice');
let holdbtn = document.querySelector('.btn--hold');
let rollDiceBtn = document.querySelector('.btn--roll');
const newGameBtn = document.querySelector('.btn--new');

let activePlayer0EL = document.querySelector('.player--0');
let activePlayer1EL = document.querySelector('.player--1');

let activePlayer = 0;
let currentScore = 0;

let playerNormalScore = 0;
let playerHighscore = 0;

let playing = false;

rollDiceBtn.addEventListener('click', RollDice);
holdbtn.addEventListener('click', Hold);
newGameBtn.addEventListener('click', NewGame);
Init();

function Init() {
    playing = playing === false ? true : false;
    dice.classList.add('hidden');
    document.querySelector('.dice').textContent = '0';
    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
};

function NewGame() {
    activePlayer = 0;
    Init();
    playing = true;
    if (document.querySelector(`.player--0`).classList.contains('player--winner')) {
        document.querySelector(`.player--0`).classList.remove('player--winner');
    } if (document.querySelector(`.player--1`).classList.contains('player--winner')) {
        document.querySelector(`.player--1`).classList.remove('player--winner');
    };
    activePlayer0EL.classList.add('player--active');
    activePlayer1EL.classList.remove('player--active');
};

function RollDice() {
    if (playing) {
        dice.classList.remove('hidden');
        let diceNo = Math.trunc(Math.random() * 6) + 1;
        dice.src = `dice-${diceNo}.png`;
        currentScore += diceNo
        if (diceNo !== 1) {
            playerNormalScore = Number(document.getElementById(`current--${activePlayer}`).textContent);
            playerNormalScore += Number(currentScore);
            document.getElementById(`current--${activePlayer}`).textContent = playerNormalScore;
            playerNormalScore = 0;
            currentScore = 0;
            holdbtn.classList.add('disable');
            rollDiceBtn.classList.add('disable');
        } else {
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            currentScore = 0;
            activePlayer = activePlayer === 0 ? 1 : 0;
            switchPlayer();
        }
    }
};

function Hold() {
    if (playing) {
        playerNormalScore = Number(document.getElementById(`current--${activePlayer}`).textContent);
        playerHighscore = Number(document.getElementById(`score--${activePlayer}`).textContent);
        playerHighscore += playerNormalScore;
        if (playerHighscore >= 40) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            playing = false;
        }
        document.getElementById(`score--${activePlayer}`).textContent = playerHighscore;
        document.getElementById(`score--${activePlayer}`).textContent = playerHighscore;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        switchPlayer();
        activePlayer = activePlayer === 0 ? 1 : 0;
        currentScore = 0;
    }


}

function switchPlayer() {
    activePlayer0EL.classList.toggle('player--active');
    activePlayer1EL.classList.toggle('player--active')
}


