// Game Elements
const homeScreen = document.getElementById('home-screen');
const gameScreen = document.getElementById('game-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startButton = document.getElementById('start-button');
const chaoticButton = document.getElementById('chaotic-button');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const trashTalkElement = document.getElementById('trash-talk');
const finalScoreElement = document.getElementById('final-score');
const roastMessageElement = document.getElementById('roast-message');
const playAgainButton = document.getElementById('play-again-button');

// Game State
let score = 0;
let timeLeft = 30;
let chaosLevel = 0;
let intervalTimer = null;

// Data
const trashTalkMessages = [
    "You missed again?",
    "You call that clicking?",
    "I’ve seen turtles react faster.",
    "Embarrassing…",
    "Skill issue detected.",
    "My grandma could do better.",
    "Are you even trying?",
    "Pathetic effort, buddy."
];

const roastMessages = {
    low: "Your mouse deserves better.",
    medium: "Not bad for a beginner. Kinda.",
    high: "You’ve got some fire in you.",
    expert: "You need therapy… for being cracked."
};

// Functions
function startGame() {
    // Reset game state
    score = 0;
    timeLeft = 30;
    chaosLevel = 0;
    
    // Update UI
    homeScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
    gameOverScreen.style.display = 'none';
    updateScore();
    updateTimer();
    moveButton();
    
    // Start timer
    if (intervalTimer) clearInterval(intervalTimer);
    intervalTimer = setInterval(updateTimer, 1000);
}

function updateScore() {
    scoreElement.textContent = score;
}

function updateTimer() {
    timerElement.textContent = timeLeft;
    timeLeft--;
    chaosLevel += 0.1; // Increase chaos over time
    if (timeLeft < 0) {
        endGame();
    }
}

function moveButton() {
    const buttonWidth = chaoticButton.offsetWidth;
    const buttonHeight = chaoticButton.offsetHeight;
    const maxScale = 1.25;
    const padding = (maxScale * Math.max(buttonWidth, buttonHeight)) / 2;
    
    const minX = padding;
    const maxX = window.innerWidth - padding;
    const minY = padding + 50; // Extra padding for top UI elements
    const maxY = window.innerHeight - padding - 50; // Extra padding for trash-talk
    
    const cx = Math.random() * (maxX - minX) + minX;
    const cy = Math.random() * (maxY - minY) + minY;
    
    const left = cx - buttonWidth / 2;
    const top = cy - buttonHeight / 2;
    const scale = 0.75 + Math.random() * 0.5; // 0.75 to 1.25
    const rotation = (-10 - chaosLevel * 2) + Math.random() * (20 + chaosLevel * 4);
    
    chaoticButton.style.left = `${left}px`;
    chaoticButton.style.top = `${top}px`;
    chaoticButton.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
}

function handleButtonClick() {
    score++;
    updateScore();
    moveButton();
    showTrashTalk();
}

function showTrashTalk() {
    const message = trashTalkMessages[Math.floor(Math.random() * trashTalkMessages.length)];
    trashTalkElement.textContent = message;
    trashTalkElement.classList.remove('show');
    requestAnimationFrame(() => {
        trashTalkElement.classList.add('show');
    });
}

function endGame() {
    clearInterval(intervalTimer);
    gameScreen.style.display = 'none';
    gameOverScreen.style.display = 'flex';
    
    finalScoreElement.textContent = `Final Score: ${score}`;
    let roast;
    if (score <= 10) {
        roast = roastMessages.low;
    } else if (score <= 20) {
        roast = roastMessages.medium;
    } else if (score <= 30) {
        roast = roastMessages.high;
    } else {
        roast = roastMessages.expert;
    }
    roastMessageElement.textContent = roast;
}

// Event Listeners
startButton.addEventListener('click', startGame);
chaoticButton.addEventListener('click', handleButtonClick);
playAgainButton.addEventListener('click', startGame);

// Accessibility: Allow keyboard interaction
chaoticButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleButtonClick();
    }
});