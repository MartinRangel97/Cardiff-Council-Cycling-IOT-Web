var express = require('express')
var router = express.Router()
const database = require('../../database')
const Serializer = require('sequelize-to-json')

// Example Route
router.get('/example', function (req, res, next) {
  res.send({ example: 'JSON' })
})

router.get('/user', function (req, res, next) {
  const scheme = {
    include: ['@all'],
    assoc: {
      include: ['id', 'email', 'password', 'shareReadings']
    }
  }
  database.getDatabase().measurement.findAll().then(function (posts) {
    let postsAsJSON = Serializer.serializeMany(posts, database.getDatabase().user, scheme)
    res.send(postsAsJSON)
  })
}),

router.get('/journey', function (req, res, next) {
  const scheme = {
    include: ['@all'],
    exclude: ['@pk', '@fk'],
    assoc: {
      include: ['id', 'userId', 'startTime', 'endTime', 'timeTaken']
    }
  }
  database.getDatabase().measurement.findAll().then(function (posts) {
    let postsAsJSON = Serializer.serializeMany(posts, database.getDatabase().journey, scheme)
    res.send(postsAsJSON)
  })
}),

router.get('/measurements', function (req, res, next) {
  const scheme = {
    include: ['@all'],
    exclude: ['@pk', '@fk'],
    assoc: {
      include: ['dBReading', 'NO2Reading', 'PM10Reading', 'PM25Reading', 'timeTaken', 'longitude', 'latitude']
    }
  }

  database.getDatabase().measurement.findAll().then(function (posts) {
    let postsAsJSON = Serializer.serializeMany(posts, database.getDatabase().measurement, scheme)
    res.send(postsAsJSON)
  })



router.get('/')
})

module.exports = router
