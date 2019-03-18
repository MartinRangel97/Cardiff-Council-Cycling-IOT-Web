#!/usr/bin/env node

const express = require('express')
const http = require('http')
const path = require('path')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportJWT = require('passport-jwt')
var jwt = require('jsonwebtoken')

// Database
const database = require('./database')

// Models
const User = require('./models/User')

// Queries
const getUser = async obj => {
  return User.findOne({
    where: obj
  })
}

// Routers
const pagesRouter = require('./routes/pages')
const authRouter = require('./routes/auth')
const appApiRouter = require('./routes/api/app')
const webApiRouter = require('./routes/api/web')

// Prepare express
const app = express()
const server = http.Server(app)

// Get the config
var config
try {
  if (fs.existsSync('./config/app.conf')) {
    console.log('Using custom configuration.')
    config = JSON.parse(fs.readFileSync('./config/app.conf'))
  } else {
    console.log('No app.conf file found. Using the default configuration.')
    config = JSON.parse(fs.readFileSync('./config/default.conf'))
  }
} catch (e) {
  console.log('Unable to read the configuration file, the JSON may be invalid.')
  process.exit(1)
// }

// MySQL Connection Setup
database.connect(config.host, config.user, config.password, config.database)
  .then(() => console.log('Database Connected...'))
  .catch(err => console.log('Error: ' + err))

var ExtractJwt = passportJWT.ExtractJwt

var JwtStrategy = passportJWT.Strategy
var jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = 'wowwow'

var strategy = new JwtStrategy(jwtOptions, function (jwtPayload, next) {
  console.log('payload recieved', jwtPayload)
  var user = getUser({ id: jwtPayload.id })
  if (user) {
    next(null, user)
  } else {
    next(null, false)
  }
})
passport.use(strategy)

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Processors
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use(passport.initialize())

// Routes
app.use('/', pagesRouter)
app.use('/auth', authRouter)
app.use('/api/app', appApiRouter)
app.use('/api/web', webApiRouter)

/*
* Login
*/
app.post('/login', async function (req, res, next) {
  const { email, password } = req.body
  if (email && password) {
    var user = await getUser({ email })
    if (!user) {
      res.status(401).json({ msg: 'No such user found', user })
    }
    if (user.password === password) {
      var payload = { id: user.id }
      var token = jwt.sign(payload, jwtOptions.secretOrKey)
      res.json({ msg: 'ok', token: token })
    } else {
      res.status(401).json({ msg: 'Password is incorrect' })
    }
  }
})

app.get('/protected', passport.authenticate('jwt', { session: false }), function (req, res) {
  res.json({ msg: 'Authorized User' })
})

// Listen
server.listen(3000)
server.on('listening', () => console.log('Example app listening on port 3000'))
server.on('error', (error) => {
  // Check if the error was a listening error
  if (error.syscall !== 'listen') {
    throw error
  }
  // Handle common error codes
  switch (error.code) {
    case 'EACCES':
      console.error('Port 3000 requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error('Port 3000 is already in use')
      process.exit(1)
    default:
      throw error
  }
})
