const config = require('./src/config/config');
const fs = require('fs');
const mysql = require('mysql');


const dbConfig = config.getDBConfig();
const sql = fs.readFileSync('migrations/init_db.sql', 'utf8');

const connection = mysql.createConnection(dbConfig);
try {
  const lines = sql.split('\n');
  (async function () {
    for (const query of lines) {
      if (!query) break;
      await connection.query(query);
    }
  })()
  console.log('Successfully initialized DB');
} catch (err){
  console.log(err.message)
}
