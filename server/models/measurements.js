'use strict'

module.exports = (sequelize, DataTypes) => {
  var Measurement = sequelize.define('measurements', {
    userId: DataTypes.INTEGER,
    journeyId: DataTypes.INTEGER,
    dBReading: DataTypes.FLOAT,
    NO2Reading: DataTypes.FLOAT,
    PM10Reading: DataTypes.FLOAT,
    PM25Reading: DataTypes.FLOAT,
    timeTaken: DataTypes.DATE,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT
  })
  Measurement.associate = models => {
    Measurement.belongsTo(models.journey, { foreignKey: 'journeyId' })
    Measurement.belongsTo(models.user, { foreignKey: 'userId' })
  }

  Measurement.sync()
    .then(() => console.log('Measurement table created successfully'))
    .catch(err => console.log('Wrong database credentials entered: ', err))

  return Measurement
}
