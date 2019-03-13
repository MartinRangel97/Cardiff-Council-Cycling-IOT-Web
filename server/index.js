#!/usr/bin/env node

const express = require('express')
const http = require('http')
const path = require('path')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

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
}

// MySQL Connection Setup
// database.connect(config.host, config.user, config.password, config.database)

database.authenticate()
  .then(() => console.log('Database Connected...'))
  .catch(err => console.log('Error: ' + err))

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Processors
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

// Routes
app.use('/', pagesRouter)
app.use('/auth', authRouter)
app.use('/api/app', appApiRouter)
app.use('/api/web', webApiRouter)

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
