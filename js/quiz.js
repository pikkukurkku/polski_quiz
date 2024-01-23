class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    const shuffled = [];
    while (this.questions.length) {
      const random = Math.floor(Math.random() * this.questions.length);
      shuffled.push(this.questions.splice(random, 1)[0]);
    }
    this.questions = shuffled;
  }

  checkAnswer(selectedAnswer) {
    if (this.getQuestion().answer === selectedAnswer) {
      this.correctAnswers++;
      console.log(this.correctAnswers);
    }
  }

  hasEnded() {
    return this.currentQuestionIndex === this.questions.length;
  }
}
