'use strict'

module.exports = (sequelize, DataTypes) => {
  var Reading = sequelize.define('reading', {
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
  Reading.associate = models => {
    Reading.belongsTo(models.journey, { foreignKey: 'journeyId' })
    Reading.belongsTo(models.user, { foreignKey: 'userId' })
  }

  Reading.sync()
    .then(() => console.log('Reading table created successfully'))
    .catch(err => console.log('Wrong database credentials entered: ', err))

  return Reading
}
