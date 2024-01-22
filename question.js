class Question {
    constructor(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
    }
    shuffleChoices() {
      const shuffled = [];
      while (this.choices.length) {
        const random = Math.floor(Math.random() * this.choices.length);
        shuffled.push(this.choices.splice(random, 1)[0]);
      }
      this.choices = shuffled;
    }
  }
  