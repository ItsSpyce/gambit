class Round {
  constructor(majorityWord, minorityWord) {
    this.majorityWord = majorityWord;
    this.minorityWord = minorityWord;
    this.isOver = false;
    this.wasMinorityFound = false;
    this.wasMajorityWordGuessed = false;
  }
}

module.exports = Round;
