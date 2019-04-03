const jwt = require('jsonwebtoken')
const keys = require('../../../config/keys')
const secret = keys.secretOrKey

const withAuth = function (req, res, next) {
  const token =
  req.body.token ||
  req.query.token ||
  req.headers['x-access-token'] ||
  req.cookies.token

  if (!token) {
    res.status(401).send('Unauthorised: No Token Provided')
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorised: Invalid token')
      } else {
        req.userID = decoded.id
        next()
      }
    })
  }
}

module.exports = withAuth
