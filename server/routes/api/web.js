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

  router.get('/measurements/PM10', function (req, res, next) {
    const measurements = {
      include: ['@all'],
      assoc: {
        include: ['PM10Reading']
      }
    }

    database.getDatabase().measurement.findAll().then((measurements) => {
      let measurementsJSON = Serializer.serializeMany(measurements, database.getDatabase().measurement, measurementsScheme)
      try {
        res.send(parse(measurementsJSON))
      } catch (err) {
        console.log(err)
        res.sendStatus(400)
      }
    })
  }
  )

  router.get('/measurements/PM25', function (req, res, next) {
    const measurements = {
      include: ['@all'],
      assoc: {
        include: ['PM25Reading']
      }
    }
  }
  )

  router.get('/measurements/NO2', function (req, res, next) {
    const measurements = {
      include: ['@all'],
      assoc: {
        include: ['NO2Reading']
      }
    }
  }
  )

  router.get('/measurements/dB', function (req, res, next) {
    const measurements = {
      include: ['@all'],
      assoc: {
        include: ['DBReading']
      }
    }
  }
  )



module.exports = router
