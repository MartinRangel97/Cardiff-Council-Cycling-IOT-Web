var express = require('express')
var router = express.Router()

// Models
// const User = require('../models/User')
// const UserSession = require('../models/UserSession')

/*
* Sign up
*/
router.post('/signup', (req, res, next) => {
  const { body } = req
  const { password } = body
  let { email } = body

  if (!email) {
    return res.send({
      success: false,
      message: 'Error: Missing email'
    })
  }

  if (!password) {
    return res.send({
      success: false,
      message: 'Error: Missing password'
    })
  }

  email = email.toLowerCase()
})

/*
* Login
*/
// router.get('/login', (req, res, next) => {

// })

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
