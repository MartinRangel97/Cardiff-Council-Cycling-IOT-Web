var express = require('express')
var router = express.Router()
const database = require('../../database')
const Serializer = require('sequelize-to-json')

// Example Route
router.get('/example', function (req, res, next) {
  res.send({ example: 'JSON' })
})

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
})

module.exports = router
