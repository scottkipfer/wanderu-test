const axios = require('axios');

// Deutshebahn Api
const DBAPI_URL = 'https://api.deutschebahn.com/1bahnql/v1/graphql';
const API_KEY = process.env.API_KEY;

const nearByStationsQuery = (lat, lng, count) =>
  `{nearby(latitude: ${lat}, longitude: ${lng}, radius: 2000) {
     stations(count: ${count + 1}) {
       name hasParking hasLocalPublicTransport location{latitude longitude}
   }}}`;

const DBApi = async query => await axios({
  method: 'post',
  headers: {'Authorization': `Bearer ${API_KEY}`},
  url: DBAPI_URL,
  data: {query}
});

const getStationsNear = async ({lat, lng}) => {
  try {
    const query = nearByStationsQuery(lat, lng, 5);
    const resp = await DBApi(query);
    return resp.data.data.nearby.stations;
  } catch(e) {
    throw Error('Unable to get nearby stations.');
  }
};

module.exports = {
  getStationsNear
};
