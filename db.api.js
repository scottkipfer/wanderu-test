const axios = require('axios');

const API_KEY = 'Your Key Here'
const DBAPI_URL = 'https://api.deutschebahn.com/1bahnql/v1/graphql';
const nearByStationsQuery = (lat, lng, count) => `{ 
     nearby(latitude: ${lat}, longitude: ${lng}, radius: 2000) {
       stations(count: ${count + 1}) {
         name hasParking hasLocalPublicTransport location{latitude longitude}}}}`

const dbApi = async query => await axios({
  method: 'post',
  headers: {'Authorization': `Bearer ${API_KEY}`},
  url: DBAPI_URL,
  data: {query}
});

const getNearBy = async ({lat, lng}) => {
  try {
    const resp = await dbApi(nearByStationsQuery(lat, lng, 5));
    return resp.data.data.nearby.stations;
  } catch(e) {
    throw Error('Unable to get near by stations');
  }
}

module.exports = {
  getNearBy
};
