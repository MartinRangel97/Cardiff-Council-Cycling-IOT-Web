var express = require('express')
var router = express.Router()

// Example Route
router.get('/example', function (req, res, next) {
  res.send({ example: 'JSON' })
})

router.post('/sync/journeys', (req, res, next) => {
  // Get the journeys from the request body
  let journeys = req.body
  // Loop through the journeys, getting changing the sync status and setting the remoteId
  for (let i = 0; i < journeys.length; i++) {
    journeys[i].Synced = true
  }
  // Return the new journeys
  res.send(journeys)
})

module.exports = router
