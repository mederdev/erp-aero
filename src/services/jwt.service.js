const jwt = require('jsonwebtoken');
const config = require('../config/config');

class JwtService {
  constructor() {}
  generateTokens(payload) {
    const { jwtSecret,accessTokenExpiration , refreshTokenExpiration } = config.getJWTConfig();
    const accessToken = jwt.sign({
      ...payload,
      type: 'access',
    }, jwtSecret, { expiresIn: accessTokenExpiration });
    const refreshToken = jwt.sign({
      ...payload,
      type: 'refresh',
    }, jwtSecret, { expiresIn: refreshTokenExpiration });
    return {
      accessToken,
      refreshToken
    }
  }
  verify(token) {
    const { jwtSecret } = config.getJWTConfig();
    return jwt.verify(token, jwtSecret);
  }
}

module.exports = new JwtService();
