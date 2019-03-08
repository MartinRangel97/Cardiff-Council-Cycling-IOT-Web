var express = require('express')
var router = express.Router()

// Example Route
router.get('/example', function (req, res, next) {
  res.send({ example: 'JSON' })
})

module.exports = router
