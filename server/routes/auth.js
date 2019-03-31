const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

// Service
const authenicationService = require('../services/authenticationService')

// Jwt Token and keys
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

// Database
const database = require('../database')

// Express Validation
const { check, validationResult } = require('express-validator/check')

/*
* Sign up
*/
router.post('/signup',
  [
    // checks that the users email is in an email format
    check('email')
      .isEmail()
      .withMessage('Must be an email. E.g: example@example.com'),
    // checks that the users password is using the correct password convetions
    check('password')
      .isLength({ min: 8 })
      .withMessage('Must be a minimum of 8 characters')
      .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&?*]{8,16}$/)
      .withMessage('Must contain 1 lowercase, 1 uppercase, and 1 number')
  ],
  (req, res) => {
    // if there is an error in the validation process it sends a 422
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).send({ errors: errors.array() })
    }
    // authentication  services checks the email is availble and will create the account with a hashed password
    authenicationService.createUser(req.body.email, req.body.password)
      .then(user => {
        // Get the token and send it to the client
        const payload = { id: user.id }
        const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 2592000 }) // 30 days (seconds)
        const expiryDate = new Date(Number(new Date()) + 2592000000) // expires the cookie in 30 days (miliseconds)
        res.status(200)
          .cookie('token', token, { expires: expiryDate, httpOnly: true })
          .send({ token: token })
      })
      .catch((error) => {
        console.log('ERROR ', error)
        res.status(400).send({ msg: error.toString() })
      })
  })

/*
* Login
*/
router.post('/login', async function (req, res) {
  const { email, password } = req.body
  database.getDatabase().user.findOne({
    where: {
      email: email
    }
  }).then(user => {
  // Check if user exists
    if (!user) {
      return res.status(404).send({ emailnotfound: 'Email not found' })
    }
    // Check password
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          // Get the token and send it to the client
          const payload = { id: user.id }
          const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 2592000 }) // 30 days (seconds)
          const expiryDate = new Date(Number(new Date()) + 2592000000) // expires the cookie in 30 days (miliseconds)
          res.status(200)
            .cookie('token', token, { expires: expiryDate, httpOnly: true })
            .send({ token: token })
        } else {
          res.status(401).send({ msg: 'Incorrect Password' })
        }
      })
      .catch(() => {
        res.status(401).send({ msg: 'Incorrect Password' })
      })
  })
})

module.exports = router
