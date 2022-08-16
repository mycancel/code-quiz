const startScreen = document.querySelector("#beginning");
const quizScreen = document.querySelector("#quiz");
const endScreen = document.querySelector("#ending");
const scoreScreen = document.querySelector("#scoreboard");
const startBtn = document.querySelector("#start");
const scoreBtn = document.querySelector("#to-scoreboard");

const timerEl = document.querySelector("#timer");
const initials = document.querySelector("#initials");

const title = document.querySelector("#question-title");
const answerA = document.querySelector("#answerA");
const answerB = document.querySelector("#answerB");
const answerC = document.querySelector("#answerC");
const answerD = document.querySelector("#answerD");
const reward = document.querySelector("#reward");

const questionList = [
    "Who?",
    "What?",
    "When?",
    "Where?",
    "Why?",
    "So What?"
];
const option1 = [
    "Who? A",
    "What? A",
    "When? A",
    "Where?",
    "Why?",
    "So What?"
];
const option2 = [
    "Who? B",
    "What? B",
    "When? B",
    "Where?",
    "Why?",
    "So What?"
];
const option3 = [
    "Who? C",
    "What? C",
    "When? C",
    "Where?",
    "Why?",
    "So What?"
];
const option4 = [
    "Who? D",
    "What? D",
    "When? D",
    "Where?",
    "Why?",
    "So What?"
];

const position = 0;

// Local memory of all highscores
const pastScores = JSON.parse(localStorage.getItem("highscores")) || [];

// Instructor Provided Code (functions displayState and init): Anthony Cooper
let state = "start";

function displayState() {
    if (state === "start") {
        startScreen.style.display = "block";
        quizScreen.style.display = "none";
        endScreen.style.display = "none";
        scoreScreen.style.display = "none";
    }
    if (state === "quiz") {
        startScreen.style.display = "none";
        quizScreen.style.display = "block";
        endScreen.style.display = "none";
        scoreScreen.style.display = "none";
        showQuiz();
    }
    if (state === "end") {
        startScreen.style.display = "none";
        quizScreen.style.display = "none";
        endScreen.style.display = "block";
        scoreScreen.style.display = "none";
    }
    if (state === "score") {
        startScreen.style.display = "none";
        quizScreen.style.display = "none";
        endScreen.style.display = "none";
        scoreScreen.style.display = "block";
        showScore();
    }
};

function init() {
    displayState();
};

let timeLeft = 60;

function showTime() {
    const timeInterval = setInterval(function () {
        timerEl.textContent = timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            timeLeft = 0;
        };

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            state = "end";
            displayState();
        };

        if (position === questionList.length){
            clearInterval(timeInterval);
            state = "end";
            displayState();
        };
    }, 1000)
};

function showQuiz() {
    title.textContent = "";
    answerA.textContent = "";
    answerB.textContent = "";
    answerC.textContent = "";
    answerD.textContent = "";

    const key = ["", answerA, answerC, answerD, answerB, answerA, answerD];

    if (position >= 1 && (key[position]).dataset.clicked === "true") {
        reward.textContent = "Correct";
    } else if (position >= 1) {
        reward.textContent = "Incorrect";
        timeLeft = timeLeft - 10;
    };

    answerA.dataset.clicked = "false";
    answerB.dataset.clicked = "false";
    answerC.dataset.clicked = "false";
    answerD.dataset.clicked = "false";

    title.textContent = questionList[position];
    answerA.textContent = option1[position];
    answerB.textContent = option2[position];
    answerC.textContent = option3[position];
    answerD.textContent = option4[position];
};

function showScore() {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.sort()
};

startBtn.addEventListener("click", function (event) {
    event.preventDefault();
    showTime();
    state = "quiz";
    displayState();
});

answerA.addEventListener('click', function (event) {
    const element = event.target;
    if (element.matches("li")) {
        position++;
        reward.textContent = "";
        if (position < questionList.length) {
            answerA.dataset.clicked = "true";
            showQuiz();
        };
    }
});

answerB.addEventListener('click', function (event) {
    const element = event.target;
    if (element.matches("li")) {
        position++;
        reward.textContent = "";
        if (position < questionList.length) {
            answerB.dataset.clicked = "true";
            showQuiz();
        };
    }
});

answerC.addEventListener('click', function (event) {
    const element = event.target;
    if (element.matches("li")) {
        position++;
        reward.textContent = "";
        if (position < questionList.length) {
            answerC.dataset.clicked = "true";
            showQuiz();
        }; 
    }
});

answerD.addEventListener('click', function (event) {
    const element = event.target;
    if (element.matches("li")) {
        position++;
        reward.textContent = "";
        if (position < questionList.length) {
            answerD.dataset.clicked = "true";
            showQuiz();
        };
    }
});

scoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const userScore = timeLeft + " — " + initials.value.trim();
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push(userScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    state = "score";
    displayState();
});

init();