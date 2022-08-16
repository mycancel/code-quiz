const startScreen = document.querySelector("#beginning");
const quizScreen = document.querySelector("#quiz");
const endScreen = document.querySelector("#ending");
const scoreScreen = document.querySelector("#scoreboard");
const startBtn = document.querySelector("#start");
const scoreBtn = document.querySelector("#to-scoreboard");

const timerEl = document.querySelector("#timer");
const initials = document.querySelector("#initials");

const questionsEl = document.querySelector("#questions");
const reward = document.querySelector("#reward");

const questions = [
    {
        question: "Who?",
        A: "A",
        B: "B",
        C: "C",
        D: "D",
        answer: "A"
    },
    {
        question: "Where?",
        A: "A",
        B: "B",
        C: "C",
        D: "D",
        answer: "B"
    },
    {
        question: "Why?",
        A: "A",
        B: "B",
        C: "C",
        D: "D",
        answer: "C"
    },
    {
        question: "Who?",
        A: "A",
        B: "B",
        C: "C",
        D: "D",
        answer: "A"
    },
    {
        question: "Where?",
        A: "A",
        B: "B",
        C: "C",
        D: "D",
        answer: "B"
    },
    {
        question: "Why?",
        A: "A",
        B: "B",
        C: "C",
        D: "D",
        answer: "C"
    },
];

let position = 0;

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

        if (position === questions.length){
            clearInterval(timeInterval);
            state = "end";
            displayState();
        };
    }, 1000)
};

function showQuiz() {
    // Reset questionsEl
    questionsEl.innerHTML = null;
    // Create Elements
    const title = document.createElement('h2');
    const answerA = document.createElement('button');
    const answerB = document.createElement('button');
    const answerC = document.createElement('button');
    const answerD = document.createElement('button');
    // Set text of elements
    title.innerHTML = questions[position].question;
    answerA.innerHTML = questions[position].A;
    answerB.innerHTML = questions[position].B;
    answerC.innerHTML = questions[position].C;
    answerD.innerHTML = questions[position].D;
    // Set value of answers
    answerA.value = questions[position].A;
    answerB.value = questions[position].B;
    answerC.value = questions[position].C;
    answerD.value = questions[position].D;
    // Append elements to questionsEl
    questionsEl.append(title, answerA, answerB, answerC, answerD);
};

function checkAnswer(selected) {
    if (selected === questions[position].answer) {
        reward.textContent = "Correct";
    } else if (position >= 1) {
        reward.textContent = "Incorrect";
        timeLeft = timeLeft - 10;
    };
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

questionsEl.addEventListener('click', function (event) {
    const element = event.target;
    if (element.matches("button")) {
        checkAnswer(element.value);
        position++;
        if (position < questions.length) {
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