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
const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  username: 'user',
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

sequelize.authenticate()
  .then(() => console.log('Database Connected...'))
  .catch(err => console.log('Error: ' + err))
