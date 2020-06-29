class User {
  /**
   *
   * @param {string} name
   * @param {string} id
   * @param {string} authToken
   */
  constructor(name, id, authToken) {
    this.name = name;
    this.id = id;
    this.authToken = authToken;
    this.currentGame = -1;
  }

  setGame(gameId) {
    this.currentGame = gameId;
  }
}

module.exports = User;
