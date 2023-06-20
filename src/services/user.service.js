const userRepository = require('../repositories/user.repository');
const sqlClient = require('../database/connect');
const hashHelper = require('../common/passwordHash');
const jwtService = require('./jwt.service');
const jwtStrategy = require('../middlewares/verifyToken');
class UserService {
  constructor() {}

  async signUp(email, password) {
    let [user] = await userRepository.getInfo(email);

    if (user) {
      throw new Error('User with same email already exist');
    }
    user = await userRepository.create({ email, password: await hashHelper.hash(password) })

    return jwtService.generateTokens({id: user.id, email, password});
  }
  async signIn(id, password) {
    const [user] = await userRepository.getById(id);

    if (!user) {
      throw new Error('User with same id not found')
    }
    const isCorrect = await hashHelper.compare(password, user.password)
    if (!isCorrect) {
      throw new Error('Wrong password')
    }

    return jwtService.generateTokens({id, email: user.email, password});
  }
  async generateToken(refreshToken) {
    const decodedUser = jwtService.verify(refreshToken);

    const [user] = await userRepository.getById(decodedUser.id);

    if (!user) {
      throw new Error('User was deleted');
    }

    return jwtService.generateTokens({
      id: user.id,
      email: user.email,
      password: user.password
    });
  }
  logOut(id, token) {
    jwtStrategy.revokedTokens[id] = token;
    return {
      logout: true,
    }
  }

  async getInfo(id) {
    const [userInfo] = await userRepository.getById(id);
    return {
      id: userInfo.id,
    };
  }
}

module.exports = new UserService();
