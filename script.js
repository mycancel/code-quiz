var startScreen = document.querySelector("#beginning");
var quizScreen = document.querySelector("#quiz");
var endScreen = document.querySelector("#ending");
var scoreScreen = document.querySelector("#scoreboard");
var startBtn = document.querySelector("#start");
var scoreBtn = document.querySelector("#to-scoreboard");

var timerEl = document.querySelector("#timer");
var initials = document.querySelector("#initials");

var title = document.querySelector("#question-title");
var answerA = document.querySelector("#answerA");
var answerB = document.querySelector("#answerB");
var answerC = document.querySelector("#answerC");
var answerD = document.querySelector("#answerD");
var reward = document.querySelector("#reward");

var questionList = [
    "Who?",
    "What?",
    "When?",
    "Where?",
    "Why?",
    "So What?"
];
var option1 = [
    "Who? A",
    "What? A",
    "When? A",
    "Where?",
    "Why?",
    "So What?"
];
var option2 = [
    "Who? B",
    "What? B",
    "When? B",
    "Where?",
    "Why?",
    "So What?"
];
var option3 = [
    "Who? C",
    "What? C",
    "When? C",
    "Where?",
    "Why?",
    "So What?"
];
var option4 = [
    "Who? D",
    "What? D",
    "When? D",
    "Where?",
    "Why?",
    "So What?"
];

var position = 0;

// Local memory of all highscores
var pastScores = JSON.parse(localStorage.getItem("highscores")) || [];

// Instructor Provided Code (functions displayState and init): Anthony Cooper
var state = "start";

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

var timeLeft = 60;

function showTime() {
    var timeInterval = setInterval(function () {
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

    var key = ["", answerA, answerC, answerD, answerB, answerA, answerD];

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
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.sort()
    
};

startBtn.addEventListener("click", function (event) {
    event.preventDefault();
    showTime();
    state = "quiz";
    displayState();
});

answerA.addEventListener('click', function (event) {
    var element = event.target;
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
    var element = event.target;
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
    var element = event.target;
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
    var element = event.target;
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
    var userScore = timeLeft + " — " + initials.value.trim();
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push(userScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    state = "score";
    displayState();
});

init();