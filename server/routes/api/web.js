var express = require('express')
var router = express.Router()
const database = require('../../database')
const Serializer = require('sequelize-to-json')
const { Op } = require('sequelize')
const Sequelize = require('sequelize')
var GeoJSON = require('geojson') // converts JSON into GEOJSON
const moment = require('moment')

// Example Route
router.get('/example', function (req, res, next) {
  res.send({ example: 'JSON' })
})

// sets a template for the JSON
const scheme = {
  include: ['@all']
  // exclude: ['@pk', '@fk'],
  // assoc: {
  //   include: ['dBReading', 'NO2Reading', 'PM10Reading', 'PM25Reading', 'timeTaken', 'longitude', 'latitude', 'distance']
  // }
}

// gets the averages of the readings within the radius of a location
router.post('/circleAverage', function (req, res, next) {
  var lat = req.body.latitude
  var lon = req.body.longitude
  var rad = req.body.radius

  // store the averages in a JSON
  var averages = {
    dB: 0,
    NO2: 0,
    PM25: 0,
    PM10: 0
  }

  database.getDatabase().measurement.findAll({
    attributes: [
      ['id', 'id'],
      ['dBReading', 'dBReading'],
      ['NO2Reading', 'NO2Reading'],
      ['PM10Reading', 'PM10Reading'],
      ['PM25Reading', 'PM25Reading'],
      [Sequelize.literal('3959 * acos( cos( radians(' + lat + ')) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(' + lon + ') ) + sin( radians(' + lat + ' ) ) * sin(radians(latitude)) )'), 'distance']
    ],
    order: Sequelize.col('distance'),
    logging: console.log,
    having: {
      distance: {
        [Op.lte]: rad
      }
    },
    where: {
      timeTaken: {
        [Op.gte]: moment().subtract(1, 'days').toDate() // filters the records from the last 24 hours
      }
    }

  })
    .then(async function (posts) {
      let postsAsJSON = Serializer.serializeMany(posts, database.getDatabase().measurement, scheme)
      postsAsJSON.forEach((reading) => {
        // stores the sum of all the readings
        averages.dB += reading.dBReading
        averages.NO2 += reading.NO2Reading
        averages.PM10 += reading.PM10Reading
        averages.PM25 += reading.PM25Reading
      })
      if (postsAsJSON.length > 0) {
        // calculate the averages
        averages.dB = averages.dB / postsAsJSON.length
        averages.NO2 = averages.NO2 / postsAsJSON.length
        averages.PM10 = averages.PM10 / postsAsJSON.length
        averages.PM25 = averages.PM25 / postsAsJSON.length
      }
      res.send(averages)
    })
})

// Averages for decibel readings
router.get('/noiseAverage', function (req, res, next) {
  var noiseAve = 0

  database.getDatabase().measurement.findAll({
    where: {
      timeTaken: {
        [Op.gte]: moment().subtract(1, 'days').toDate() // filters the records from the last 24 hours
      }
    }
  }).then(async function (posts) {
    let postsAsJSON = Serializer.serializeMany(posts, database.getDatabase().measurement, scheme)
    postsAsJSON.forEach((reading) => {
      noiseAve += reading.dBReading
    })
    noiseAve = noiseAve / postsAsJSON.length
    res.send(noiseAve.toString())
  })
})

// Averages for all NO2 readings
router.get('/NO2Average', function (req, res, next) {
  var NO2Ave = 0

  database.getDatabase().measurement.findAll({
    where: {
      timeTaken: {
        [Op.gte]: moment().subtract(1, 'days').toDate() // filters the records from the last 24 hours
      }
    }
  }).then(async function (posts) {
    let postsAsJSON = Serializer.serializeMany(posts, database.getDatabase().measurement, scheme)
    postsAsJSON.forEach((reading) => {
      NO2Ave += reading.NO2Reading
    })
    NO2Ave = NO2Ave / postsAsJSON.length
    res.send(NO2Ave.toString())
  })
})

// Averages for all PM10 readings
router.get('/PM10Average', function (req, res, next) {
  var PM10Ave = 0

  database.getDatabase().measurement.findAll({
    where: {
      timeTaken: {
        [Op.gte]: moment().subtract(1, 'days').toDate() // filters the records from the last 24 hours
      }
    }
  }).then(async function (posts) {
    let postsAsJSON = Serializer.serializeMany(posts, database.getDatabase().measurement, scheme)
    postsAsJSON.forEach((reading) => {
      PM10Ave += reading.PM10Reading
    })
    PM10Ave = PM10Ave / postsAsJSON.length
    res.send(PM10Ave.toString())
  })
})

// Averages for PM2.5 readings
router.get('/PM25Average', function (req, res, next) {
  var PM25Ave = 0

  database.getDatabase().measurement.findAll({
    where: {
      timeTaken: {
        [Op.gte]: moment().subtract(1, 'days').toDate() // filters the records from the last 24 hours
      }
    }
  }).then(async function (posts) {
    let postsAsJSON = Serializer.serializeMany(posts, database.getDatabase().measurement, scheme)
    postsAsJSON.forEach((reading) => {
      PM25Ave += reading.PM25Reading
    })
    PM25Ave = PM25Ave / postsAsJSON.length
    res.send(PM25Ave.toString())
  })
})

router.get('/allReadings', function (req, res, next) {
  database.getDatabase().measurement.findAll({
    where: {
      timeTaken: {
        [Op.gte]: moment().subtract(1, 'days').toDate() // filters the records from the last 24 hours
      }
    }
  }).then(async function (posts) {
    let postsAsJSON = Serializer.serializeMany(posts, database.getDatabase().measurement, scheme)
    res.send(GeoJSON.parse(postsAsJSON, { Point: ['latitude', 'longitude'], include: ['userId', 'journeyId', 'dBReading', 'NO2Reading', 'PM10Reading', 'PM25Reading', 'timeTaken'] }))
  })
})

module.exports = router
