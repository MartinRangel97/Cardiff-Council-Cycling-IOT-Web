'use strict'

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    shareReadings: DataTypes.BOOLEAN
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

  return User
}
