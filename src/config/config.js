module.exports = {
  getDBConfig: () => {
    const { DB_HOST, DB_USER, DB_PASSWORD, DATABASE } = process.env;
    if (DATABASE && DB_HOST && DB_USER && DB_PASSWORD) {
      return {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DATABASE,
      }
    } else {
      console.error('DB credentials error');
      process.exit();
    }
  },
  getJWTConfig: () => {
    const { JWT_SECRET, JWT_EXPIRATION_ACCESS, JWT_EXPIRATION_REFRESH} = process.env;
    if (JWT_SECRET && JWT_EXPIRATION_ACCESS && JWT_EXPIRATION_REFRESH) {
      return {
        jwtSecret: JWT_SECRET,
        accessTokenExpiration: JWT_EXPIRATION_ACCESS,
        refreshTokenExpiration: JWT_EXPIRATION_REFRESH
      };
    } else {
      console.error('JWT credentials error');
      process.exit();
    }
  },
  getHashConfig: () => {
    const { PASSWORD_SALT } = process.env;
    if (PASSWORD_SALT) {
      return {
        salt: Number(PASSWORD_SALT),
      }
    } else {
      console.error('JWT credentials error');
      process.exit();
    }
  }
}
