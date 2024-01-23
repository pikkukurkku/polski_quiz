class Question {
  constructor(text, choices, answer, imageURL) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.imageURL = imageURL;
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

