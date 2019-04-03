'use strict'

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    shareReadings: DataTypes.BOOLEAN
  })
  User.associate = models => {
    User.hasMany(models.reading, { targetKey: 'id', foreignKey: 'userId' })
    User.hasMany(models.journey, { targetKey: 'id', foreignKey: 'userId' })
  }

  User.sync()
    .then(() => console.log('User table created successfully'))
    .catch(err => console.log('Wrong database credentials entered: ', err))

  return User
}
