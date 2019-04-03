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
        userId: 1
      }
    }).then((reading) => {
      let readingsJSON = Serializer.serializeMany(reading, database.getDatabase().reading, readingScheme)
      if (readingsJSON.length > 0) {
        try {
          res.send(readingsJSON)
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


    let no2 = []
    let pm10 = []
    let pm25 = []
    let dB = []
    let date =[]
  
    let listReadings = {
      dB: dB, 
      pm10: pm10, 
      pm25: pm25, 
      no2: no2,
      date: date
    }

  database.getDatabase().reading.findAll({
    attributes:[
      ['PM25Reading', 'PM25Reading'],
      ['NO2Reading', 'NO2Reading'],
      ['PM10Reading', 'PM10Reading'],
      ['dBReading', 'dBReading'],
      ['timeTaken', 'timeTaken']
    ],
    where: {
      userId: 1,
    }
  }).then((reading) => {
    let readingsJSON = Serializer.serializeMany(reading, database.getDatabase().reading, readingScheme)
    // readingsJSON.forEach((reading) => {
    //   no2.push(reading.NO2Reading)
    //   pm10.push(reading.PM10Reading)
    //   pm25.push(reading.PM25Reading)
    //   dB.push(reading.dBReading)
    // })

    for (var i = 0; i < 100; i++) {
      no2.push(readingsJSON[i].NO2Reading.toFixed(0))
      pm10.push(readingsJSON[i].PM10Reading.toFixed(0))
      pm25.push(readingsJSON[i].PM25Reading.toFixed(0))
      dB.push(readingsJSON[i].dBReading.toFixed(0))
      date.push(readingsJSON[i].timeTaken)
    }

    // res.attachment('export.csv')
    if (readingsJSON.length > 0) {
      try {
        res.send(listReadings)
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
          res.send(readingsJSON.dBReading.toString())
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
