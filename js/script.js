document.addEventListener("DOMContentLoaded", () => {
  let startScreen = document.getElementById("start-screen");
  let gameScreen = document.getElementById("game-screen");
  let endScreen = document.getElementById("end-screen");
  // let startButton = document.getElementById("start-button");
  let questionContainer = document.getElementById("question");
  let imageContainer = document.getElementById("question-image");
  let choiceContainer = document.getElementById("choices");
  let questionCount = document.getElementById("questionCount");
  let resultContainer = document.getElementById("result-container");
  let comment = document.getElementById("comment");
  let mySound = new Audio("./audio/button-3.wav");
  let loadScreen = document.getElementById("load-screen")
  let applauseSound = new Audio("./audio/applause-2.wav");
  let laugh = new Audio("./audio/laugh_5.wav");
  let startGameSound = new Audio(
    "./audio/mixkit-arcade-video-game-scoring-presentation-274.wav"
  );
  let spaceBarContext = "start";
  let resultImage = document.getElementById("result-img");
  let quiz;


  
  startScreen.style.display = "flex";
 

  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      event.preventDefault();
      console.log("Space bar pressed");
      if (spaceBarContext === "start") {
        startGameSound.play();
        startScreen.style.display = "none";
        loadScreen.style.display = "flex";
        spaceBarContext = "load";
        setTimeout(() => {
        startGame();
        }, 3000);
      } else if (spaceBarContext === "game") {
        let selectedAnswer;
        const choices = document.querySelectorAll("input[name=choice]");

        choices.forEach((choice) => {
          if (choice.checked) {
            selectedAnswer = choice.value;
          }
        });

        if (selectedAnswer) {
          console.log("Selected Answer:", selectedAnswer);
          console.log("Correct Answer:", quiz.getQuestion().answer);
          quiz.checkAnswer(selectedAnswer);

          mySound.play();
          quiz.moveToNextQuestion();
          showQuestion();
        }
      }
    }
  });

  function startGame() {
    loadScreen.style.display = "none";
    gameScreen.style.display = "flex";
    spaceBarContext = "game";
    showQuestion();
  }

  function showToast(message) {
    toast.classList.add("show");
    console.log("showToast called!");
    setTimeout(function () {
      toast.classList.remove("show");
      console.log("has been closed!");
    }, 300);
  }

  function closeToast() {
    let toastCloseButton = document.getElementById("close-toast");
    toastCloseButton.addEventListener(
      "click",
      () => {
        toast.classList.remove("show");
        console.log("has been closed!");
      },
      100
    );
  }

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
      console.log("Image URL:", question.imageURL);
      imageContainer.onerror = function () {
        console.error("Error loading image:", question.imageURL);
      };
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

  const restartButton = document.querySelector("#restartButton");
  restartButton.addEventListener("click", () => {
    location.reload();
  });
});
