const { getNearBy } = require('./db.api');

const Berlin = {lat: '52.5200' , lng: '13.4050'};
const Hamburg = {lat: '53.5511' , lng: '9.9937'};

const byParking = station => station.hasParking;
const byPublicTransport = station => station.hasLocalPublicTransport;

const shuffle = arr => arr.sort(() => Math.random() - 0.5);

function createPairs(origins, destinations, count) {
 return shuffle(origins.reduce((pairs, origin) => {
    return [...pairs, ...destinations.map(destination => ({
        origin: origin.name,
        destination: destination.name,
        distance: calculateDistance(origin, destination)
      }))]
  }, [])).slice(count)
}

function printPairs(pairs) {
  pairs.map(({origin, destination, distance}) => 
    console.log(`${origin} --> ${destination}  ${distance} kilometers`))
}

async function main() {
  try {
    let [berlinStations, hamburgStations] = 
      await Promise.all([getNearBy(Berlin), getNearBy(Hamburg)]);
    berlinStations = berlinStations.filter(byPublicTransport);
    hamburgStations = hamburgStations.filter(byParking);
    let pairs = createPairs(hamburgStations, berlinStations, 5);
    printPairs(pairs)
    
  } catch(e) {
    console.log(e);
  }
}
main();

function calculateDistance(origin, destination) {

  const {latitude: olat, longitude: olng} = origin.location;
  const {latitude: dlat, longitude: dlng} = destination.location;
  const p = 0.017453292519943295;    // Math.PI / 180
  const c = Math.cos;
  const a = 0.5 - c((dlat - olat) * p)/2 +
          c(olat * p) * c(dlat * p) *
          (1 - c((dlng - olng) * p))/2;

  return Math.trunc(12742 * Math.asin(Math.sqrt(a)), 2); // 2 * R; R = 6371 km
}
