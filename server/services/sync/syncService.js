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
  // Prepare a arrays to hold the readings and synced reading IDs
  let readingsArray = []
  let syncedReadings = []
  // Loop put the readings into recognisable objects
  for (var reading of readings) {
    readingsArray.push({
      userId: userID,
      journeyId: reading.JourneyRemoteId,
      dBReading: reading.NoiseReading,
      NO2Reading: reading.No2Reading,
      PM10Reading: reading.PM10Reading,
      PM25Reading: reading.PM25Reading,
      timeTaken: reading.TimeTaken,
      longitude: reading.Longitude,
      latitude: reading.Latitude
    })
    syncedReadings.push(reading.id)
  }
  // Create the readings in the database
  await database.getDatabase().reading.bulkCreate(readingsArray)
  return syncedReadings
}
