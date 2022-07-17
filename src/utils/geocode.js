const request = require("request");

const geocode = (address, callback) => {
  const url9 =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibXZ0ZWphIiwiYSI6ImNsNWM5bzJmbTBmbjYzYm1zZmQ4YW9kZzMifQ.9rkPO8Q43z0PH3sSXyspKw";

  request({ url: url9, json: true }, (error, response) => {
    if (error) {
      callback("There is an error in geocode", undefined);
    } else if (response.body.features.length == 0) {
      callback("Unable to find location. Try another Search", undefined);
    } else {
      callback(undefined, {
        latitude: JSON.parse(response.body.features[0].center[1]),
        longitude: JSON.parse(response.body.features[0].center[0]),
        location: response.body.features[0].place_name,
      });
    }
  });
};

// geocode("dharwad", (t1, t2) => {
//   if (t1) {
//     console.log(t1);
//   } else {
//     console.log(t2.latitude);
//     console.log(t2.longitude);
//     console.log(t2.location);
//   }
// });

module.exports = geocode;
