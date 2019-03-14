const Sequelize = require('sequelize')
let connection

function connect (host, user, password, database) {
  return new Promise((resolve, reject) => {
    connection = new Sequelize({
      host: host,
      database: database,
      username: user,
      password: password,
      dialect: 'mysql',
      operatorsAliases: false,

      define: {
        freezeTableName: true,
        timestamps: false
      },

      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })

    connection.authenticate()
      .then(resolve)
      .catch(err => reject(err))
  })
}

function getConnection () {
  return connection
}

module.exports = {
  connect,
  getConnection
}

// const Sequelize = require('sequelize')
// module.exports = new Sequelize({
//   host: 'localhost',
//   database: 'cycling_web',
//   username: 'root',
//   password: 'password',
//   dialect: 'mysql',
//   operatorsAliases: false,

//   define: {
//     freezeTableName: true,
//     timestamps: false
//   },

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// })
