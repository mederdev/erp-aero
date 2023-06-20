class UserRepository {
  dbClient;
  constructor() {}
  setConnection(client) {
    this.dbClient = client;
  }
  async getInfo(email){
    return new Promise((resolve, reject) => {
      this.dbClient.query(`SELECT * FROM users WHERE email = '${email}'`, (err, results) => {
        if (err) return reject(err);
        return resolve(JSON.parse(JSON.stringify(results)));
      });
    })
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      this.dbClient.query(`SELECT * FROM users WHERE id = ${id}`, (err, results) => {
        if (err) return reject(err);
        return resolve(JSON.parse(JSON.stringify(results)));
      });
    })
  }

  async getUser(email) {
    // return await this.dbClient.query(
    //   `SELECT * FROM 'users' WHERE email = ${email}`,
    // );
  }

  async create(data) {
    return new Promise((resolve, reject) => {
      this.dbClient.query(`INSERT INTO users (email, password) VALUES ('${data.email}', '${data.password}')`, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    })
  }
}

module.exports = new UserRepository();
