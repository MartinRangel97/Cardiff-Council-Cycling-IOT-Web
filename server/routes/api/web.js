var express = require('express')
var router = express.Router()
const database = require('../../database')
const Serializer = require('sequelize-to-json')
const { parse } = require('json2csv')

router.get('/export', function (req, res, next) {
  const measurementsScheme = {
    include: ['@all'],
    assoc: {
      include: ['id', 'userId', 'journeyId', 'dBReading', 'NO2Reading', 'PM10Reading', 'PM25Reading', 'timeTaken', 'longitude', 'latitude']
    }
  }
  database.getDatabase().measurement.findAll().then((measurements) => {
    let measurementsJSON = Serializer.serializeMany(measurements, database.getDatabase().measurement, measurementsScheme)
    try {
      res.attachment('export.csv')
      res.send(parse(measurementsJSON))
    } catch (err) {
      console.log(err)
      res.sendStatus(400)
    }
  })
})

module.exports = router
