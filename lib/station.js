const { calcDistance } = require('./utils');

const createPairs = (origins, destinations) =>
  origins.reduce((pairs, origin) => {
    return destinations.map(destination => ({
        origin: origin.name,
        destination: destination.name,
        distance: calcDistance(origin, destination)
      })).concat(pairs)
  }, [])

const printPairs = pairs => 
  pairs.map(({origin, destination, distance}) => 
  console.log(`${origin} --> ${destination}  ${distance} kilometers`));

// Filters
const byParking = station => station.hasParking;
const byPublicTransport = station => station.hasLocalPublicTransport;

module.exports = {
  createPairs,
  printPairs,
  byParking,
  byPublicTransport
}
