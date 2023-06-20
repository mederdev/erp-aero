const bcrypt = require('bcrypt');
const config = require('../config/config');

module.exports = {
  compare: async (password, storedHash) => {
    return await bcrypt.compare(password, storedHash);
  },
  hash: async (password) => {
    const result = await bcrypt.hash(password, config.getHashConfig().salt);
    return result || password;
  }
}
