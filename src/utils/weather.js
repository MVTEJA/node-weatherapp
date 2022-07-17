const request = require("request");

const weather1 = (data1, callback1) => {
  const url =
    "http://api.weatherstack.com/current?access_key=dbdc90304ad3d087f5bfedad998ad90a&query=" +
    data1.latitude +
    "," +
    data1.longitude;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback1("Cannot connect to network", undefined);
    } else if (response.body.error) {
      callback1("Unable to find location", undefined);
    } else {
      callback1(
        undefined,
        "It is currently " +
          response.body.current.temperature +
          " degrees out but it feels like " +
          response.body.current.feelslike +
          " degrees out"
      );
    }
  });
};

// weather1({ latitude: 15.454051, longitude: 75.006652 }, (t1, t2) => {
//   if (t1) {
//     console.log(t1);
//   } else {
//     console.log(t2);
//   }
// });

module.exports = weather1;
