const Sequelize = require('sequelize')
const database = require('../database')
const bcrypt = require('bcrypt')

const UserSchema = database.define('user', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
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

module.exports = UserSchema
