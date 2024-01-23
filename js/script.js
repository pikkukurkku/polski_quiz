document.addEventListener("DOMContentLoaded", () => {
  let startScreen = document.getElementById("start-screen");
  let gameScreen = document.getElementById("game-screen");
  let endScreen = document.getElementById("end-screen");
  let startButton = document.getElementById("start-button");
  let questionContainer = document.getElementById("question");
  let imageContainer = document.getElementById("question-image");
  let choiceContainer = document.getElementById("choices");
  let questionCount = document.getElementById("questionCount");
  let resultContainer = document.getElementById("result-container");
  let mySound = new Audio("./audio/button-3.wav");
  let spaceBarContext = "start";
  let quiz;

  document.addEventListener("keydown", function (event) {
    console.log("key down");
    if (event.code === "Space") {
      event.preventDefault();
      if (spaceBarContext === "start") {
        startGame();
      } else if (spaceBarContext === "game") {
        quiz.moveToNextQuestion();
        mySound.play();
        showQuestion();
      }
    }
  });

  function startGame() {
    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
    spaceBarContext = "game";
    showQuestion();
  }

  // function nextQuestion() {
  //   let selectedAnswer;
  //   const choices = document.querySelectorAll("input[name=choice]");
  //   choices.forEach((choice) => {
  //     if (choice.checked) {
  //       selectedAnswer = choice.value;
  //     }
  //   });
  // }

  function showResults() {
    gameScreen.style.display = "none";
    endScreen.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
    // resetQuiz();
  }

  function showQuestion() {
    if (!quiz.hasEnded()) {
      questionContainer.innerText = "";
      choiceContainer.innerHTML = "";
      imageContainer.src = "";

      const question = quiz.getQuestion();
      question.shuffleChoices();
      console.log("Image URL:", question.imageURL);
      imageContainer.src = question.imageURL;
      questionContainer.innerText = question.text;
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
     
    } else {
      showResults();
    }
  }

  /************  QUIZ DATA  ************/

  const questions = [
    new Question(
      "Who is this?",
      ["Messi", "Lewandowski", "Mbappe"],
      2,
      "./images/lewy.jpg"
    ),
    new Question(
      "What is this?",
      ["Ogórek", "Pomidor", "Banan"],
      1,
      "./images/ogorek.jpg"
    ),
    new Question(
      "What is this?",
      ["Dom", "Hus", "Kuća"],
      1,
      "./images/house.jpg"
    ),
    new Question(
      "The capital of Polska is...",
      ["Kraków", "Budapest", "Warszawa"],
      3,
      "./images/warszawa.jpg"
    ),
    new Question(
      "What is this?",
      ["Komputador", "Komputer", "Kalkulator"],
      2,
      "./images/computer.jpg"
    ),
  ];

  quiz = new Quiz(questions);
  quiz.shuffleQuestions();
  showQuestion();
  // nextButton.addEventListener("click", nextButtonHandler);

  function resetQuiz() {
    quiz = new Quiz(questions);
    startScreen.style.display = "flex";
    gameScreen.style.display = "none";
    endScreen.style.display = "none";
    spaceBarContext = "start";
    quiz.shuffleQuestions();
  }
});
