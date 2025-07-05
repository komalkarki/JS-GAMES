const wordDisplay = document.getElementById('word-display');
const wordInput = document.getElementById('word-input');
const timerBar = document.getElementById('timer-bar');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const startButton = document.getElementById('start-button');
const gameOverScreen = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew'];
let score = 0;
let lives = 3;
let timeLeft = 5;
let timerInterval;
let currentWord;

function startGame() {
    score = 0;
    lives = 3;
    updateScore();
    updateLives();
    gameOverScreen.style.display = 'none';
    startButton.style.display = 'none';
    nextWord();
}

function nextWord() {
    if (lives <= 0) {
        endGame();
        return;
    }
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordDisplay.textContent = currentWord;
    wordInput.value = '';
    timeLeft = 5;
    timerBar.style.width = '300px';
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 100);
}

function updateTimer() {
    timeLeft -= 0.1;
    timerBar.style.width = `${(timeLeft / 5) * 300}px`;
    if (timeLeft <= 0) {
        lives--;
        updateLives();
        nextWord();
    }
}

function checkWord() {
    if (wordInput.value.toLowerCase() === currentWord) {
        score++;
        updateScore();
        nextWord();
    }
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function updateLives() {
    livesElement.textContent = `Lives: ${lives}`;
}

function endGame() {
    clearInterval(timerInterval);
    finalScoreElement.textContent = `Final Score: ${score}`;
    gameOverScreen.style.display = 'block';
    startButton.style.display = 'block';
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
wordInput.addEventListener('input', checkWord);