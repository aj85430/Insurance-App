export const getCarouselConfig = () => {
  var request = require("sync-request");
  //var res = request("GET", `http://localhost:9000/carousel`);
  var res = request("GET", "/carousel");
  return JSON.parse(res.getBody());
};
