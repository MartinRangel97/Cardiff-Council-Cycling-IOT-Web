var express = require('express')
var router = express.Router()

// Models
const User = require('../models/User')
const UserSession = require('../models/UserSession')

/*
* Sign up
*/
// router.post('/signup', (req, res, next) => {

// })

/*
* Login
*/
router.get('/login', (req, res, next) => {
  User.findAll()
    .then(user => {
      console.log(user)
      res.sendStatus(200)
    })
    .catch(err => console.log(err))
})

/*
* Verify User
*/
// router.get('/verify', (req, res, next) => {

// })

/*
* Logout
*/
// router.get('/logout', (req, res, next) => {

// })

module.exports = router
