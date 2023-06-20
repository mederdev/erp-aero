const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const config = require('../config/config');

const revokedTokens = {};
const verifyAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split('Bearer ')[1];
    if (!token) {
      return res.status(401).send({ error: 'Missing access token' });
    }
    req.user = await promisify(jwt.verify)(token, config.getJWTConfig().jwtSecret);

    if (revokedTokens[req.user.id] && revokedTokens[req.user.id] === req.headers.authorization) {
      return res.status(403).send({ error: 'Forbidden resource' })
    }
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Invalid access token', message: error.message });
  }
};

module.exports.verifyAccessToken = verifyAccessToken;
module.exports.revokedTokens = revokedTokens;
