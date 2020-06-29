class GameConfig {
  /**
   *
   * @param {{isPrivate: boolean, password: string, maxPlayers: Number, roundCount: Number, timerLength: Number}} options
   */
  constructor({ isPrivate, password, maxPlayers, roundCount, timerLength }) {
    this.isPrivate = isPrivate;
    this.password = password;
    this.maxPlayers = maxPlayers;
    this.roundCount = roundCount;
    this.timerLength = timerLength;
  }
}

module.exports = GameConfig;
