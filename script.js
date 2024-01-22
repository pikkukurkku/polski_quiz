document.addEventListener("DOMContentLoaded", () => {
  let startScreen = document.getElementById("start-screen");
  let gameScreen = document.getElementById("game-screen");
  let endScreen = document.getElementById("end-screen");
  let startButton = document.getElementById("start-button");
  let quiz;

  let mySound = new Audio("./audio/button-3.wav");
  mySound.play();

  function startGame() {
    this.quiz = new Quiz(questions);
    this.quiz.shuffleQuestions();
    this.quiz.getQuestion();
    this.quiz.shuffleChoices();
    this.quiz.showQuestion();
    this.quiz.start();
  }

  document.addEventListener("keydown", function (event) {
    console.log("key down");
    if (event.code === "Space") {
      event.preventDefault();
      console.log("Start game");
      startScreen.style.display = "none";
      gameScreen.style.display = "flex";
      mySound.play();
      startGame();
    }
  });
  /************  QUIZ DATA  ************/

  const questions = [
    new Question("Who is this?", ["Messi", "Lewandowski", "Mbappe"], 2),
    new Question("What is this?", ["Ogórek", "Pomidor", "Banan"], 1),
    new Question("What is this?", ["Dom", "Hus", "Kuća"], 1),
    new Question(
      "The capital of Polska is...",
      ["Kraków", "Budapest", "Warszawa"],
      3
    ),
    new Question("What is this?", ["Komputador", "Komputer", "Kalkulator"], 2),
  ];
});
