var startScreen = document.querySelector("#beginning");
var quizScreen = document.querySelector("#quiz");
var endScreen = document.querySelector("#ending");
var scoreScreen = document.querySelector("#scoreboard");
var startBtn = document.querySelector("#start");
var scoreBtn = document.querySelector(".to-scoreboard");
var timerEl = document.querySelector("#timer");

// Instructor Provided Code: Anthony Cooper
var state = "start"

function displayState() {
    if (state === "start") {
      startScreen.style.display = "block";
      quizScreen.style.display = "none";
      endScreen.style.display = "none";
    }
    if (state === "quiz") {
      startScreen.style.display = "none";
      quizScreen.style.display = "block";
      endScreen.style.display = "none";
    }
    if (state === "end") {
      startScreen.style.display = "none";
      quizScreen.style.display = "none";
      endScreen.style.display = "block";
    }
  }

  function init() {
    displayState();
  }

// My contributions continue again here.
  startBtn.addEventListener("click", function (event) {
    event.preventDefault();
    state = "quiz";
    displayState();
    setTime();
  });

  var timeLeft = 60;

  function setTime(){
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



  init();