import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button'
import store from '../store'
import { getEndPointConfig } from '../Configs/endPointConfig';

var request = require('sync-request');
class QuoteComponent extends Component {

  state = {
    quoteData: {},
    renderData: true
  }

  componentDidMount() {
    this.setState({
      quoteData: this.getQuote(),
      renderData: false
    })
  }

  /* Data From Mock API/MountBank by hitting the end point at {this.props.config.apiEndpoint} with partnerID*/
  getQuote = () => {
    /* return (
        {
            price : "5000.00",
            description : "Accidental Damage Cover"
        }
    ) */


    //var endPointBody = JSON.parse(request('GET', `http://localhost:9000/endPoints/${this.props.productID}/${this.props.config.partnerID}`).getBody());
    var endPointBody = getEndPointConfig(this.props.productID,this.props.config.partnerID);
    var formData = store.getState().form
    var mapFormData = {}
    Object.keys(endPointBody.apiSignature).map(function (keyName, keyIndex) {
      // use keyName to get current key's name
      // and a[keyName] to get its value
      if (endPointBody.apiSignature[keyName] !== undefined) {
        mapFormData = {
          ...mapFormData,
          [keyName]: formData[endPointBody.apiSignature[keyName]],
        }
      }
    }
    )
    console.log(mapFormData)
    var quoteBody = JSON.parse(request(endPointBody.apiMethod, endPointBody.apiEndpoint, {
      body: mapFormData,
    }).getBody());
    console.log(endPointBody, quoteBody);
    if (this.props.setquotePremium !== undefined) {
      this.props.setquotePremium(this.props.config.partnerID, quoteBody[0]["Premium"])
    }
    return quoteBody
  }

  render() {
    /* console.log(store.getState()) */
    /* console.log(this.state.quoteData[0]) */
    return (
      <div>
        {
          this.state.renderData ?
            <h5>Loading...</h5>
            :

            (<div className="container my-2">
              <div className="card flex-row flex-wrap quotecard" style={{ width: '64rem', border: "2px solid purple" }}>
                <div className="card-header">
                  <img src={this.props.config.logoSrc} style={{ width: "200px", height: "200px" }} alt="" />
                </div>
                <div className="card-block px-4">
                  <br />
                  <h4 className="card-title">₹{this.state.quoteData[0]["Premium"]}</h4>
                  <h5 className="card-title">IDV ₹{this.state.quoteData[0]["IDV"]}</h5>
                  <br />
                </div>
                <div className="card-block px-4">
                  <br />
                  <h5 className="card-text">Features</h5>
                  <p className="card-text">Third Party Cover <br />
                          24*7 spot assistance <br />
                          No Claim Bonus Protector
                         </p>
                </div>
                <div className="card-block px-4">
                  <br></br>
                  <h5 className="card-text">Highlights</h5>
                  <p className="card-text">  Free Pickup and Drop<br />
                          Zero Paper Claims <br />
                          Spot Claims upto ₹20000<br />
                  </p>
                </div>
                <div className="card-block px-4">
                  <br /><br /><br />
                  <a href="#" className="btn btn-primary" style={{ "background-color": "#ae275f" }}>Buy Now</a>
                </div>
              </div>
            </div>)
        }
      </div>
    );
  }
}

export default QuoteComponent