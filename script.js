document.addEventListener("DOMContentLoaded", () => {
  let startScreen = document.getElementById("start-screen");
  let gameScreen = document.getElementById("game-screen");
  let endScreen = document.getElementById("end-screen");
  let startButton = document.getElementById("start-button");
  let questionContainer = document.getElementById("question-container");

  let mySound = new Audio("./audio/button-3.wav");

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

  let quiz = new Quiz(questions);
  quiz.shuffleQuestions();
  showQuestion();

  function showQuestion() {
    if (quiz.hasEnded()) {
      showResults();
      return;
    }
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";
    const question = quiz.getQuestion();
    question.shuffleChoices();
    questionContainer.innerText = question.text;
    progressBar.style.width = `${
      (quiz.currentQuestionIndex / quiz.questions.length) * 100
    }%`;
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`;
    question.choices.forEach((choice) => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "choice";
      radio.value = choice;
      choiceContainer.appendChild(radio);

      const label = document.createElement("label");
      label.innerText = choice;
      choiceContainer.appendChild(label);

      const br = document.createElement("br");
      choiceContainer.appendChild(br);
    });
  }
});
