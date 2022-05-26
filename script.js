var startScreen = document.querySelector("#beginning");
var quizScreen = document.querySelector("#quiz");
var endScreen = document.querySelector("#ending");
var scoreScreen = document.querySelector("#scoreboard");
var startBtn = document.querySelector("#start");
var scoreBtn = document.querySelector("#to-scoreboard");

var timerEl = document.querySelector("#timer");
var initials = document.querySelector("#initials");

// Local memory of one highscore
var pastScores = localStorage.getItem("highscores") || "";

// Instructor Provided Code: Anthony Cooper
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

startBtn.addEventListener("click", function (event) {
    event.preventDefault();
    state = "quiz";
    displayState();
    setTime();
});

var timeLeft = 5;
//   Note to self: Remember to set time back to 60

function setTime() {
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time Left: " + timeLeft;
        // Note to self: Timer currently displays as 59 instead of 60

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            state = "end";
            displayState();
        }
    }, 1000)
}

scoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var highscore = initials.value.trim() + " — " + timeLeft;
    localStorage.setItem("highscores", highscore);
    state = "score";
    displayState();
});


init();