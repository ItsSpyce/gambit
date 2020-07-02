const GameConfig = require('./gameConfig');
const Round = require('./round');

const defaultConfig = new GameConfig({
  isPrivate: false,
  maxPlayers: 3,
  roundCount: 3,
  timerLength: 4 * 60,
});

class Game {
  /**
   *
   * @param {string} id
   * @param {string} name
   * @param {string} ownerId
   * @param {GameConfig} config
   */
  constructor(id, name, ownerId, config = defaultConfig) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.config = config;
    this.players = [];
    this.rounds = [];
    this.isOver = false;
  }

  nextRound(majorityWord, minorityWord) {
    const round = new Round(majorityWord, minorityWord);
    this.rounds.push(round);
    return round;
  }

  addPlayer(id) {
    if (this.players.indexOf(id) > -1) {
      return false;
    }
    this.players.push(id);
    return true;
  }

  removePlayer(id) {
    this.players.splice(this.players.indexOf(id), 1);
  }
}

Game.defaultConfig = defaultConfig;

module.exports = Game;
