const { getNearBy } = require('./lib/db.api');
const { randomPick, calcDistance } = require('./lib/utils');
const { createPairs, printPairs, byPublicTransport, byParking } = require('./lib/station');

const Berlin = {lat: '52.5200' , lng: '13.4050'};
const Hamburg = {lat: '53.5511' , lng: '9.9937'};

async function main() {
  try {
    const queries = [getNearBy(Berlin), getNearBy(Hamburg)];
    console.log(Date.now())
    let [berlinStations, hamburgStations] = await Promise.all(queries);
    console.log(Date.now())

    berlinStations = berlinStations.filter(byPublicTransport);
    hamburgStations = hamburgStations.filter(byParking);

    const pairs = createPairs(hamburgStations, berlinStations);
    const chosen = randomPick(pairs, 5);
    printPairs(chosen);
    console.log(Date.now())
    
  } catch(e) {
    console.log(e);
  }
}
main();


