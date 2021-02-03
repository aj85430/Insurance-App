import { properties } from "../properties.js";
var request = require("sync-request");

export const getEndPointConfig = (productID, partnerID) => {
  /*var uri = `${properties.backendBaseURI}/endPoints/${productID}/${partnerID}`*/
  var uri = `/endPoints/${productID}/${partnerID}`;
  var res = request("GET", uri);
  console.log(res.getBody());
  return JSON.parse(res.getBody());
};
