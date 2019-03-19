const passportJWT = require('passport-jwt')

const User = require('../server/models/User')
const keys = require('./keys')

var ExtractJwt = passportJWT.ExtractJwt

var JwtStrategy = passportJWT.Strategy
var jwtOptions = {}
jwtOptions.secretOrKey = keys.secretOrKey

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

module.exports = passport => {
  passport.use(
    new JwtStrategy(jwtOptions, (jwtPayload, next) => {
      console.log('payload recieved', jwtPayload)
      User.findOne({ id: jwtPayload.id })
        .then(user => {
          if (user) {
            next(null, user)
          } else {
            next(null, false)
          }
        })
        .catch(err => console.log(err))
    })
  )
}
