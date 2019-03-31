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
      .withMessage('Must contain 1 lowercase, 1 uppercase, 1 number and 1 special character')
  ],
  (req, res) => {
    // if there is an error in the validation process it sends a 422
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    // authentication  services checks the email is availble and will create the account with a hashed password
    console.log(req.body)
    authenicationService.createUser(req.body.email, req.body.password)
      .then(user => {
        // Get the token and send it to the client
        const payload = { id: user.id }
        const token = jwt.sign(payload, keys.secretOrKey)
        res.status(200)
          .json({ token: token, msg: 'Account Created' })
          .cookie('token', token, { httpOnly: true })
          .send()
      })
      .catch((error) => {
        res.status(400).json({ msg: error.toString() }).send()
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
      return res.status(404).json({ emailnotfound: 'Email not found' }).send()
    }
    // Check password
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          // Get the token and send it to the client
          const payload = { id: user.id }
          const token = jwt.sign(payload, keys.secretOrKey)
          res.status(200)
            .json({ token: token })
            .cookie('token', token, { httpOnly: true })
            .send()
        } else {
          res.status(401).json({ msg: 'Incorrect Password' }).send()
        }
      })
      .catch(() => {
        res.status(401).json({ msg: 'Incorrect Password' }).send()
      })
  })
})

module.exports = router
