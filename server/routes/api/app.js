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

module.exports = router
