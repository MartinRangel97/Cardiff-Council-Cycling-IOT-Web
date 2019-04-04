let Sequelize = require('sequelize')
let DataTypes = Sequelize.DataTypes

let db = {}

function configure (host, user, password, database) {
  return new Promise((resolve) => {
    console.log(user)
    // Prepare the Sequelize instance
    let sequelize = new Sequelize({
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
    // Require Models
    let UserModel = require('./models/user')(sequelize, DataTypes)
    let ReadingModel = require('./models/reading')(sequelize, DataTypes)
    let JourneyModel = require('./models/journey')(sequelize, DataTypes)
    // Add the models
    db.user = UserModel
    db.reading = ReadingModel
    db.journey = JourneyModel
    // TODO: Add any associations here
    Object.keys(db).forEach(function (modelName) {
      if (db[modelName].associate) {
        console.log(db[modelName])
        db[modelName].associate(db)
      }
    })
    // Set the db Sequelize instance
    db.sequelize = sequelize
    db.Sequelize = Sequelize
    db.Sequelize = Sequelize
    resolve()
  })
}

function getDatabase () {
  return db
}

module.exports = {
  configure,
  getDatabase
}
