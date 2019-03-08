var mysql = require('mysql')
var connectionPool

function connect (host, user, password, database) {
  connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: host,
    user: user,
    password: password,
    database: database
  })
}

function getConnection () {
  return connectionPool
}

module.exports = {
  connect,
  getConnection
}
