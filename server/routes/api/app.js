const express = require('express')
const router = express.Router()

const syncService = require('../../services/sync/syncService')

router.post('/sync/journeys', async (req, res, next) => {
  // Sync and return the new journeys
  let syncedJourneys = await syncService.syncJourneys(req.userID, req.body.journeys)
  res.send({ 'journeys': syncedJourneys })
})

router.post('/sync/readings', async (req, res, next) => {
  // Sync and return the new journeys
  let syncedReadings = await syncService.syncReadings(req.userID, req.body.readings)
  res.send({ 'readings': syncedReadings })
})

module.exports = router
