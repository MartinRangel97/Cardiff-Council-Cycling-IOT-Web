'use strict'

module.exports = (sequelize, DataTypes) => {
  var Journey = sequelize.define('journey', {
    userId: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE
  })
  Journey.associate = models => {
    Journey.hasMany(models.measurement, { targetKey: 'id', foreignKey: 'journeyId' })
    Journey.belongsTo(models.user, { foreignKey: 'userId' })
  }

  Journey.sync()
    .then(() => console.log('Journey table created successfully'))
    .catch(err => console.log('Wrong database credentials entered: ', err))

  return Journey
}
