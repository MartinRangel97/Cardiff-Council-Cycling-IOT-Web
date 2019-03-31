var express = require('express')
var router = express.Router()
const database = require('../../database')
const Serializer = require('sequelize-to-json')
const { Op } = require('sequelize')
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

const journeyScheme = {
  include: ['@all'],
  assoc: {
    include: ['startTime', 'endTime']
  }
}

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

/*
   Profile page
*/
// Get all journeys belonging to :userId
router.get('/:userId/journeys/', function (req, res, next) {
  database.getDatabase().journey.findAll({
    where: { userId: req.params.userId }
  }).then(posts => {
    let postsAsJSON = Serializer.serializeMany(posts, database.getDatabase().journey, journeyScheme)
    res.send(postsAsJSON)
  })
})

// Get all measurements of :journeyId belonging to :userId
router.get('/:userId/journeys/:journeyId/measurements', function (req, res, next) {
  database.getDatabase().measurement.findAll({
    where: {
      userId: req.params.userId,
      journeyId: req.params.journeyId
    }
  }).then(posts => {
    let postsAsJSON = Serializer.serializeMany(posts, database.getDatabase().measurement, journeyScheme)
    res.send(postsAsJSON)
  })
})

module.exports = router
