const Sequelize = require('sequelize')
const database = require('../database')
const bcrypt = require('bcrypt')

const UserSchema = database.define('user', {
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  share_Readings: {
    type: Sequelize.BOOLEAN
  },
  isDeleted: {
    type: Sequelize.BOOLEAN
  }
})

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = UserSchema
