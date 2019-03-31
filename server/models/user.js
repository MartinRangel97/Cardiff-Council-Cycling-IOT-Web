'use strict'

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    shareReadings: DataTypes.BOOLEAN
  })

  User.sync()
    .then(() => console.log('User table created successfully'))
    .catch(err => console.log('Wrong database credentials entered: ', err))

  return User
}
