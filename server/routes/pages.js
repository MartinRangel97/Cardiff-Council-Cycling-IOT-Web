var express = require('express')
var router = express.Router()
const withAuth = require('../../config/middleware')

// GET Home Page
router.get('/', function (req, res, next) {
  res.render('home', { title: 'Cardiff Clean Air Project' })
})

// Get App Page
router.get('/app*', withAuth, function (req, res, next) {
  res.render('app', { title: 'Cardiff Clean Air Project' })
})

module.exports = router
