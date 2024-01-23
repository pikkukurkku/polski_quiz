document.addEventListener("DOMContentLoaded", () => {
  let startScreen = document.getElementById("start-screen");
  let gameScreen = document.getElementById("game-screen");
  let endScreen = document.getElementById("end-screen");
  let startButton = document.getElementById("start-button");
  let questionContainer = document.getElementById("question");
  let imageContainer = document.getElementById("question-image");
  let choiceContainer = document.getElementById("choices");
  let mySound = new Audio("./audio/button-3.wav");

  document.addEventListener("keydown", function (event) {
    console.log("key down");
    if (event.code === "Space") {
      event.preventDefault();
      console.log("Start game");
      startScreen.style.display = "none";
      gameScreen.style.display = "flex";
      mySound.play();
      showQuestion();
    }
  });

  /************  QUIZ DATA  ************/

  const questions = [
    new Question(
      "Who is this?",
      ["Messi", "Lewandowski", "Mbappe"],
      2,
      "images/lewy.jpg"
    ),
    new Question(
      "What is this?",
      ["Ogórek", "Pomidor", "Banan"],
      1,
      "images/ogorek.jpg"
    ),
    new Question(
      "What is this?",
      ["Dom", "Hus", "Kuća"],
      1,
      "images/house.jpg"
    ),
    new Question(
      "The capital of Polska is...",
      ["Kraków", "Budapest", "Warszawa"],
      3,
      "images/warszawa.jpg"
    ),
    new Question(
      "What is this?",
      ["Komputador", "Komputer", "Kalkulator"],
      2,
      "images/computer.jpg"
    ),
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
    imageContainer.innerHTML = "";

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`;

    const question = quiz.getQuestion();
    question.shuffleChoices();
    questionContainer.textContent = question.text;

    imageContainer.src = question.imageURL;
    imageContainer.alt = "Question image";

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
