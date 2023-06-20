class FileRepository {
  dbClient
  constructor() {}
  setConnection(connection) {
    this.dbClient = connection;
  }
  async getFiles(limit, page){
    const offSet = (page - 1) * limit;
    return new Promise((resolve, reject) => {
      this.dbClient.query(`SELECT * FROM files LIMIT ${limit} OFFSET ${offSet}`, (err, results) => {
        if (err) return reject(err);
        return resolve(JSON.parse(JSON.stringify(results)));
      });
    })
  }

  async count() {
    return new Promise((resolve, reject) => {
      this.dbClient.query(`SELECT COUNT(*) as total FROM files`, (err, results) => {
        if (err) return reject(err);
        return resolve(JSON.parse(JSON.stringify(results)));
      });
    })
  }

  async create(data) {
    return new Promise((resolve, reject) => {
      this.dbClient.query(`
          INSERT INTO files (name, mimetype, type, size, path) 
          VALUES('${data.name}', '${data.mimetype}', '${data.type}', ${data.size}, '${data.path}')`,
        (err, results) => {
            if (err) return reject(err);
            return resolve(JSON.parse(JSON.stringify(results)));
      });
    })
  }

  async update(id, data) {
    return new Promise((resolve, reject) => {
      this.dbClient.query(
        'UPDATE files SET name = ?, mimetype = ?, type = ?, size = ?, path = ? WHERE id = ?',
        [data.name, data.mimetype, data.type, data.size, data.path, id],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          return resolve(JSON.parse(JSON.stringify(results)));
      });
    })
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      this.dbClient.query(`SELECT * FROM files WHERE id = ${id}`, (err, results) => {
        if (err) return reject(err);
        return resolve(JSON.parse(JSON.stringify(results)));
      });
    })
  }

  async deleteById(id) {
    return new Promise((resolve, reject) => {
      this.dbClient.query(`DELETE FROM files WHERE id = ${id}`, (err, results) => {
        if (err) return reject(err);
        return resolve(JSON.parse(JSON.stringify(results)));
      });
    })
  }
}

module.exports = new FileRepository();
