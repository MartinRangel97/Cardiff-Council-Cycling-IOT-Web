const express = require('express')
const router = express.Router()

const database = require('../../database')

// Example Route
router.get('/example', function (req, res, next) {
  res.send({ example: 'JSON' })
})

router.post('/sync/journeys', async (req, res, next) => {
  // Get the journeys from the request body
  let journeys = req.body
  // Loop through the journeys
  for (let i = 0; i < journeys.length; i++) {
    // Create the journey in the database
    // TODO: Add the current users ID
    await database.getDatabase().journey.create({
      userId: 1
    }).then((newJourney) => {
      // Set the new journey details
      journeys[i].Synced = true
      journeys[i].RemoteId = newJourney.id
    })
  }
  // Return the new journeys
  res.send(journeys)
})

router.post('/sync/readings', async (req, res, next) => {
  // The app doesn't need a remote ID for readings, so we just return a list of the synced ID's
  // Get the readings from the request body
  let readings = req.body
  // Prepare an array to hold the synced reading IDs
  let syncedReadings = []
  // Loop through the readings
  for (var reading of readings) {
    // Create the reading in the database
    // TODO: Add the current users ID
    await database.getDatabase().reading.create({
      userId: 1,
      journeyId: reading.JourneyRemoteId,
      dBReading: reading.NoiseReading,
      NO2Reading: reading.No2Reading,
      PM10Reading: reading.PM10Reading,
      PM25Reading: reading.PM25Reading,
      timeTaken: reading.TimeTaken,
      longitude: reading.Longitude,
      latitude: reading.Latitude
    }).then(() => {
      syncedReadings.push(reading.id)
    })
  }
  // Return the new journeys
  res.send(syncedReadings)
})

module.exports = router
