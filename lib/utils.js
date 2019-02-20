function calcDistance(origin, destination) {
  const {latitude: olat, longitude: olng} = origin.location;
  const {latitude: dlat, longitude: dlng} = destination.location;
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a = 0.5 - c((dlat - olat) * p)/2 +
          c(olat * p) * c(dlat * p) *
          (1 - c((dlng - olng) * p))/2;
  return Math.trunc(12742 * Math.asin(Math.sqrt(a)), 2);
}

const randomPick = (arr, count) => 
  arr.sort(() => Math.random() - 0.5).slice(count);

module.exports = {
  calcDistance,
  randomPick
};
