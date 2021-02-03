import { properties } from "../properties.js";
var request = require("sync-request");

export const getCardConfig = () => {
  /* return [
        {
            productID : "PROD123",
            id: "car insurance",
            title: "Car Insurance",
            text: "Car Insurance provided by Tata AIG",
            imageSrc: "https://image.flaticon.com/icons/png/512/55/55283.png",
            navigationPath : "/car-insurance",
            backgroundImage : "https://i.pinimg.com/736x/01/f9/86/01f986b246dcaf4505405a7bfe0492d2.jpg"
        },
        {
            productID : "PROD124",
            id: "car insurance",
            title: "Bike Insurance",
            text: "Car Insurance provided by Tata AIG",
            imageSrc: "https://image.flaticon.com/icons/png/512/55/55283.png",
            navigationPath : "/bike-insurance",
            backgroundImage : "http://www.yuppee.com/wp-content/uploads/2013/06/cars-for-sale.jpg"
        }
    ] */

  /* axios.get("http://localhost:9000/products").then(
        res => {
            console.log(res.data);
            return res.data;
        }
    ) */

  /* return axios.get("http://localhost:9000/products"); */

  /*var uri = `${properties.backendBaseURI}/products`*/
  var uri = "/products";
  var res = request("GET", uri);
  /* console.log(res.getBody()); */
  return JSON.parse(res.getBody());
};
