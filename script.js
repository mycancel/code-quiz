var startScreen = document.querySelector("#beginning");
var quizScreen = document.querySelector("#quiz");
var endScreen = document.querySelector("#ending");
var scoreScreen = document.querySelector("#scoreboard");
var startBtn = document.querySelector("#start");
var scoreBtn = document.querySelector(".to-scoreboard");

// Instructor Provided Code: Anthony Cooper
var state= "start"

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



  init();