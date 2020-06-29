const fs = require('fs');
const pairs = require('../../pairs.json');

function getRandomPair() {
  const i = Math.floor(Math.random() * (pairs.length - 1));
  return pairs[i];
}

module.exports = {
  getRandomPair,
};
