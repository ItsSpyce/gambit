import axios from 'axios';

async function getGames(page) {
  try {
    const games = await axios.get(`/api/games?page=${page}`);
    return games.data;
  } catch (err) {
    return err;
  }
}

async function checkPassword(gameId, password) {
  try {
    await axios.post(`/api/game/${gameId}/password`, { password });
    return true;
  } catch (err) {
    return false;
  }
}

export default {
  getGames,
  checkPassword,
};
