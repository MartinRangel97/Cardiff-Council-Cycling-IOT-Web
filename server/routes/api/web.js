var express = require('express')
var router = express.Router()
const database = require('../../database')
const Serializer = require('sequelize-to-json')
const { Op, sequelize } = require('sequelize')
var GeoJSON = require('geojson')
const moment = require('moment')

// Example Route
router.get('/example', function (req, res, next) {
  res.send({ example: 'JSON' })
})

// sets a template for the JSON
const scheme = {
  include: ['@all'],
  exclude: ['@pk', '@fk'],
  assoc: {
    include: ['dBReading', 'NO2Reading', 'PM10Reading', 'PM25Reading', 'timeTaken', 'longitude', 'latitude']
  }
}

// function to calculate the distance between two points
function distance (lat1, lon1, lat2, lon2) {
  // var R = 3959 // radius of the Earth in miles
  var radlat1 = Math.PI * lat1 / 180
  var radlat2 = Math.PI * lat2 / 180
  var theta = lon1 - lon2
  var radtheta = Math.PI * theta / 180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  if (dist > 1) {
    dist = 1
  }
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515 // calculate the distance in miles
  return dist
}

router.post('/test', function (req, res, next) {
  var test = req.body.test

  res.send(test)
})

router.post('/circleAverage', function (req, res, next) {
  var lat = req.body.latitude
  var lon = req.body.longitude
  var rad = req.body.radius

  var count = 0

  var averages = {
    dB: 0,
    NO2: 0,
    PM25: 0,
    PM10: 0
  }

  database.getDatabase().measurement.findAll({
    where: {
      timeTaken: {
        [Op.gte]: moment().subtract(1, 'days').toDate() // filters the records from the last 24 hours
      }
    },
    orderBy: [['timeTaken', 'DESC']]
  }).then(async function (posts) {
    let postsAsJSON = Serializer.serializeMany(posts, database.getDatabase().measurement, scheme)
    postsAsJSON.forEach((reading) => {
      if (distance(lat, lon, reading.latitude, reading.longitude) <= rad) {
        count++
        averages.dB += reading.dBReading
        averages.NO2 += reading.NO2Reading
        averages.PM10 += reading.PM10Reading
        averages.PM25 += reading.PM25Reading
      }
    })
    console.log(averages)
    console.log(count)
    averages.dB = averages.dB / count
    averages.NO2 = averages.NO2 / count
    averages.PM10 = averages.PM10 / count
    averages.PM25 = averages.PM25 / count
    res.send(averages)
  })
})

// Averages for decibel readings
router.get('/noiseAverage', function (req, res, next) {
  var noiseAve = 0

  database.getDatabase().measurement.findAll({
    // TODO add a WHERE condition to get all points in the last 24 hrs
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
    // TODO add a WHERE condition to get all points
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
    // TODO add a WHERE condition to get all points
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
    // TODO add a WHERE condition to get all points
  }).then(async function (posts) {
    let postsAsJSON = Serializer.serializeMany(posts, database.getDatabase().measurement, scheme)
    postsAsJSON.forEach((reading) => {
      PM25Ave += reading.PM25Reading
    })
    PM25Ave = PM25Ave / postsAsJSON.length
    res.send(PM25Ave.toString())
  })
})

router.get('/measurements', function (req, res, next) {
  // sets a template for the JSON
  database.getDatabase().measurement.findAll({
    where: {
      timeTaken: {
        [Op.gte]: moment().subtract(1, 'days').toDate() // filters the records from the last 24 hours
      }
    },
    orderBy: [['timeTaken', 'DESC']]
  }).then(async function (posts) {
    let postsAsJSON = Serializer.serializeMany(posts, database.getDatabase().measurement, scheme)
    res.send(GeoJSON.parse(postsAsJSON, { Point: ['latitude', 'longitude'], include: ['userId', 'journeyId', 'dBReading', 'NO2Reading', 'PM10Reading', 'PM25Reading', 'timeTaken'] }))
    // res.send(postsAsJSON)
  })
})

module.exports = router
