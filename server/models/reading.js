'use strict'

module.exports = (sequelize, DataTypes) => {
  var Reading = sequelize.define('Reading', {
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

  Reading.sync()
    .then(() => console.log('Reading table created successfully'))
    .catch(err => console.log('Wrong database credentials entered: ', err))

  return Reading
}