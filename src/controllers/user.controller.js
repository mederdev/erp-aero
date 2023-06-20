const userService = require('../services/user.service');

class UserController {
  constructor() {}

  async signUp(req, res) {
    try {
      const { email, password } = req.body;
      const result = await userService.signUp(email, password);
      res.send(result);
    } catch (err) {
      res.status(400).send({
        message: err.message
      });
    }
  }
  async signIn(req, res) {
    try {
      const { id, password } = req.body
      const result = await userService.signIn(id, password);
      res.send(result);
    } catch (err) {
      res.status(400).send({
        message: err.message
      });
    }
  }
  async generateToken(req, res) {
    try {
      const refreshToken = req.body.refreshToken || req.headers['refresh-token'];

      if (!refreshToken) {
        return res.status(401).send({ error: 'Refresh token not provided' });
      }

      const newPairs = await userService.generateToken(refreshToken);

      res.send(newPairs);
    } catch (err) {
      res.status(500).send({
        message: err.message
      })
    }
  }
  logOut(req, res) {
    try {
      const result = userService.logOut(req.user.id, req.headers.authorization);
      res.send(result);
    } catch (err) {
      res.status(400).send({
        message: err.message
      })
    }
  }

  async getInfo(req, res) {
    try {
      const user = await userService.getInfo(req.user.id)
      res.send(user)
    } catch (err) {
      res.status(404).send({
        message: err.message
      });
    }
  }
}


module.exports = new UserController();
