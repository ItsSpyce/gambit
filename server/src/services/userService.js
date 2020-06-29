// all users and games are kept in memory to prevent usage of database
const User = require('../models/user');
const { v4: uuid } = require('uuid');

const users = new Map();

/**
 *
 * @param {string} id
 *
 * @returns {User}
 */
function getUser(id) {
  return users.get(id);
}

/**
 *
 * @param  {...string} ids
 *
 * @returns {Array<User>}
 */
function getUsers(...ids) {
  return ids.map(getUser);
}

/**
 * Creates a new player object, storing in the existing map of users
 *
 * @param {string} name The username of the player
 *
 * @returns {User}
 */
function createUser(name) {
  const id = uuid();
  const authToken = uuid();
  const user = new User(name, id, authToken);
  users.set(id, user);
  return user;
}

function deleteUser(id) {
  users.delete(id);
}

function updateUser(id, { name = null, currentGame = null }) {
  const user = getUser(id);
  if (name !== null) {
    user.name = name;
  }
  if (currentGame !== null) {
    user.currentGame = currentGame;
  }
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
};
