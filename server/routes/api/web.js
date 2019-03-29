var express = require('express')
var router = express.Router()
const database = require('../../database')
const Serializer = require('sequelize-to-json')
const { Op } = require('sequelize')
var GeoJSON = require('geojson')
const moment = require('moment')
// const moment = require('moment')

// Example Route
router.get('/example', function (req, res, next) {
  res.send({ example: 'JSON' })
})

router.get('/noiseAverage', function (req, res, next) {
  const scheme = {
    include: ['@all'],
    exclude: ['@pk', '@fk'],
    assoc: {
      include: ['dBReading', 'NO2Reading', 'PM10Reading', 'PM25Reading', 'timeTaken', 'longitude', 'latitude']
    }
  }

  var noiseAve = 0

  database.getDatabase().measurement.findAll({
    // TODO add a WHERE condition to get all points in cardiff
  }).then(async function (posts) {
    let postsAsJSON = Serializer.serializeMany(posts, database.getDatabase().measurement, scheme)
    postsAsJSON.forEach((reading) => {
      noiseAve += reading.dBReading
    })
    noiseAve = noiseAve / postsAsJSON.length
    console.log('Hello there')
    res.send(noiseAve.toString())
  })
})

router.get('/measurements', function (req, res, next) {
  // sets a template for the JSON
  const scheme = {
    include: ['@all'],
    exclude: ['@pk', '@fk'],
    assoc: {
      include: ['dBReading', 'NO2Reading', 'PM10Reading', 'PM25Reading', 'timeTaken', 'longitude', 'latitude']
    }
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
    res.send(GeoJSON.parse(postsAsJSON, { Point: ['latitude', 'longitude'], include: ['userId', 'journeyId', 'dBReading', 'NO2Reading', 'PM10Reading', 'PM25Reading', 'timeTaken'] }))
    // res.send(postsAsJSON)
  })
})

module.exports = router
