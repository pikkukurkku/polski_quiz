document.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.getElementById("start-screen");
  const loadScreen = document.getElementById("load-screen");
  const gameScreen = document.getElementById("game-screen");
  const endScreen = document.getElementById("end-screen");
  const questionContainer = document.getElementById("question");
  const imageContainer = document.getElementById("question-image");
  const choiceContainer = document.getElementById("choices");
  const questionCount = document.getElementById("questionCount");
  const resultContainer = document.getElementById("result-container");
  const comment = document.getElementById("comment");
  const mySound = new Audio("./audio/button-3.wav");
  const applauseSound = new Audio("./audio/applause-2.wav");
  const laugh = new Audio("./audio/laugh_5.wav");
  const startGameSound = new Audio(
    "./audio/mixkit-arcade-video-game-scoring-presentation-274.wav"
  );
  const startButton = document.getElementById("start-button");
  const restartButton = document.querySelector("#restartButton");
  let spaceBarContext = "start";
  let resultImage = document.getElementById("result-img");
  let quiz;
  const isMobile = window.innerWidth <= 768;

  startScreen.style.display = "flex";

  function startGame() {
    loadScreen.style.display = "none";
    gameScreen.style.display = "flex";
    spaceBarContext = "game";
    showQuestion();
  }

  function handleSpaceBarEvent() {
    if (spaceBarContext === "start") {
      startGameSound.play();
      startScreen.style.display = "none";
      loadScreen.style.display = "flex";
      spaceBarContext = "load";
      setTimeout(startGame, 3200);
    } else if (spaceBarContext === "game") {
      const selectedAnswer = document.querySelector(
        "input[name=choice]:checked"
      );
      if (selectedAnswer) {
        console.log("Selected Answer:", selectedAnswer.value);
        console.log("Correct Answer:", quiz.getQuestion().answer);
        quiz.checkAnswer(selectedAnswer.value);

        mySound.play();
        quiz.moveToNextQuestion();
        showQuestion();
      }
    }
  }

  function handleMobileTap() {
    handleSpaceBarEvent();
  }

  if (isMobile) {
    nextButton.textContent = "Next question";
  } else {
    nextButton.textContent = "Press space to continue";
  }

  startButton.addEventListener(
    isMobile ? "click" : "keydown",
    isMobile ? handleMobileTap : handleSpaceBarEvent
  );

  document
    .getElementById("nextButton")
    .addEventListener(
      isMobile ? "click" : "keydown",
      isMobile ? handleMobileTap : handleSpaceBarEvent
    );

  function showResults() {
    gameScreen.style.display = "none";
    endScreen.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers`;
    if (quiz.correctAnswers === 6) {
      comment.innerText =
        "Polish citizenship will be granted to you personally by Lewandowski, no questions asked";
      resultImage.src = "images/heartred.webp";
      applauseSound.play();
    } else if (quiz.correctAnswers < 6 && quiz.correctAnswers >= 4) {
      comment.innerText =
        "Well done! Maybe one day you can eat dinner with Lewadowski";
      resultImage.src = "images/lewy-slide.gif";
      applauseSound.play();
    } else if (quiz.correctAnswers < 4 && quiz.correctAnswers >= 2) {
      comment.innerText = "Not impressed. Could be worse";
      resultImage.src = "images/mediocre.webp";
      laugh.play();
    } else if (quiz.correctAnswers < 2) {
      comment.innerText = "Lewandowski wouldn't even pass the ball to you";
      resultImage.src = "images/lewy-facepalm.gif";
      laugh.play();
    }
  }

  function showQuestion() {
    if (!quiz.hasEnded()) {
      questionContainer.innerText = "";
      choiceContainer.innerHTML = "";
      imageContainer.src = "";

      const question = quiz.getQuestion();
      question.shuffleChoices();
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
  // Define your Question and Quiz classes here

  const questions = [
    new Question(
      "Who is this?",
      ["Messi", "Lewandowski", "Mbappe"],
      "Lewandowski",
      "./images/lewy_gif.gif"
    ),
    new Question(
      "What is this?",
      ["Ogórek", "Pomidor", "Banan"],
      "Ogórek",
      "./images/ogorek.jpg"
    ),
    new Question(
      "What is this?",
      ["Dom", "Hus", "Kuća"],
      "Dom",
      "./images/home.webp"
    ),
    new Question(
      "The capital of Polska is...",
      ["Kraków", "Budapest", "Warszawa"],
      "Warszawa",
      "./images/93Iw.gif"
    ),
    new Question(
      "What is this?",
      ["Komputador", "Komputer", "Kalkulator"],
      "Komputer",
      "./images/komp.webp"
    ),
    new Question(
      "How do Polish people greet each other?",
      ["Salve!", "Aloha!", "Cześć!"],
      "Cześć!",
      "./images/hi.webp"
    ),
  ];

  quiz = new Quiz(questions);
  quiz.shuffleQuestions();
  showQuestion();

  startButton.addEventListener(
    isMobile ? "click" : "keydown",
    isMobile ? handleMobileTap : handleSpaceBarEvent
  );

  function restartGame() {
    quiz.reset();

    endScreen.style.display = "none";
    startScreen.style.display = "flex";
    startGame();
    // Reattach event listener for the start button
    startButton.addEventListener(
      isMobile ? "click" : "keydown",
      isMobile ? handleMobileTap : handleSpaceBarEvent
    );
  }

  restartButton.addEventListener("click", restartGame);
});
