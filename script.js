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

var questionList = [
    "Who?",
    "What?",
    "When?"
];
var option1 = [
    "Who? A",
    "What? A",
    "When? A"
];
var option2 = [
    "Who? B",
    "What? B",
    "When? B"
];
var option3 = [
    "Who? C",
    "What? C",
    "When? C"
];
var option4 = [
    "Who? D",
    "What? D",
    "When? D"
];

var position = 0;

// Local memory of all highscores
var pastScores = JSON.parse(localStorage.getItem("highscores")) || [];

// Instructor Provided Code (functions displayState and init): Anthony Cooper
var state = "start"

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
    }
}

function init() {
    displayState();
}

var timeLeft = 15;
//   Note to self: Remember to set time back to 60

function showTime() {
    var timeInterval = setInterval(function () {
        timerEl.textContent = timeLeft;
        timeLeft--;

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            state = "end";
            displayState();
        }

        if (position === questionList.length){
            clearInterval(timeInterval);
            console.log(timeLeft);
        }
    }, 1000)
}

function showQuiz() {
    title.textContent = "";
    answerA.textContent = "";
    answerB.textContent = "";
    answerC.textContent = "";
    answerD.textContent = "";
    title.textContent = questionList[position];
    answerA.textContent = option1[position];
    answerB.textContent = option2[position];
    answerC.textContent = option3[position];
    answerD.textContent = option4[position];
}

// Note to self: current problem is that we cannot use an event listener on answer buttons.
answerA.addEventListener('click', function (event) {
    var element = event.target;
    if (element.matches("li")) {
        position++;
        if (position < questionList.length) {
            showQuiz();
        } else {
            state = "end";
            displayState();
        }
    }
})

answerB.addEventListener('click', function (event) {
    var element = event.target;
    if (element.matches("li")) {
        position++;
        if (position < questionList.length) {
            showQuiz();
        } else {
            state = "end";
            displayState();
        }
    }
})

answerC.addEventListener('click', function (event) {
    var element = event.target;
    if (element.matches("li")) {
        position++;
        if (position < questionList.length) {
            showQuiz();
        } else {
            state = "end";
            displayState();
        }
    }
})

answerD.addEventListener('click', function (event) {
    var element = event.target;
    if (element.matches("li")) {
        position++;
        if (position < questionList.length) {
            showQuiz();
        } else {
            state = "end";
            displayState();
        }
    }
})

startBtn.addEventListener("click", function (event) {
    event.preventDefault();
    showTime();
    state = "quiz";
    displayState();
});

scoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var userScore = initials.value.trim() + " — " + timeLeft;
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push(userScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    state = "score";
    displayState();
});

init();