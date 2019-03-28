var express = require('express')
var router = express.Router()

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
},

router.get('/journey', function (req, res, next) {
  const scheme = {
    include: ['@all'],
    assoc: {
      include: ['id', 'userId', 'startTime', 'endTime', 'timeTaken']
    }
  }

  database.getDatabase().measurement.findAll().then(function (posts) {
    let postsAsJSON = Serializer.serializeMany(posts, database.getDatabase().measurement, scheme)
    res.send(postsAsJSON)
  })
}))

module.exports = router



router.get('/')

module.exports = router
