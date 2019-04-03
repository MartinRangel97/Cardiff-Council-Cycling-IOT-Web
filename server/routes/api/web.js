var express = require('express')
var router = express.Router()
const database = require('../../database')
const Serializer = require('sequelize-to-json')
const { parse } = require('json2csv')

router.get('/export', function (req, res, next) {
  const readingScheme = {
    include: ['@all'],
    assoc: {
      include: ['id', 'userId', 'journeyId', 'dBReading', 'NO2Reading', 'PM10Reading', 'PM25Reading', 'timeTaken', 'longitude', 'latitude']
    }
  }
  database.getDatabase().reading.findAll().then((reading) => {
    let readingsJSON = Serializer.serializeMany(reading, database.getDatabase().reading, readingScheme)
    res.attachment('export.csv')
    if (readingsJSON.length > 0) {
      try {
        res.send(parse(readingsJSON))
      } catch (err) {
        console.log(err)
        res.sendStatus(400)
      }
    } else {
      res.send()
    }
  })
})

  router.get('/reading/PM10', function (req, res, next) {
    const readingScheme = {
      include: ['@all'],
      assoc: {
        include: ['PM10Reading']
      }
    }

    database.getDatabase().reading.findAll({
      attributes:[
        ['PM10Reading', 'PM10Reading']
      ],
      where: {
        id: 1,
      }
    }).then((reading) => {
      let readingsJSON = Serializer.serializeMany(reading, database.getDatabase().reading, readingScheme)
      // res.attachment('export.csv')
      if (readingsJSON.length > 0) {
        try {
          res.send(readingsJSON[0].PM10Reading.toString())
          // console.log(parse(readingsJSON))
        } catch (err) {
          console.log(err)
          res.sendStatus(400)
        }
      } else {
        res.send()
      }
    })
  })

  router.get('/reading/PM25', function (req, res, next) {
    const readingScheme = {
      include: ['@all'],
      assoc: {
        include: ['PM25Reading']
      }
    }
  

  database.getDatabase().reading.findAll({
    attributes:[
      ['PM25Reading', 'PM25Reading']
    ],
    where: {
      id: 1,
    }
  }).then((reading) => {
    let readingsJSON = Serializer.serializeMany(reading, database.getDatabase().reading, readingScheme)
    // res.attachment('export.csv')
    if (readingsJSON.length > 0) {
      try {
        res.send(readingsJSON[0].PM25Reading.toString())
        // console.log(parse(readingsJSON))
      } catch (err) {
        console.log(err)
        res.sendStatus(400)
      }
    } else {
      res.send()
    }
  })
})

  

  router.get('/reading/NO2', function (req, res, next) {
    const readingScheme = {
      include: ['@all'],
      assoc: {
        include: ['NO2Reading']
      }
    }

    database.getDatabase().reading.findAll({
      attributes:[
        ['NO2Reading', 'NO2Reading']
      ],
      where: {
        id: 1,
      }
    }).then((reading) => {
      let readingsJSON = Serializer.serializeMany(reading, database.getDatabase().reading, readingScheme)
      // res.attachment('export.csv')
      if (readingsJSON.length > 0) {
        try {
          res.send(readingsJSON[0].NO2Reading.toString())
          // console.log(parse(readingsJSON))
        } catch (err) {
          console.log(err)
          res.sendStatus(400)
        }
      } else {
        res.send()
      }
    })
  })

  router.get('/reading/dB', function (req, res, next) {
    const readingScheme = {
      include: ['@all'],
      assoc: {
        include: ['dBReading']
      }
    }
    database.getDatabase().reading.findAll({
      attributes:[
        ['dBReading', 'dBReading']
      ],
      where: {
        id: 1,
      }
    }).then((reading) => {
      let readingsJSON = Serializer.serializeMany(reading, database.getDatabase().reading, readingScheme)
      // res.attachment('export.csv')
      if (readingsJSON.length > 0) {
        try {
          res.send(readingsJSON[0].dBReading.toString())
          // console.log(parse(readingsJSON))
        } catch (err) {
          console.log(err)
          res.sendStatus(400)
        }
      } else {
        res.send()
      }
    })
    
  }
  )



module.exports = router
