'use strict'

module.exports = (sequelize, DataTypes) => {
  var Journey = sequelize.define('journey', {
    id: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    userId: DataTypes.INTEGER
  })

  Journey.sync()
    .then(() => console.log('Journey table created successfully'))
    .catch(err => console.log('Wrong database credentials entered: ', err))

  return Journey
}
