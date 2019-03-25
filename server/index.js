#!/usr/bin/env node

const express = require('express')
const http = require('http')
const path = require('path')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const expressStaticGzip = require('express-static-gzip')

// Database
const database = require('./database')

// Routers
const pagesRouter = require('./routes/pages')
const authRouter = require('./routes/auth')
const appApiRouter = require('./routes/api/app')
const webApiRouter = require('./routes/api/web')

// Prepare express
const app = express()
const server = http.Server(app)

async function startServer () {
  // Get the config
  let config
  try {
    if (fs.existsSync('./config/app.conf')) {
      console.log('Using custom configuration.')
      config = JSON.parse(fs.readFileSync('./config/app.conf'))
    } else {
      console.log('No app.conf file found. Using the default configuration.')
      config = JSON.parse(fs.readFileSync('./config/default.conf'))
    }
  } catch (e) {
    console.log(new Error('Unable to read the configuration file, the JSON may be invalid.'))
    process.exit(1)
  }
  // MySQL Connection Setup
  await database.configure(config.mysql.host, config.mysql.user, config.mysql.password, config.mysql.database)
  await database.getDatabase().sequelize.sync()

  // View engine setup
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'pug')

  // Processors
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use('/', expressStaticGzip(path.join(__dirname, '../public'), { index: false }))

  // Pasport Middleware
  app.use(passport.initialize())

  // Passport config
  require('../config/passport')(passport)

  // Routes
  app.use('/', pagesRouter)
  app.use('/auth', authRouter)
  app.use('/api/app', appApiRouter)
  app.use('/api/web', webApiRouter)

  // Listen
  server.listen(config.server.port)
  server.on('listening', () => console.log('Example app listening on port ' + config.server.port + ''))
  server.on('error', (error) => {
    // Check if the error was a listening error
    if (error.syscall !== 'listen') {
      throw error
    }
    // Handle common error codes
    switch (error.code) {
      case 'EACCES':
        console.error('Port ' + config.server.port + ' requires elevated privileges')
        process.exit(1)
      case 'EADDRINUSE':
        console.error('Port ' + config.server.port + ' is already in use')
        process.exit(1)
      default:
        throw error
    }
  })
}

// Fire up those engines boys
startServer()
