const request = require("request");
const geocode = (address, callback) => {
  const geocodeURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZ3JlYXRrYW1hbCIsImEiOiJja2kzOXhlbjkxbG5iMnVvYW4wYnZ2d3ZqIn0.ayC24Lq3kJvk2EiF6F2poQ&limit=1";
  request({url: geocodeURL, json: true}, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search.");
    } else {
      const latitude = response.body.features[0].center[1];
      const longitude = response.body.features[0].center[0];
      const location = response.body.features[0].place_name;
      console.log(latitude, longitude, location);
      callback(false, {latitude, longitude, location});
    }
  });
};
module.exports = geocode;
