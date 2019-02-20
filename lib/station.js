const { calcDistance } = require('./utils');

const createStationPairs = (origins, destinations) =>
  origins.reduce((pairs, origin) =>
    destinations.map(destination => ({
      origin: origin.name,
      destination: destination.name,
      distance: calcDistance(origin, destination)
    })).concat(pairs)
    , []);

const printPairs = pairs => 
  pairs.map(({origin, destination, distance}) => 
    console.log(`${origin} --> ${destination}  ${distance} kilometers`));

// Filters
const byParking = station => station.hasParking;
const byPublicTransport = station => station.hasLocalPublicTransport;

module.exports = {
  createStationPairs,
  printPairs,
  byParking,
  byPublicTransport
};
