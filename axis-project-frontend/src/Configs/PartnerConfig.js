import { properties } from "../properties.js";
var request = require("sync-request");

export const getPartnerConfig = (prodID) => {
  /* return [
        {
            partnerID : "123",
            partnerName : "TATA AIG",
            logoSrc : "https://content.jdmagicbox.com/comp/pune/a1/020pxx20.xx20.121022150412.m9a1/catalogue/tata-aig-general-insurance-company-ltd-akurdi-pune-insurance-companies-2sq5fpasii.jpg?clr=1b2b4b",  
            apiEndpoint : ""
        },
        {
            partnerID : "124",
            partnerName : "TATA AIG",
            logoSrc : "https://content.jdmagicbox.com/comp/pune/a1/020pxx20.xx20.121022150412.m9a1/catalogue/tata-aig-general-insurance-company-ltd-akurdi-pune-insurance-companies-2sq5fpasii.jpg?clr=1b2b4b",  
            apiEndpoint : ""
        }
    ] */

  /*var uri = `${properties.backendBaseURI}/partners/${prodID}`*/
  var uri = `/partners/${prodID}`;
  var res = request("GET", uri);
  /* console.log(res.getBody()); */
  return JSON.parse(res.getBody());
};
