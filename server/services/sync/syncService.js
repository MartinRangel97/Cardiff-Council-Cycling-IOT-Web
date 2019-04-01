const database = require('../../database')

exports.syncJourneys = async (userID, journeys) => {
  // Loop through the journeys
  for (let i = 0; i < journeys.length; i++) {
    // Create the journey in the database
    await database.getDatabase().journey.create({
      userId: userID
    }).then((newJourney) => {
      // Set the new journey details
      journeys[i].Synced = true
      journeys[i].RemoteId = newJourney.id
    })
  }
  return journeys
}

exports.syncReadings = async (userID, readings) => {
  // Prepare an array to hold the synced reading IDs
  let syncedReadings = []
  // Loop through the readings
  for (var reading of readings) {
    // Create the reading in the database
    await database.getDatabase().reading.create({
      userId: userID,
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
  return syncedReadings
}
