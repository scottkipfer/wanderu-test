const { getStationsNear } = require('./lib/DBApi');
const { randomPick } = require('./lib/utils');
const { createStationPairs, printPairs, byPublicTransport, byParking } = require('./lib/station');

const Berlin = {lat: '52.5200' , lng: '13.4050'};
const Hamburg = {lat: '53.5511' , lng: '9.9937'};

async function main() {
  try {
    const queries = [getStationsNear(Berlin), getStationsNear(Hamburg)];
    let [berlinStations, hamburgStations] = await Promise.all(queries);

    berlinStations = berlinStations.filter(byPublicTransport);
    hamburgStations = hamburgStations.filter(byParking);

    const pairs = createStationPairs(hamburgStations, berlinStations);
    const chosen = randomPick(pairs, 5);
    printPairs(chosen);

  } catch(e) {
    console.log(e);
  }
}
main();

