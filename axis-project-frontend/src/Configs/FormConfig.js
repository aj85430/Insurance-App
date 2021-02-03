import { properties } from "../properties.js";
var request = require("sync-request");

/* Specific to a Product */
export const getFormConfig = (prodID) => {
  /*     return [
        {
            fieldID : "5",
            fieldPosition : "1",
            name: "newfield",
            id: "fullName",
            type: "text",
            label: "Full Name",
            placeholder : "Enter your Full Name",
            htmlType : "input",
            className : "form-control",
            required : "true"
        },
        {
            fieldID : "1",
            fieldPosition : "1",
            name: "fullName",
            id: "fullName",
            type: "text",
            label: "Full Name",
            placeholder : "Enter your Full Name",
            htmlType : "input",
            className : "form-control",
            required : "true"
        },
        {
            fieldID : "2",
            fieldPosition : "1",
            name: "email",
            id: "email",
            type: "text",
            label: "Email Address",
            placeholder : "Enter your email",
            htmlType : "input",
            className : "form-control",
            required : "true"
        },
        {
            fieldID : "3",
            fieldPosition : "1",
            name: "phone",
            id: "phoneNumber",
            type: "number",
            label: "Phone Number",
            placeholder : "Enter your Phone Number",
            htmlType : "input",
            className : "form-control",
            required : "true"
        },
        {
            fieldID : "4",
            fieldPosition : "1",
            name: "submitbtn",
            id: "submitbtn",
            type: "submit",
            htmlType : "input",
            className : "myButton",
            value : "View Quotes"
        },
        {
            label : "Gender" ,
            name: "gender",
            id: "gender",
            className : "form-control",
            htmlType : "select",
            options : ["Male","Female"]
            value: state["phoneNumber"],
            onChange: onChange("phoneNumber"),
        },
        {
            htmlType : "input",
            name: "city",
            id: "email",
            type: "radio",
            label : "City" ,
            radio_label: "Bangalore",
            className : "form-check-input",
            value : "Bangalore"
            value: state["phoneNumber"],
            onChange: onChange("phoneNumber"),
        },
        {
            htmlType : "input",
            name: "city",
            id: "email",
            type: "radio",
            radio_label: "Chennai",
            className : "form-check-input",
            value : "Chennai"
            value: state["phoneNumber"],
            onChange: onChange("phoneNumber"),
        }
    ] */
  /* console.log(prodID) */

  /*var uri = `${properties.backendBaseURI}/forms/${prodID}`*/
  var uri = `/forms/${prodID}`;
  var res = request("GET", uri);
  /* console.log(res.getBody()); */
  return JSON.parse(res.getBody());
};
