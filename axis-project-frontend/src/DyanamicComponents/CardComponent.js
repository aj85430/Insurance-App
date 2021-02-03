import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'
import ReactDynamicImport from "react-dynamic-import";

/* import imagelogo from `../images/${this.props.config.imageSrc}` */
/* import imagelogo from (this.props.config.imageSrc); */

class CardComponent extends Component {

    componentDidMount = ()=>{
        console.log(this.props.config.title)
    }

    render() {
        /* import imagelogo from '../images/healthlogo.png' */
        /* const imagelogo = require('./../images/healthlogo.png') */
        /* const loader = () => import(`../images/${this.props.config.imageSrc}`); */
        const loader = () => import(`../images/healthlogo.png`);
        const imagelogo = ReactDynamicImport({ loader });
        return (
                <div key={this.props.config.id} className="card col-md-2 mx-3 productcard" onClick={()=>{ this.props.history.push(this.props.config.navigationPath);}}>
                            <img className="card-img-top mx-2" style={{"width" : 90 + "%" , "height" :"180px"}} src={this.props.config.imageSrc} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{this.props.config.title}</h5>
                            </div>
                </div>
        );
    }
}

export default CardComponent;