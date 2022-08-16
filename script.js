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
        A: "A 1",
        B: "B",
        C: "C",
        D: "D",
        answer: "A"
    },
    {
        question: "Where?",
        A: "A 2",
        B: "B",
        C: "C",
        D: "D",
        answer: "A"
    },
    {
        question: "Why?",
        A: "A 3",
        B: "B",
        C: "C",
        D: "D",
        answer: "A"
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
    // <h2 id="question-title"></h2>
    // <button id="answerA" class="choice" data-clicked="false"></button>
    // <button id="answerB" class="choice" data-clicked="false"></button>
    // <button id="answerC" class="choice" data-clicked="false"></button>
    // <button id="answerD" class="choice" data-clicked="false"></button>

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
    // Append elements to questionsEl
    questionsEl.append(title, answerA, answerB, answerC, answerD);

    // TODO: Set up reward system

    // title.textContent = "";
    // answerA.textContent = "";
    // answerB.textContent = "";
    // answerC.textContent = "";
    // answerD.textContent = "";

    // if (position >= 1 && (key[position]).dataset.clicked === "true") {
    //     reward.textContent = "Correct";
    // } else if (position >= 1) {
    //     reward.textContent = "Incorrect";
    //     timeLeft = timeLeft - 10;
    // };

    // answerA.dataset.clicked = "false";
    // answerB.dataset.clicked = "false";
    // answerC.dataset.clicked = "false";
    // answerD.dataset.clicked = "false";

    // title.textContent = questionList[position];
    // answerA.textContent = option1[position];
    // answerB.textContent = option2[position];
    // answerC.textContent = option3[position];
    // answerD.textContent = option4[position];
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
        position++;
        // reward.textContent = "";
        if (position < questions.length) {
            showQuiz();
        };
    }
});

// answerB.addEventListener('click', function (event) {
//     const element = event.target;
//     if (element.matches("li")) {
//         position++;
//         reward.textContent = "";
//         if (position < questionList.length) {
//             answerB.dataset.clicked = "true";
//             showQuiz();
//         };
//     }
// });

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