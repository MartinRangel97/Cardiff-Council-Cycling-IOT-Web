// var mysql = require('mysql')
// var connectionPool

// function connect (host, user, password, database) {
//   connectionPool = mysql.createPool({
//     connectionLimit: 10,
//     host: host,
//     user: user,
//     password: password,
//     database: database
//   })
// }

// function getConnection () {
//   return connectionPool
// }

// module.exports = {
//   connect,
//   getConnection
// }

const Sequelize = require('sequelize')
module.exports = new Sequelize({
  host: 'localhost',
  database: 'cycling_web',
  username: 'root',
  password: 'password',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
