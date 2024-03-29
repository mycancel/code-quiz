// Query Selected State Elements
const startScreen = document.querySelector("#beginning");
const quizScreen = document.querySelector("#quiz");
const endScreen = document.querySelector("#ending");
const scoreScreen = document.querySelector("#scoreboard");
let state = "start";

// Buttons switch states
const startBtn = document.querySelector("#start");
const scoreBtn = document.querySelector("#to-scoreboard");
const scoreFromStart = document.querySelector('#scores-from-start');
const backToStart = document.querySelector('#to-start');

// All elements for quiz or score
const timerEl = document.querySelector("#timer");
const questionsEl = document.querySelector("#questions");
const reward = document.querySelector("#reward");
let position = 0;
let timeLeft = 60;
const initials = document.querySelector("#initials");
const scoreList = document.querySelector('#scoreList');

const questions = [
    {
        question: 'What does "this" refer to in a global execution context?',
        A: "The variable",
        B: "The function",
        C: "The global object",
        D: "The local object",
        answer: "The global object"
    },
    {
        question: "A(n) _____ keeps track of the order of function calls within a script.",
        A: "callback queue",
        B: "call stack",
        C: "data structure",
        D: "event loop",
        answer: "call stack"
    },
    {
        question: "A(n) ____ defers actions so that new items are added to the bottom fo the collection while the items added first are first to be executed.",
        A: "data structure",
        B: "call stack",
        C: "callback queue",
        D: "event loop",
        answer: "callback queue"
    },
    {
        question: "Which term organizes function calls so that the last in is the first out (LIFO)?",
        A: "callback queue",
        B: "event loop",
        C: "data structure",
        D: "call stack",
        answer: "call stack"
    },
    {
        question: "The ____ is responsible for executing code, collecting and processing events, and executing queued sub-tasks.",
        A: "callback queue",
        B: "call stack",
        C: "data structure",
        D: "event loop",
        answer: "event loop"
    },
    {
        question: "A(n) _______ creates a loop where the function is called again. It is used for finding patterns and creating search algorithms.",
        A: "recursive call",
        B: "base condition",
        C: "memoization",
        D: "algorithm  ",
        answer: "recursive call"
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
        reward.classList = "correct";
        reward.textContent = "Correct";
    } else {
        reward.classList = "incorrect";
        reward.textContent = "Incorrect";
        timeLeft = timeLeft - 10;
    };
};

// Score State Function — Retrieves scores and populates page
function showScore() {
    // Resets scoreList
    scoreList.innerHTML = null;
    // Retrieve scores from local storage
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    // Sort scores from highest to lowest
    highscores.sort((a, b) => b.score - a.score);
    // Score populate the scoreboard
    highscores.forEach((score) => {
        const scoreLi = document.createElement('li');
        scoreLi.innerHTML = score.user.toUpperCase() + " — " + score.score;
        scoreList.append(scoreLi);
    });
};

// Changes state to update contents of the page
// Instructor Provided Code (functions displayState and init): Anthony Cooper
function displayState() {
    if (state === "start") {
        startScreen.style.display = "block";
        quizScreen.style.display = "none";
        endScreen.style.display = "none";
        scoreScreen.style.display = "none";
        // My contribution: Reset Position, Timer, Reward text, and initials value before starting again
        position = 0;
        timeLeft = 60;
        reward.textContent = null;
        reward.classList = null;
        initials.value = null;
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
questionsEl.addEventListener("click", function (event) {
    const element = event.target;
    if (element.matches("button")) {
        checkAnswer(element.value);
        position++;
        if (position < questions.length) {
            showQuiz();
        };
    }
});

// Saves score, changes state to score
scoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const userScore = {
        score: timeLeft,
        user: initials.value.trim()
    };
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push(userScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    state = "score";
    displayState();
});

// Scoreboard button on start state
scoreFromStart.addEventListener("click", function (event) {
    event.preventDefault();
    state = "score";
    displayState();
});

// Back to Start button on score state
backToStart.addEventListener("click", function (event) {
    event.preventDefault();
    state = "start";
    displayState();
})

init();