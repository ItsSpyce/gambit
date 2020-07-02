const userService = require('./services/userService');
const gameService = require('./services/gameService');
const wordService = require('./services/wordService');
const express = require('express');

/**
 *
 * @param {express.Express} app
 */
function configureRest(app) {
  app.route('/api/user/:id').get((req, res) => {
    const id = req.param('id');
    if (!id) {
      return res.sendStatus(404);
    }
    const user = userService.getUser(id);
    if (!user) {
      return res.sendStatus(404);
    }
    const userClone = { ...user };
    delete userClone.authToken;
    return res.json(userClone);
  });
  app
    .route('/api/user')
    .get((req, res) => {
      const { USER_ID: id } = req.cookies || {};
      if (!id) {
        return res.json(null);
      }
      const user = userService.getUser(id);
      if (!user) {
        return res.json(null);
      } else {
        return res.json(user);
      }
    })
    .post((req, res) => {
      const user = userService.createUser(req.body.name);
      res.cookie('USER_ID', user.id);
      res.cookie('AUTH_TOKEN', user.authToken);
      res.json(user);
    })
    .delete((req, res) => {
      const { USER_ID: id, AUTH_TOKEN: authToken } = req.cookies || {};
      if (!id || userService.getUser(id).authToken !== authToken) {
        return res.sendStatus(403);
      }
      userService.deleteUser(id);
      res.clearCookie('AUTH_TOKEN');
      res.sendStatus(200);
    })
    .put((req, res) => {
      const { USER_ID: id, AUTH_TOKEN: authToken } = req.cookies || {};
      if (!id || userService.getUser(id).authToken !== authToken) {
        return res.sendStatus(403);
      }
      userService.updateUser(id, req.body);
      res.sendStatus(200);
    });

  app.get('/api/games', (req, res) => {
    const games = gameService.getGamesPage(parseInt(req.query.page) || 1);
    res.json(games);
  });
  app.route('/api/game/:id/password').post((req, res) => {
    const { password } = req.body;
    const game = gameService.getGame(req.params.id);
    if (!game) return sendStatus(404);
    if (game.config.password === password) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(403);
    }
  });
  app
    .route('/api/game/:id')
    .get((req, res) => {
      const { id } = req.params;
      if (!id) {
        return res.sendStatus(404);
      }
      const game = gameService.getGame(id);
      return res.json(game);
    })
    .post((req, res) => {
      const { USER_ID: ownerId } = req.cookies || {};
      if (!ownerId) {
        return res.sendStatus(403);
      }
      const game = gameService.createGame(ownerId, req.body.name, req.body);
      return res.json(game);
    })
    .put((req, res) => {
      const { USER_ID: ownerId, AUTH_TOKEN: authToken } = req.cookies || {};
      const { id } = req.params;
      if (!ownerId || !id) {
        return res.sendStatus(403);
      }
      const user = userService.getUser(ownerId);
      if (user.authToken !== authToken) {
        return res.sendStatus(403);
      }
      const game = gameService.getGame(id);
      if (game.ownerId !== ownerId) {
        return res.sendStatus(403);
      }
      gameService.updateGame(id, req.body);
      return res.sendStatus(200);
    })
    .delete((req, res) => {
      const { USER_ID: ownerId, AUTH_TOKEN: authToken } = req.cookies || {};
      const { id } = req.params;
      if (!ownerId || !id) {
        return res.sendStatus(403);
      }
      const user = userService.getUser(ownerId);
      if (user.authToken !== authToken) {
        return res.sendStatus(403);
      }
      const game = gameService.getGame(id);
      if (game.ownerId !== ownerId) {
        return res.sendStatus(403);
      }
      gameService.deleteGame(id);
      return res.sendStatus(200);
    });
}

/**
 *
 * @param {express.Express} app
 */
function configureSocket(app) {
  app.ws('/game/:id', (ws, req) => {
    ws.on('message', console.log);
  });
}

module.exports = {
  configureRest,
  configureSocket,
};
