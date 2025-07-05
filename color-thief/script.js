const targetColorDiv = document.getElementById('target-color');
const guessArea = document.getElementById('guess-area');
const guessColorDiv = document.getElementById('guess-color');
const redSlider = document.getElementById('red');
const greenSlider = document.getElementById('green');
const blueSlider = document.getElementById('blue');
const submitGuessButton = document.getElementById('submit-guess');
const startButton = document.getElementById('start-button');
const gameOverScreen = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');
const roundElement = document.getElementById('round');

let targetColor;
let currentRound = 0;
let totalScore = 0;
const totalRounds = 5;

function startGame() {
    currentRound = 0;
    totalScore = 0;
    gameOverScreen.style.display = 'none';
    startButton.style.display = 'none';
    nextRound();
}

function nextRound() {
    if (currentRound >= totalRounds) {
        endGame();
        return;
    }
    currentRound++;
    roundElement.textContent = `Round: ${currentRound}/${totalRounds}`;
    targetColor = generateRandomColor();
    targetColorDiv.style.backgroundColor = `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`;
    guessArea.style.display = 'none';
    setTimeout(() => {
        targetColorDiv.style.backgroundColor = 'transparent';
        guessArea.style.display = 'block';
    }, 3000);
}

function generateRandomColor() {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
}

function updateGuessColor() {
    const r = redSlider.value;
    const g = greenSlider.value;
    const b = blueSlider.value;
    guessColorDiv.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function calculateScore() {
    const r = redSlider.value;
    const g = greenSlider.value;
    const b = blueSlider.value;
    const distance = Math.sqrt(
        Math.pow(targetColor.r - r, 2) +
        Math.pow(targetColor.g - g, 2) +
        Math.pow(targetColor.b - b, 2)
    );
    const maxDistance = Math.sqrt(3 * Math.pow(255, 2));
    const score = Math.max(0, 100 - (distance / maxDistance) * 100);
    totalScore += score;
    alert(`Round ${currentRound} Score: ${score.toFixed(2)}`);
    nextRound();
}

function endGame() {
    const averageScore = totalScore / totalRounds;
    finalScoreElement.textContent = `Average Score: ${averageScore.toFixed(2)}`;
    gameOverScreen.style.display = 'block';
    startButton.style.display = 'block';
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
submitGuessButton.addEventListener('click', calculateScore);
redSlider.addEventListener('input', updateGuessColor);
greenSlider.addEventListener('input', updateGuessColor);
blueSlider.addEventListener('input', updateGuessColor);