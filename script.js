// Query Selected State Elements
const startScreen = document.querySelector("#beginning");
const quizScreen = document.querySelector("#quiz");
const endScreen = document.querySelector("#ending");
const scoreScreen = document.querySelector("#scoreboard");
let state = "start";

// Buttons to start quiz and submit score
const startBtn = document.querySelector("#start");
const scoreBtn = document.querySelector("#to-scoreboard");

// All elements for quiz or score
const timerEl = document.querySelector("#timer");
const questionsEl = document.querySelector("#questions");
const reward = document.querySelector("#reward");
const initials = document.querySelector("#initials");
let position = 0;
let timeLeft = 60;

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

// Quiz State Function — Timer for quiz
function showTime() {
    const timeInterval = setInterval(function () {
        timerEl.textContent = timeLeft;
        timeLeft--;

        // Timer count cannot be a negative number (for the score)
        if (timeLeft < 0) {
            timeLeft = 0;
        };

        // When the timer ends, the quiz ends
        if (timeLeft === 0) {
            clearInterval(timeInterval);
            state = "end";
            displayState();
        };

        // If all questions are answered, the quiz ends
        if (position === questions.length){
            clearInterval(timeInterval);
            state = "end";
            displayState();
        };
    }, 1000)
};

// Quiz State Function — Displays quiz elements
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

// Quiz State Function — Communicates Correct/Incorrect
function checkAnswer(selected) {
    if (selected === questions[position].answer) {
        reward.textContent = "Correct";
    } else {
        reward.textContent = "Incorrect";
        timeLeft = timeLeft - 10;
    };
};

// Score State Function — Retrieves scores and populates page
// TODO: Scores need to be shown on the score page
function showScore() {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.sort()
};

// Changes state to update contents of the page
// Instructor Provided Code (functions displayState and init): Anthony Cooper
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

// Starts the quiz
startBtn.addEventListener("click", function (event) {
    event.preventDefault();
    showTime();
    state = "quiz";
    displayState();
});

// Checks answer, progresses quiz
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

// TODO: Fix score button
// Saves score, changes state to score
scoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const userScore = timeLeft + " — " + initials.value.trim();
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push(userScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    state = "score";
    displayState();
});

// TODO: add event listener for button on start state

init();