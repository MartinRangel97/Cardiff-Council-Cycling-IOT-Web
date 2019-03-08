var express = require('express')
var router = express.Router()

// Example Route
router.get('/login', function (req, res, next) {
  res.send('Ok')
})

module.exports = router
