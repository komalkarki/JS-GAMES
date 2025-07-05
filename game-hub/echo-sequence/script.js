const buttons = document.querySelectorAll('.game-button');
const startButton = document.getElementById('start-button');
const scoreElement = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

let sequence = [];
let playerSequence = [];
let score = 0;
let isPlaying = false;

function startGame() {
    sequence = [];
    playerSequence = [];
    score = 0;
    updateScore();
    gameOverScreen.style.display = 'none';
    startButton.style.display = 'none';
    addToSequence();
}

function addToSequence() {
    const randomButton = Math.floor(Math.random() * 4);
    sequence.push(randomButton);
    playSequence();
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        const button = buttons[sequence[i]];
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 500);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            isPlaying = true;
        }
    }, 1000);
}

function handleButtonClick(e) {
    if (!isPlaying) return;
    const buttonId = parseInt(e.target.dataset.id);
    playerSequence.push(buttonId);
    checkSequence();
}

function checkSequence() {
    const currentStep = playerSequence.length - 1;
    if (playerSequence[currentStep] !== sequence[currentStep]) {
        endGame();
    } else if (playerSequence.length === sequence.length) {
        score++;
        updateScore();
        playerSequence = [];
        setTimeout(addToSequence, 1000);
    }
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function endGame() {
    isPlaying = false;
    finalScoreElement.textContent = `Final Score: ${score}`;
    gameOverScreen.style.display = 'block';
    startButton.style.display = 'block';
}

buttons.forEach(button => button.addEventListener('click', handleButtonClick));
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);