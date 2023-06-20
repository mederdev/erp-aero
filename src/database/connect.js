const mysql = require('mysql');
const config = require('../config/config');
const userRepository = require('../repositories/user.repository');
const fileRepository = require('../repositories/file.repository');

const client = mysql.createConnection(config.getDBConfig());

module.exports = {
  connectToDB: (callback) => {
    client.connect(async (err) => {
      if (err) {
        return callback(err);
      } else {
        userRepository.setConnection(client);
        fileRepository.setConnection(client);

        console.log("Successfully connected to MySql.");
        return callback()
      }
    })
  }
}

