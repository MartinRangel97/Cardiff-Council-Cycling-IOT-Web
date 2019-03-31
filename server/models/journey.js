'use strict'

module.exports = (sequelize, DataTypes) => {
  var Journey = sequelize.define('journey', {
    // id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE

  })

  Journey.sync()
    .then(() => console.log('Journey table created successfully'))
    .catch(err => console.log('Wrong database credentials entered: ', err))

  return Journey
}
