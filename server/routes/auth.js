var express = require('express')
var router = express.Router()

// Models
const User = require('../models/User')

// Queries
// const createUser = async ({ email, password, shareReadings }) => {
//   return User.create({ email, password, shareReadings })
// }

// const getAllUsers = async () => {
//   return User.findAll()
// }

/*
* Sign up
*/
router.post('/signup', (req, res, next) => {
  const { email, password } = req.body

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
        .then(res.json({ newUser, message: 'Account Created Successfully' }))
    }
  }).catch(err => { // catch all errors thrown witihn the scope of the findOne call
    res.send({
      success: false,
      message: `Error: ${err.message}` // print the error message
    })
  })
})

/*
* Logout
*/
// router.get('/logout', (req, res, next) => {

// })

module.exports = router
