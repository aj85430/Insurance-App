import React, { Component } from "react";
import data from "./data.json";

import "./SearchFilter.css";

class SearchFilter extends Component {
  state = {
    itemsToDisplay: [],
    itemsToUse: [],
    partners: [],
  };
  render() {
    return (
      <div>
        <div className="restfilter">
          <div>
            Choose a partner : &nbsp;
            <select id="restfilter" onChange={this.optionSelected}>
              <option value="any">Choose Any</option>
              {this.state.partners.map((partner) => {
                return <option value={partner}>{partner}</option>;
              })}
            </select>
          </div>
          <div>
            Sort by : &nbsp;
            <select id="sortfilter" onChange={this.sortBy}>
              <option value="any">Select</option>
              <option value="asc">Price: Low to High</option>
              <option value="des">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="restcontainer">
          {this.state.itemsToDisplay.map((rest) => {
            let partner = rest["Partner"];
            return (
              <div className="rest">
                <div className="restinfo">
                  <i
                    className="fas fa-map-marker"
                    style={{ color: "orangered", fontSize: "12px" }}
                  ></i>
                  &nbsp;
                  <span className="restcity">{rest["Partner"]}</span>
                  <br />
                  <span className="restname">{rest["Price"]}</span>
                  <div className="restpartners">
                    <div pill className="restpartner" variant="light">
                      {partner}
                    </div>
                  </div>
                </div>
                <div className="sepline"></div>
                <div className="reststats">
                  <div>
                    <i style={{ fontSize: "15px" }} className="far fa-star"></i>
                    &nbsp;
                    {rest["Rating"]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  filterOnSearch = (event) => {
    if (
      !event.target.value ||
      event.target.value === " " ||
      event.target.value === ""
    )
      this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
    else {
      let itemsToDisplay = [];
      itemsToDisplay = this.state.itemsToUse.filter((item) =>
        item["Partner"].toLowerCase().includes(event.target.value.toLowerCase())
      );
      this.setState({ itemsToDisplay });
    }
  };

  optionSelected = () => {
    var e = document.getElementById("restfilter");
    var selected = e.options[e.selectedIndex].text;

    if (selected === "Choose Any")
      this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
    else {
      let itemsToDisplay = [];
      itemsToDisplay = this.state.itemsToUse.filter((item) =>
        item["Partner"].toLowerCase().includes(selected.toLowerCase())
      );
      this.setState({ itemsToDisplay });
    }
  };

  sortBy = () => {
    var e = document.getElementById("sortfilter");
    var selected = e.options[e.selectedIndex].value;

    if (selected === "asc") {
      let itemsToDisplay = [...this.state.itemsToDisplay];
      itemsToDisplay.sort(function (a, b) {
        return a["Price"] - b["Price"];
      });
      this.setState({ itemsToDisplay });
    } else {
      let itemsToDisplay = [...this.state.itemsToDisplay];
      itemsToDisplay.sort(function (a, b) {
        return b["Price"] - a["Price"];
      });
      this.setState({ itemsToDisplay });
    }
  };

  componentDidMount() {
    this.reRenderList();
  }

  reRenderList() {
    var partners = [];
    var itemsToDisplay = [];
    for (var i = 0; i < data.length; i++) {
      itemsToDisplay.push(data[i]);
      partners.push(itemsToDisplay[i].Partner);
      /*data[i]["Partner"]
        .substring(1, data[i]["Partner"].length - 2)
        .split(",")
        .forEach((partner) => {
          let c = partner.substring(1, partner.length - 1);
          c = c.includes("'") ? c.substring(1, c.length) : c;
          if (partners.indexOf(c) < 0) {
            partners.push(c);
          }
        });*/
    }

    this.setState({ partners });

    this.setState({ itemsToDisplay }, () => {
      this.setState({ itemsToUse: [...this.state.itemsToDisplay] });
    });
  }
}

export default SearchFilter;
