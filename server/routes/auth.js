var express = require('express')
var router = express.Router()

// Models
const User = require('../models/User')
// const UserSession = require('../models/UserSession')

/*
* Sign up
*/
router.post('/signup', (req, res, next) => {
  const { body } = req
  let { email } = body
  const { password } = body

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

  User.findOne({
    where: {
      email: email
    }
  }).then(user => { // then get the user (which sequelize sends)
    if (user) { // if user is null or undefined (will send null if your query matches nothing)
      throw new Error('Email address is already taken') // throw an error within the scope of the
      // sequelize promise (goes to line 49)
    } else {
      const newUser = new User() // otherwise create a new user, same as your old code
      newUser.email = email
      newUser.password = password
      newUser.save()
        .then(res.json(newUser))
    }
  }).catch(err => { // catch all errors thrown witihn the scope of the findOne call
    res.send({
      success: false,
      message: `Error: ${err.message}` // print the error message
    })
  })
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
