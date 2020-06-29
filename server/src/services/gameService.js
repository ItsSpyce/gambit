const Game = require('../models/game');
const GameConfig = require('../models/gameConfig');
const { v4: uuid } = require('uuid');

// something lightweight that allows us to page
const games = Object.create(null);

/**
 *
 * @param {string} id
 *
 * @returns {Game}
 */
function getGame(id) {
  return games[id];
}

/**
 *
 * @param  {...string} ids
 *
 * @returns {Array<Game>}
 */
function getGames(...ids) {
  return ids.map(getGame);
}

/**
 * @returns {Array<Game>}
 */
function getAllGames() {
  return Object.values(games);
}

/**
 *
 * @param {Number} page
 *
 * @returns {Array<Game>}
 */
function getGamesPage(page) {
  const pageIndex = (page - 1) * 20;
  return Object.values(games).slice(pageIndex, pageIndex + 20);
}

/**
 *
 * @param {string} ownerId
 * @param {GameConfig} options
 *
 * @returns {Game}
 */
function createGame(ownerId, options = Game.defaultConfig) {
  const id = uuid();
  const game = new Game(id, ownerId, options);
  games[id] = game;
  return game;
}

/**
 *
 * @param {string} id
 * @param {*} options
 */
function updateGame(id, { config = null, players = null, isOver = null }) {
  const game = getGame(id);
  if (config !== null) {
    game.config = { ...game.config, ...config };
  }
  if (players !== null) {
    game.players = players;
  }
  if (isOver !== null) {
    game.isOver = isOver;
  }
}

/**
 *
 * @param {string} id
 */
function deleteGame(id) {
  delete games[id];
}

module.exports = {
  getGame,
  getGames,
  getAllGames,
  getGamesPage,
  createGame,
  deleteGame,
  updateGame,
};
