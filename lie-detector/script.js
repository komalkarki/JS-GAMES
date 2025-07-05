const factElement = document.getElementById('fact');
const trueButton = document.getElementById('true-button');
const falseButton = document.getElementById('false-button');
const scoreElement = document.getElementById('score');
const roundElement = document.getElementById('round');
const startButton = document.getElementById('start-button');
const gameOverScreen = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const truthRankElement = document.getElementById('truth-rank');
const restartButton = document.getElementById('restart-button');

const facts = [
    { fact: "The Earth is flat.", answer: false },
    { fact: "Water boils at 100°C.", answer: true },
    { fact: "Humans have four lungs.", answer: false },
    { fact: "The capital of France is Paris.", answer: true },
    { fact: "Bananas are berries.", answer: true },
    { fact: "Sharks are mammals.", answer: false },
    { fact: "The sun is a star.", answer: true },
    { fact: "Cats can fly.", answer: false },
    { fact: "Mount Everest is the tallest mountain.", answer: true },
    { fact: "The moon is made of cheese.", answer: false }
];

let score = 0;
let currentRound = 0;
let currentFact;

function startGame() {
    score = 0;
    currentRound = 0;
    updateScore();
    gameOverScreen.style.display = 'none';
    startButton.style.display = 'none';
    nextFact();
}

function nextFact() {
    if (currentRound >= 10) {
        endGame();
        return;
    }
    currentRound++;
    roundElement.textContent = `Round: ${currentRound}/10`;
    currentFact = facts[Math.floor(Math.random() * facts.length)];
    factElement.textContent = currentFact.fact;
}

function checkAnswer(playerAnswer) {
    if (playerAnswer === currentFact.answer) {
        score++;
        updateScore();
    }
    nextFact();
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function endGame() {
    finalScoreElement.textContent = `Final Score: ${score}/10`;
    let rank;
    if (score <= 3) rank = "Blind Gambler";
    else if (score <= 6) rank = "Average Joe";
    else if (score <= 9) rank = "Truth Seeker";
    else rank = "Human Lie Detector";
    truthRankElement.textContent = `Truth Rank: ${rank}`;
    gameOverScreen.style.display = 'block';
    startButton.style.display = 'block';
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
trueButton.addEventListener('click', () => checkAnswer(true));
falseButton.addEventListener('click', () => checkAnswer(false));