const jwt = require('jsonwebtoken')
const keys = require('./keys')
const secret = keys.secretOrKey

const withAuth = function (req, res, next) {
  const token =
  req.body.token ||
  req.query.token ||
  req.headers['x-access-token'] ||
  req.cookie.token

  if (!token) {
    res.status(401).send('Unauthorised: No Token Provided')
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorised: Invalid token')
      } else {
        req.email = decoded.email
        next()
      }
    })
  }
}

module.exports = withAuth
