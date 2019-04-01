'use strict'

module.exports = (sequelize, DataTypes) => {
  var Journey = sequelize.define('journey', {
    userId: DataTypes.INTEGER
  })

  Journey.sync()
    .then(() => console.log('Journey table created successfully'))
    .catch(err => console.log('Wrong database credentials entered: ', err))

  return Journey
}
