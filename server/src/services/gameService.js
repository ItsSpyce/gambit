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
  // strip out all passwords
  return Object.values(games).reduce(
    (games, game) => [
      ...games,
      { ...game, config: { ...game.config, password: undefined } },
    ],
    []
  );
}

/**
 *
 * @param {Number} page
 *
 * @returns {Array<Game>}
 */
function getGamesPage(page) {
  const pageIndex = (page - 1) * 20;
  const pagedGames = getAllGames().slice(pageIndex, pageIndex + 20);
  return pagedGames;
}

/**
 *
 * @param {string} ownerId
 * @param {string} name
 * @param {GameConfig} options
 *
 * @returns {Game}
 */
function createGame(ownerId, name, options = Game.defaultConfig) {
  const id = uuid();
  const game = new Game(id, name, ownerId, options);
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

if (process.env.NODE_ENV !== 'production') {
  const testUser = uuid();
  createGame(uuid(), 'Public Game');
  createGame(
    uuid(),
    'Private Game',
    new GameConfig({ isPrivate: true, password: 'Test123', maxPlayers: 4 })
  );
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
