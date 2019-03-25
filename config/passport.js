const passportJWT = require('passport-jwt')

const database = require('../server/database')
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
      database.getDatabase().user.findOne({ id: jwtPayload.id })
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
