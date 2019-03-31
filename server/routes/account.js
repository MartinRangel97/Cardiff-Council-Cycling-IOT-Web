var express = require('express')
var router = express.Router()

// Express Validation
const { check, validationResult } = require('express-validator/check')

router.put('/email', [
// checks that the users email is in an email format
  check('email')
    .isEmail()
    .withMessage('Must be an email. E.g: example@example.com')
],
(res, req) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
})

router.put('/password', [
  // checks that the users password is using the correct password convetions
  check('password')
    .isLength({ min: 8 })
    .withMessage('Must be a minimum of 8 characters')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .withMessage('Must contain 1 lowercase, 1 uppercase, 1 number and 1 special character')
],
(res, req) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
})
