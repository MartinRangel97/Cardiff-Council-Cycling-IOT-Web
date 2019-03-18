const Sequelize = require('sequelize')
const database = require('../database')
const bcrypt = require('bcrypt')

const User = database.define('user', {
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  shareReadings: {
    type: Sequelize.BOOLEAN
  }
}, {
  hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync(8)
      user.password = bcrypt.hashSync(user.password, salt)
    }
  },
  instanceMethods: {
    validPassword (password) {
      return bcrypt.compareSync(password, this.password)
    }
  }
})

User.sync()
  .then(() => console.log('User table created successfully'))
  .catch(err => console.log('Wrong database credentials entered: ', err))

module.exports = User
