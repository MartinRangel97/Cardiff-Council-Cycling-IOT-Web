const express = require('express')
const router = express.Router()

const syncService = require('../../services/sync/syncService')

// Example Route
router.get('/example', function (req, res, next) {
  res.send({ example: 'JSON' })
})

router.post('/sync/journeys', async (req, res, next) => {
  // Sync and return the new journeys
  // TODO: Add the current users ID
  let syncedJourneys = await syncService.syncJourneys(1, req.body)
  res.send(syncedJourneys)
})

router.post('/sync/readings', async (req, res, next) => {
  // Sync and return the new journeys
  // TODO: Add the current users ID
  let syncedReadings = await syncService.syncReadings(1, req.body)
  res.send(syncedReadings)
})

module.exports = router
